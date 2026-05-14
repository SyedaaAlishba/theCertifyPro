import React, { useState, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { I } from '../components/Icons';
import { toast } from '../components/Toast';
import { Tag } from '../components/Shared';
import { uid, fmtD } from '../utils/helpers';
import { downloadCertSVG } from '../utils/export';
import { CERT_THEMES, TemplateRenderer } from '../templates/TemplateRenderer';
import { CertPreview } from '../components/CertPreview';
import { certificates } from '../api';

export const Builder = ({ user }) => {
  const [data, setData] = useState({
    recipientName: "Alex Mercer",
    courseTitle: "Advanced Web Architecture",
    date: fmtD(new Date()),
    organization: "Dev Academy",
    instructor: "Sarah Jenkins, CTO",
    certId: uid(),
    logoUrl: "",
    sigUrl: ""
  });

  const [themeIdx, setThemeIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [customTemplateUrl, setCustomTemplateUrl] = useState(null);
  const [themeMode, setThemeMode] = useState('dark'); // 'light' or 'dark' background
  const [logoPosition, setLogoPosition] = useState('top-left');
  const [logoSize, setLogoSize] = useState('medium');

  // Sync themeMode for built-in themes
  React.useEffect(() => {
    const theme = CERT_THEMES[themeIdx];
    if (theme && !theme.isCustom) {
      setThemeMode(theme.themeMode);
    }
  }, [themeIdx]);

  const fileRefLogo = useRef(null);
  const fileRefSig = useRef(null);
  const fileRefTemplate = useRef(null);
  const previewRef = useRef(null);

  const isFree = user?.plan === "free";
  const activeTheme = CERT_THEMES[themeIdx];
  const isLocked = isFree && activeTheme?.plan === "pro";

  const handleChange = (e) => {
    setData(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast("File too large (Max 5MB)", "error");

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      if (type === 'template') {
        setCustomTemplateUrl(result);
        setThemeIdx(CERT_THEMES.length - 1);
        analyzeBrightness(result);
        toast("Custom template uploaded!");
      } else {
        setData(p => ({ ...p, [type === 'logo' ? 'logoUrl' : 'sigUrl']: result }));
        toast(`${type === 'logo' ? 'Logo' : 'Signature'} uploaded successfully!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const analyzeBrightness = (url) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 70;
        ctx.drawImage(img, 0, 0, 100, 70);

        const px = ctx.getImageData(0, 0, 100, 70).data;
        let sum = 0;
        for (let i = 0; i < px.length; i += 4) {
          // USER REQUESTED FORMULA: 0.299 * R + 0.587 * G + 0.114 * B
          sum += (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]);
        }

        const avg = sum / (px.length / 4);
        // USER REQUESTED THRESHOLD: 128
        const mode = avg >= 128 ? 'light' : 'dark';
        setThemeMode(mode);
      } catch (err) {
        console.warn('Analysis failed, falling back to dark mode', err);
        setThemeMode('dark');
      }
    };
    img.onerror = () => setThemeMode('dark');
  };

  const handlePreviewClick = (e) => {
    // Zero-config smart placement - no interaction needed on preview
  };

  const handleInputFocus = (fieldName) => {
    // No-op for controlled system
  };

  const handleDownloadPNG = async () => {
    if (isLocked) {
      toast("Upgrade to Pro to export this premium template.", "error");
      return;
    }
    setLoading(true);
    try {
      // 1. Render the React Component exactly as it appears into a static SVG string
      // Watermark removal finalized.
      const rawSvgMarkup = ReactDOMServer.renderToStaticMarkup(
        <TemplateRenderer
          themeIdx={themeIdx}
          data={data}
          customTemplateUrl={customTemplateUrl}
          themeMode={themeMode}
          logoPosition={logoPosition}
          logoSize={logoSize}
        />
      );

      const isPortrait = [13, 14].includes(themeIdx % 15);
      const w = isPortrait ? 1020 : 1440;
      const h = isPortrait ? 1440 : 1020;

      // 2. Save to Backend History
      await certificates.create({
        id: data.certId,
        recipientName: data.recipientName,
        courseTitle: data.courseTitle,
        organization: data.organization,
        instructor: data.instructor,
        date: data.date,
        themeIdx: themeIdx,
        logoUrl: data.logoUrl,
        sigUrl: data.sigUrl
      }).catch(err => console.error("History sync failed", err));

      // 3. Draw string to canvas and export to PNG
      await downloadCertSVG(rawSvgMarkup, `Certificate_${data.recipientName.replace(/\s+/g, '_')}`, w, h);
      toast("Certificate downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast("Error generating certificate", "error");
    }
    setLoading(false);
  };

  return (
    <div className="stack-mobile p-mobile-20" style={{ padding: "40px", display: "flex", gap: "40px", minHeight: "calc(100vh - 84px)", position: "relative" }}>

      {/* LEFT: Builder Controls */}
      <div className="hide-scroll" style={{ width: "100%", maxWidth: "380px", flexShrink: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* Template Gallery */}
        <div style={{ background: "var(--surface)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <I n="grid" s={16} /> Template Library
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {CERT_THEMES.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setThemeIdx(idx)}
                style={{
                  padding: "12px",
                  background: themeIdx === idx ? "var(--accent-glow)" : "var(--card)",
                  border: `1px solid ${themeIdx === idx ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  position: "relative"
                }}
              >
                <div style={{ fontSize: "24px" }}>{t.medal}</div>
                <div style={{ fontSize: "11px", fontWeight: "600", textAlign: "center", color: themeIdx === idx ? "var(--accent)" : "var(--sub)", lineHeight: 1.2 }}>{t.name}</div>
                {t.plan === "pro" && (
                  <div style={{ position: "absolute", top: -6, right: -6, background: "var(--bg)", border: "1px solid var(--border)", padding: "2px 6px", borderRadius: "10px", fontSize: "9px", fontWeight: 700, color: "var(--accent)" }}>PRO</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Details */}
        <div style={{ background: "var(--surface)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--sub)", marginBottom: "6px", display: "block" }}>Recipient Name</label>
            <input name="recipientName" value={data.recipientName} onChange={handleChange} className="field" />
          </div>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--sub)", marginBottom: "6px", display: "block" }}>Course / Achievement</label>
            <input name="courseTitle" value={data.courseTitle} onChange={handleChange} className="field" />
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--sub)", marginBottom: "6px", display: "block" }}>Organization</label>
              <input name="organization" value={data.organization} onChange={handleChange} className="field" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--sub)", marginBottom: "6px", display: "block" }}>Date</label>
              <input name="date" value={data.date} onChange={handleChange} className="field" />
            </div>
          </div>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--sub)", marginBottom: "6px", display: "block" }}>Instructor Name</label>
            <input name="instructor" value={data.instructor} onChange={handleChange} className="field" />
          </div>

          {/* Controlled layout - no manual settings panel needed */}
        </div>

        {/* Uploads */}
        <div style={{ background: "var(--surface)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "16px", color: "var(--text)" }}>Branding & Assets</h3>
          <div style={{ display: "flex", gap: "16px" }}>
            <button className="btn-ghost" style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", borderColor: data.logoUrl ? "var(--green)" : "" }} onClick={() => fileRefLogo.current?.click()}>
              <I n="upload" s={18} c={data.logoUrl ? "var(--green)" : "currentColor"} />
              <span style={{ fontSize: "12px", color: data.logoUrl ? "var(--green)" : "var(--sub)" }}>{data.logoUrl ? "Logo Added" : "Upload Logo"}</span>
            </button>
            <button className="btn-ghost" style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", borderColor: data.sigUrl ? "var(--green)" : "" }} onClick={() => fileRefSig.current?.click()}>
              <I n="upload" s={18} c={data.sigUrl ? "var(--green)" : "currentColor"} />
              <span style={{ fontSize: "12px", color: data.sigUrl ? "var(--green)" : "var(--sub)" }}>{data.sigUrl ? "Signature Added" : "Upload Signature"}</span>
            </button>
            <button className="btn-ghost" style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", borderColor: customTemplateUrl ? "var(--accent)" : "" }} onClick={() => fileRefTemplate.current?.click()}>
              <I n="plus" s={18} c={customTemplateUrl ? "var(--accent)" : "currentColor"} />
              <span style={{ fontSize: "12px", color: customTemplateUrl ? "var(--accent)" : "var(--sub)" }}>{customTemplateUrl ? "Template Set" : "Custom Template"}</span>
            </button>
            <input type="file" ref={fileRefLogo} style={{ display: "none" }} accept="image/*" onChange={(e) => handleUpload(e, 'logo')} />
            <input type="file" ref={fileRefSig} style={{ display: "none" }} accept="image/*" onChange={(e) => handleUpload(e, 'sig')} />
            <input type="file" ref={fileRefTemplate} style={{ display: "none" }} accept="image/*" onChange={(e) => handleUpload(e, 'template')} />
          </div>
          {/* Logo placement/size controls — shown for all templates when logo is uploaded */}
          {data.logoUrl && (
            <div style={{ marginTop: 16, padding: "14px", background: "var(--bg)", borderRadius: 10, border: "1px solid var(--border)" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--sub)", marginBottom: 10, letterSpacing: "1px", textTransform: "uppercase" }}>Logo Position</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                {[['top-left', '◧ Left'], ['top-center', '⊡ Center'], ['top-right', '◨ Right']].map(([val, label]) => (
                  <button key={val} onClick={() => setLogoPosition(val)}
                    style={{
                      flex: 1, padding: "7px 4px", fontSize: 11, fontWeight: 600,
                      background: logoPosition === val ? "var(--accent-glow)" : "var(--card)",
                      border: `1px solid ${logoPosition === val ? "var(--accent)" : "var(--border)"}`,
                      color: logoPosition === val ? "var(--accent)" : "var(--sub)",
                      borderRadius: 6, cursor: "pointer"
                    }}>
                    {label}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--sub)", marginBottom: 10, letterSpacing: "1px", textTransform: "uppercase" }}>Logo Size</p>
              <div style={{ display: "flex", gap: 8 }}>
                {[['small', 'S'], ['medium', 'M'], ['large', 'L']].map(([val, label]) => (
                  <button key={val} onClick={() => setLogoSize(val)}
                    style={{
                      flex: 1, padding: "7px 4px", fontSize: 13, fontWeight: 700,
                      background: logoSize === val ? "var(--accent-glow)" : "var(--card)",
                      border: `1px solid ${logoSize === val ? "var(--accent)" : "var(--border)"}`,
                      color: logoSize === val ? "var(--accent)" : "var(--sub)",
                      borderRadius: 6, cursor: "pointer"
                    }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {(data.logoUrl || data.sigUrl || customTemplateUrl) && (
            <button onClick={() => { setData(p => ({ ...p, logoUrl: "", sigUrl: "" })); setCustomTemplateUrl(null); }} style={{ marginTop: 12, fontSize: 12, color: "var(--red)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <I n="trash" s={14} /> Clear Media
            </button>
          )}
        </div>
      </div>

      {/* RIGHT: Preview Pane — Sticky to follow user controls */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px", position: "sticky", top: "24px", alignSelf: "flex-start" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--surface)", padding: "16px 24px", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              {activeTheme.medal}
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "600" }}>{activeTheme.name}</h3>
              <p style={{ fontSize: "13px", color: "var(--sub)" }}>{activeTheme.cat} Collection</p>
            </div>
          </div>

          <button onClick={handleDownloadPNG} disabled={loading} className="btn-gold" style={{ padding: "12px 24px", display: "flex", alignItems: "center", gap: "8px" }}>
            {loading ? <I n="clock" s={18} /> : <I n="download" s={18} />}
            {isLocked ? "Unlock to Download" : (loading ? "Exporting..." : "Download High-Res PNG")}
          </button>
        </div>

        {/* Certificate Preview Wrapper now scales to fit the screen height naturally */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", borderRadius: "16px", padding: "24px", border: "1px dashed var(--border-light)", position: "relative", minHeight: 0 }}>
          <div ref={previewRef} className="builder-preview" style={{ width: "100%", maxWidth: "900px", position: "relative" }}>
            <CertPreview
              themeIdx={themeIdx}
              data={data}
              customTemplateUrl={customTemplateUrl}
              themeMode={themeMode}
              logoPosition={logoPosition}
              logoSize={logoSize}
            />

            {/* Controlled layout - no interactive markers on preview */}

            {isLocked && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
                <I n="lock" s={48} c="var(--accent)" />
                <h3 style={{ fontSize: 24, fontWeight: 700 }}>Premium Template</h3>
                <p style={{ color: "var(--sub)" }}>Upgrade to Pro to export this and 10+ identical gorgeous templates.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
