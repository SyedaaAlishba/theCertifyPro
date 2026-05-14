import React, { useState, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import JSZip from 'jszip';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { I } from '../components/Icons';
import { toast } from '../components/Toast';
import { CERT_THEMES, TemplateRenderer } from '../templates/TemplateRenderer';
import { CertPreview } from '../components/CertPreview';
import { uid, fmtD } from '../utils/helpers';
import { certificates } from '../api';

export const Bulk = ({ user, setPage }) => {
  const [file, setFile] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [headers, setHeaders] = useState([]);
  
  // Mappings
  const [mapping, setMapping] = useState({
    recipientName: '',
    courseTitle: '',
    date: '',
    organization: '',
    instructor: '',
    sigUrl: '',
    themeIdx: ''
  });
  
  // Global Overrides
  const [useGlobalTheme, setUseGlobalTheme] = useState(true);
  const [globalThemeIdx, setGlobalThemeIdx] = useState(0);
  
  const [useGlobalInstructor, setUseGlobalInstructor] = useState(false);
  const [globalInstructor, setGlobalInstructor] = useState(user.name || "Instructor");
  const [globalSigUrl, setGlobalSigUrl] = useState(user.sig_url || "");
  
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => { setDragOver(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (f) => {
    if (!f) return;
    const ext = f.name.split('.').pop().toLowerCase();
    
    if (ext === 'csv') {
      Papa.parse(f, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            setFile(f);
            const rowHeaders = Object.keys(results.data[0]);
            setHeaders(rowHeaders);
            setRawData(results.data);
            autoMap(rowHeaders);
          } else {
            toast("CSV file is empty or invalid.");
          }
        },
        error: () => toast("Error reading CSV file.")
      });
    } else if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const firstSheet = workbook.SheetNames[0];
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { defval: "" });
          if (data && data.length > 0) {
            setFile(f);
            const rowHeaders = Object.keys(data[0]);
            setHeaders(rowHeaders);
            setRawData(data);
            autoMap(rowHeaders);
          } else {
            toast("Excel file is empty or invalid.");
          }
        } catch(err) {
          toast("Error reading Excel file.");
        }
      };
      reader.readAsBinaryString(f);
    } else {
      toast("Unsupported format. Check for .csv or .xlsx");
    }
  };

  const autoMap = (rowHeaders) => {
    const defaultMapping = { ...mapping };
    const lowerHeaders = rowHeaders.map(h => h.toLowerCase().trim());
    
    const findMatch = (keywords) => {
      const idx = lowerHeaders.findIndex(h => keywords.some(k => h.includes(k)));
      return idx >= 0 ? rowHeaders[idx] : "";
    };

    defaultMapping.recipientName = findMatch(['name', 'recipient', 'student']);
    defaultMapping.courseTitle = findMatch(['course', 'title', 'award', 'program', 'certification']);
    defaultMapping.date = findMatch(['date', 'issued', 'time']);
    defaultMapping.organization = findMatch(['org', 'company', 'school', 'university']);
    defaultMapping.instructor = findMatch(['instructor', 'teacher', 'issuer', 'manager']);
    defaultMapping.sigUrl = findMatch(['signature', 'sig']);
    defaultMapping.themeIdx = findMatch(['theme', 'template', 'style']);
    
    setMapping(defaultMapping);
  };

  const reset = () => {
    setFile(null);
    setRawData([]);
    setHeaders([]);
    setGenerating(false);
    setProgress(0);
    setTotal(0);
  };

  const handleSigUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setGlobalSigUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (user.plan !== "pro") return toast("Bulk generation requires a Pro plan");
    if (!mapping.recipientName || !mapping.courseTitle) return toast("Recipient Name and Course Title must be mapped!");

    const records = rawData.map(row => {
      return {
        recipientName: row[mapping.recipientName] || "Unknown",
        courseTitle: row[mapping.courseTitle] || "Certificate",
        date: mapping.date && row[mapping.date] ? String(row[mapping.date]) : fmtD(new Date()),
        organization: mapping.organization && row[mapping.organization] ? String(row[mapping.organization]) : (user.org || "Organization"),
        
        instructor: useGlobalInstructor ? globalInstructor : (mapping.instructor && row[mapping.instructor] ? String(row[mapping.instructor]) : (user.name || "Instructor")),
        sigUrl: useGlobalInstructor ? globalSigUrl : (mapping.sigUrl && row[mapping.sigUrl] ? String(row[mapping.sigUrl]) : ""),
        
        themeIdx: useGlobalTheme ? globalThemeIdx : (mapping.themeIdx && row[mapping.themeIdx] ? (parseInt(row[mapping.themeIdx]) % CERT_THEMES.length || 0) : 0),
        logoUrl: user.logo_url || null,
        id: uid()
      };
    }).filter(r => r.recipientName !== "Unknown");

    if (records.length === 0) return toast("No valid records generated.");

    setGenerating(true);
    setTotal(records.length);
    setProgress(0);

    // Send to Backend History Tracking FIRST
    try {
      await certificates.bulk({ certificates: records });
    } catch (e) {
      console.error("Bulk sync error", e);
      setGenerating(false);
      const msg = e.message || "Unknown sync error";
      return toast(`Backend sync failed: ${msg}. Bulk generation aborted.`, "error");
    }

    // Zip natively ONLY if backend sync succeeds
    const zip = new JSZip();
    
    for (let i = 0; i < records.length; i++) {
      const rec = records[i];
      const CertElement = <TemplateRenderer themeIdx={rec.themeIdx} data={rec} plan={user.plan} />;
      const svgString = ReactDOMServer.renderToStaticMarkup(CertElement);
      
      const theme = CERT_THEMES[rec.themeIdx];
      const w = theme.isPortrait ? 1020 : 1440;
      const h = theme.isPortrait ? 1440 : 1020;
      
      await new Promise((res, rej) => {
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
          canvas.toBlob((b) => {
            zip.file(`${rec.recipientName.replace(/[^a-z0-9]/gi, '_')}.png`, b);
            res();
          }, "image/png");
        };
        img.onerror = rej;
        img.src = url;
      });
      setProgress(i + 1);
    }

    toast("Archiving and downloading ZIP...");
    const content = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = `CertifyPro_Bulk_${fmtD(new Date())}.zip`;
    a.click();

    setGenerating(false);
    toast(`Successfully generated ${records.length} certificates!`);
    
    // Refresh history immediately
    if (setPage) setTimeout(() => setPage("history"), 1500);
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }} className="au0">
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 850, marginBottom: 8, letterSpacing: "-0.02em" }}>Bulk Generator</h1>
          <p style={{ color: "var(--sub)", fontSize: 16 }}>Process hundreds of certificates at once by uploading your data.</p>
        </div>
        {file && !generating && (
          <button onClick={reset} className="btn-ghost" style={{ padding: "10px 20px", fontSize: 14 }}>
            <I n="trash" s={16} /> Clear & Reset
          </button>
        )}
      </div>

      {!file ? (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 32 }} className="au1">
          {/* Upload Area */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ 
              background: dragOver ? "rgba(191,164,106,0.05)" : "var(--surface)", 
              border: `2px dashed ${dragOver ? "var(--accent)" : "var(--border)"}`, 
              borderRadius: 24, 
              padding: "80px 40px", 
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <div style={{ width: 80, height: 80, borderRadius: 24, background: "rgba(191,164,106,0.1)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
              <I n="upload" s={36} />
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, color: "var(--text)", letterSpacing: "-0.01em" }}>Upload your data file</h3>
            <p style={{ color: "var(--sub)", marginBottom: 32, maxWidth: 320, lineHeight: 1.6 }}>Drag and drop your spreadsheet here or click to browse your files.</p>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
               <div style={{ padding: "6px 12px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, color: "var(--sub)", fontWeight: 600 }}>.CSV</div>
               <div style={{ padding: "6px 12px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, color: "var(--sub)", fontWeight: 600 }}>.XLSX</div>
               <div style={{ padding: "6px 12px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, color: "var(--sub)", fontWeight: 600 }}>.XLS</div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={e => e.target.files?.length && processFile(e.target.files[0])} 
              style={{ display: 'none' }} 
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
            />
          </div>

          {/* Formatting Guidance */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: 32 }}>
            <h4 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <I n="award" s={20} c="var(--accent)" /> Formatting Guidance
            </h4>
            <p style={{ fontSize: 14, color: "var(--sub)", marginBottom: 24, lineHeight: 1.6 }}>For best results, ensure your spreadsheet contains the following columns:</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Full Name", desc: "The recipient's name exactly as it should appear." },
                { label: "Course Title", desc: "The name of the award or program." },
                { label: "Date", desc: "Issuance date (Optional)." },
                { label: "Organization", desc: "Issuing body (Optional)." }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <div style={{ color: "var(--green)", marginTop: 2 }}><I n="check" s={14} /></div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, padding: 20, background: "rgba(81,152,240,0.05)", borderRadius: 16, border: "1px solid rgba(81,152,240,0.1)" }}>
               <div style={{ fontSize: 13, fontWeight: 700, color: "var(--blue)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                 <I n="award" s={14} /> Pro Tip
               </div>
               <p style={{ fontSize: 12, color: "var(--sub)", margin: 0, lineHeight: 1.5 }}>You can also include a <b>Theme Index</b> (0-11) or <b>Instructor Name</b> for row-level customization.</p>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }} className="au1">
          
          {/* Configuration Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24 }}>
            
            {/* Global Settings */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 28 }}>
               <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                 <I n="award" s={20} c="var(--accent)" /> Settings Overrides
               </h3>
               
               <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                      <div>
                        <h4 style={{ fontSize: 14, fontWeight: 700 }}>Template Theme</h4>
                        <p style={{ fontSize: 12, color: "var(--muted)" }}>Applied to all rows unless mapped.</p>
                      </div>
                      <div style={{ display: "flex", background: "var(--bg)", padding: 4, borderRadius: 10, border: "1px solid var(--border)" }}>
                        <button 
                          onClick={() => setUseGlobalTheme(true)}
                          style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", background: useGlobalTheme ? "var(--accent)" : "transparent", color: useGlobalTheme ? "#000" : "var(--sub)" }}
                        >Global</button>
                        <button 
                          onClick={() => setUseGlobalTheme(false)}
                          style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", background: !useGlobalTheme ? "var(--accent)" : "transparent", color: !useGlobalTheme ? "#000" : "var(--sub)" }}
                        >Mapped</button>
                      </div>
                    </div>
                    {useGlobalTheme && (
                      <select className="field" value={globalThemeIdx} onChange={e => setGlobalThemeIdx(Number(e.target.value))}>
                        {CERT_THEMES.map((t, idx) => (
                          <option key={idx} value={idx}>{t.name} ({t.cat})</option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                      <div>
                        <h4 style={{ fontSize: 14, fontWeight: 700 }}>Instructor Info</h4>
                        <p style={{ fontSize: 12, color: "var(--muted)" }}>Signature and name overrides.</p>
                      </div>
                      <div style={{ display: "flex", background: "var(--bg)", padding: 4, borderRadius: 10, border: "1px solid var(--border)" }}>
                        <button 
                          onClick={() => setUseGlobalInstructor(true)}
                          style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", background: useGlobalInstructor ? "var(--accent)" : "transparent", color: useGlobalInstructor ? "#000" : "var(--sub)" }}
                        >Global</button>
                        <button 
                          onClick={() => setUseGlobalInstructor(false)}
                          style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", background: !useGlobalInstructor ? "var(--accent)" : "transparent", color: !useGlobalInstructor ? "#000" : "var(--sub)" }}
                        >Mapped</button>
                      </div>
                    </div>
                    {useGlobalInstructor && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <input type="text" className="field" value={globalInstructor} onChange={e => setGlobalInstructor(e.target.value)} placeholder="Instructor Name" />
                        <label className="btn-ghost" style={{ padding: "10px", cursor: "pointer", fontSize: 12, position: "relative" }}>
                          {globalSigUrl ? "Update Sig" : "Upload Sig"}
                          <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleSigUpload} />
                          {globalSigUrl && <div style={{ position: "absolute", right: -4, top: -4, width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }}></div>}
                        </label>
                      </div>
                    )}
                  </div>
               </div>
            </div>

            {/* Mapping Area */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Column Mapping</h3>
                  <p style={{ color: "var(--sub)", fontSize: 13 }}>Map spreadsheet headers to fields.</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--green)", fontSize: 12, fontWeight: 700, background: "rgba(64,201,136,0.1)", padding: "6px 14px", borderRadius: 10, border: "1px solid rgba(64,201,136,0.2)" }}>
                  <I n="check" s={14} /> {rawData.length} Rows
                </div>
              </div>

              {(!mapping.recipientName || !mapping.courseTitle) && (
                <div style={{ padding: "12px 16px", background: "rgba(255, 92, 92, 0.1)", border: "1px solid rgba(255, 92, 92, 0.2)", borderRadius: 12, color: "var(--red)", fontSize: 13, fontWeight: 600, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                  <I n="x" s={16} /> Required: Map Name & Course Title
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {Object.keys(mapping).map(key => {
                  if (key === 'themeIdx' && useGlobalTheme) return null;
                  if ((key === 'instructor' || key === 'sigUrl') && useGlobalInstructor) return null;
                  
                  const isRequired = ['recipientName', 'courseTitle'].includes(key);
                  const isMapped = !!mapping[key];

                  return (
                    <div key={key}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: isRequired && !isMapped ? "var(--red)" : "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()} {isRequired && "*"}
                      </label>
                      <select 
                        className="field"
                        style={{ padding: "10px 12px", fontSize: 13, borderColor: isRequired && !isMapped ? "var(--red)" : "var(--border)" }}
                        value={mapping[key]}
                        onChange={(e) => setMapping({...mapping, [key]: e.target.value})}
                      >
                        <option value="">-- Ignored --</option>
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Live Design Preview */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Live Design Preview</h3>
                <p style={{ color: "var(--sub)", fontSize: 13 }}>Visualizing mapping & settings using row #1.</p>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", padding: "6px 12px", background: "var(--bg)", borderRadius: 8, border: "1px solid var(--border)" }}>
                First Record Sample
              </div>
            </div>
            
            <div style={{ maxWidth: 800, margin: "0 auto", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", borderRadius: 4, overflow: "hidden", border: "1px solid var(--border)" }}>
              {(() => {
                const row = rawData[0] || {};
                const pData = {
                  recipientName: row[mapping.recipientName] || "Sample Recipient",
                  courseTitle: row[mapping.courseTitle] || "Sample Course Title",
                  date: mapping.date && row[mapping.date] ? String(row[mapping.date]) : fmtD(new Date()),
                  organization: mapping.organization && row[mapping.organization] ? String(row[mapping.organization]) : (user.org || "Organization"),
                  instructor: useGlobalInstructor ? globalInstructor : (mapping.instructor && row[mapping.instructor] ? String(row[mapping.instructor]) : (user.name || "Instructor")),
                  sigUrl: useGlobalInstructor ? globalSigUrl : (mapping.sigUrl && row[mapping.sigUrl] ? String(row[mapping.sigUrl]) : ""),
                  themeIdx: useGlobalTheme ? globalThemeIdx : (mapping.themeIdx && row[mapping.themeIdx] ? (parseInt(row[mapping.themeIdx]) % CERT_THEMES.length || 0) : 0),
                  id: "PREVIEW-SAMPLE"
                };
                return <CertPreview data={pData} themeIdx={pData.themeIdx} />;
              })()}
            </div>
          </div>

          {/* Preview Table */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: 32, overflow: "hidden" }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24, letterSpacing: "-0.01em" }}>Data Preview (First 5 Rows)</h3>
            <div style={{ overflowX: "auto", margin: "0 -32px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--border)" }}>
                    {headers.map(h => <th key={h} style={{ textAlign: "left", padding: "16px 32px", fontWeight: 700, color: "var(--sub)", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: 11 }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rawData.slice(0, 5).map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--border)", transition: "background 0.2s" }} className="table-row">
                      {headers.map(h => <td key={h} style={{ padding: "16px 32px", color: "var(--text)" }}>{row[h]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sticky Execution Bar */}
          <div style={{ position: "sticky", bottom: 24, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, boxShadow: "0 20px 50px rgba(0,0,0,0.5)", backdropFilter: "blur(20px)" }} className="glass">
            <div>
              {generating ? (
                <div style={{ color: "var(--accent)", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 12 }}>
                   <div className="spin" style={{ width: 20, height: 20, border: "3px solid var(--accent)", borderTopColor: "transparent", borderRadius: "50%" }}></div> 
                   Generating {progress} of {total} certificates... 
                </div>
              ) : user.plan !== "pro" ? (
                <div style={{ color: "var(--red)", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                  <I n="award" s={18} /> Upgrade to Pro to enable bulk processing.
                </div>
              ) : (!mapping.recipientName || !mapping.courseTitle) ? (
                <div style={{ color: "var(--red)", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                   <I n="x" s={18} /> Missing required field mappings.
                </div>
              ) : (
                <div style={{ color: "var(--sub)", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                  <I n="check" s={18} c="var(--green)" /> Ready to generate <b>{rawData.length}</b> certificates.
                </div>
              )}
            </div>
            
            <button 
              className="btn-gold" 
              onClick={handleGenerate} 
              disabled={generating || user.plan !== "pro" || !mapping.recipientName || !mapping.courseTitle}
              style={{ padding: "16px 48px", fontSize: 16, fontWeight: 800, minWidth: 240 }}
            >
              {generating ? "Processing..." : "Generate ZIP Archive"}
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
