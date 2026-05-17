import React, { useState, useEffect } from 'react';
import { I } from '../components/Icons';
import { toast } from '../components/Toast';
import { certificates } from '../api';
import { CERT_THEMES } from '../templates/TemplateRenderer';
import { CertPreview } from '../components/CertPreview';

export const History = ({ user }) => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ total: 0, verifications: 0, thisMonth: 0 });
  const [previewCert, setPreviewCert] = useState(null);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Stats independently (don't fail the whole page if stats are down)
      certificates.stats()
        .then(data => { if (data) setStats(data); })
        .catch(err => console.error("History stats error:", err));

      // 2. Fetch Certificates (main content)
      const data = await certificates.list({ search });
      if (data) setCerts(data.certificates || []);
    } catch (e) {
      console.error("History main fetch error:", e);
      toast(e.message || "Error loading history", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    try {
      await certificates.delete(id);
      toast("Certificate deleted");
      fetchData();
    } catch (e) {
      console.error("Delete error:", e);
      toast("Error deleting certificate", "error");
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: 1200, margin: "0 auto" }}>
      
      <div style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }} className="au0 stack-mobile">
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 850, marginBottom: 8, letterSpacing: "-0.02em" }}>Certificate History</h1>
          <p style={{ color: "var(--sub)", fontSize: 16 }}>Manage and track all certificates issued through your account.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }} className="w-mobile-100">
          <div style={{ position: "relative" }} className="w-mobile-100">
          <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", color: "var(--muted)" }}>
            <I n="search" s={16} />
          </span>
          <input 
            type="text" 
            className="field" 
            placeholder="Search recipients, courses..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 300, maxWidth: "100%", paddingRight: 44, fontSize: 14 }}
          />
        </div>
        </div>
      </div>

      {/* Stats Quick View */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 40 }} className="au1">
         {[
           { label: "Total Certificates", val: stats.total, icon: "award", color: "var(--accent)" },
           { label: "This Month", val: stats.thisMonth, icon: "calendar", color: "var(--blue)" },
           { label: "Verifications", val: stats.verifications, icon: "eye", color: "var(--green)" }
         ].map((s, i) => (
           <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 24, display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `rgba(255,255,255,0.03)`, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)" }}>
                <I n={s.icon} s={20} c={s.color} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: "var(--sub)", fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 24, fontWeight: 850, color: "var(--text)" }}>{s.val}</div>
              </div>
           </div>
         ))}
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, overflow: "hidden" }} className="au2">
        <div style={{ overflowX: "auto", width: "100%", paddingBottom: 10 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--border)" }}>
                <th style={{ textAlign: "left", padding: "20px 32px", fontSize: 11, fontWeight: 700, color: "var(--sub)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Recipient & ID</th>
                <th style={{ textAlign: "left", padding: "20px 32px", fontSize: 11, fontWeight: 700, color: "var(--sub)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Course / Project</th>
                <th style={{ textAlign: "left", padding: "20px 32px", fontSize: 11, fontWeight: 700, color: "var(--sub)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Issue Date</th>
                <th style={{ textAlign: "left", padding: "20px 32px", fontSize: 11, fontWeight: 700, color: "var(--sub)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th style={{ textAlign: "right", padding: "20px 32px", fontSize: 11, fontWeight: 700, color: "var(--sub)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td colSpan={5} style={{ padding: 24 }}><div className="shimmer" style={{ height: 20, width: "100%", borderRadius: 4 }}></div></td>
                  </tr>
                ))
              ) : certs.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "80px 40px", textAlign: "center" }}>
                     <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                       <I n="award" s={32} c="var(--muted)" />
                     </div>
                     <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No certificates found</h3>
                     <p style={{ color: "var(--sub)", margin: 0 }}>Try adjusting your search or generate your first certificate.</p>
                  </td>
                </tr>
              ) : (
                certs.map(c => {
                  const themeName = CERT_THEMES[c.theme_idx]?.name || "Standard";
                  return (
                    <tr key={c.id} style={{ borderBottom: "1px solid var(--border)", transition: "background 0.2s" }} className="table-row">
                      <td style={{ padding: "20px 32px" }}>
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.recipient_name}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace" }}>ID: {c.id}</div>
                      </td>
                      <td style={{ padding: "20px 32px" }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{c.course_title}</div>
                        <div style={{ fontSize: 12, color: "var(--sub)" }}>{c.organization || themeName}</div>
                      </td>
                      <td style={{ padding: "20px 32px" }}>
                        <div style={{ fontSize: 14 }}>{new Date(c.created_at).toLocaleDateString()}</div>
                      </td>
                      <td style={{ padding: "20px 32px" }}>
                        <div style={{ display: "inline-flex", padding: "4px 10px", borderRadius: 8, background: "rgba(64,201,136,0.1)", color: "var(--green)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
                          Issued
                        </div>
                      </td>
                      <td style={{ padding: "20px 32px", textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                          <button className="btn-ghost" style={{ padding: 8, borderRadius: 10 }} title="Preview" onClick={() => setPreviewCert(c)}>
                            <I n="eye" s={16} />
                          </button>
                          <button className="btn-ghost" style={{ padding: 8, borderRadius: 10, color: "var(--red)" }} onClick={() => handleDelete(c.id)} title="Delete">
                            <I n="trash" s={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {previewCert && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(3,4,6,0.9)", backdropFilter: "blur(8px)", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", animation: "fadeIn 0.2s ease", overflowY: "auto" }} onClick={() => setPreviewCert(null)}>
          
          <div style={{ width: "100%", maxWidth: 900, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }} className="au0" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>Certificate Preview</h2>
            <button className="btn-ghost" style={{ padding: "10px 20px", borderRadius: 10, background: "var(--surface)", fontWeight: 600, border: "1px solid var(--border)" }} onClick={() => setPreviewCert(null)}>
              <I n="x" s={16} /> Close Preview
            </button>
          </div>

          <div style={{ position: "relative", width: "100%", maxWidth: 900 }} onClick={e => e.stopPropagation()} className="au1">
            <div style={{ pointerEvents: "none", boxShadow: "0 24px 64px rgba(0,0,0,0.6)", borderRadius: 12 }}>
              <CertPreview 
                data={{
                  recipientName: previewCert.recipient_name,
                  courseTitle: previewCert.course_title,
                  organization: previewCert.organization,
                  instructor: previewCert.instructor,
                  date: previewCert.date || new Date(previewCert.created_at).toLocaleDateString(),
                  certId: previewCert.id,
                  logoUrl: previewCert.logo_url,
                  sigUrl: previewCert.sig_url
                }} 
                themeIdx={previewCert.theme_idx} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
