import React, { useState, useEffect } from 'react';
import { I } from '../components/Icons';
import { payments } from '../api';
import { toast } from '../components/Toast';

export const Admin = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  const loadData = async () => {
    try {
      const res = await payments.list();
      setData(res.payments || []);
    } catch (err) {
      toast(err.message || 'Failed to load payments', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAction = async (id, action) => {
    try {
      if (action === 'approve') await payments.approve(id);
      if (action === 'reject') await payments.reject(id);
      toast(`Payment ${action}d successfully`);
      loadData();
    } catch (err) {
      toast(err.message || `Failed to ${action} payment`, 'error');
    }
  };

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: 'var(--sub)' }}>Loading Admin Data...</div>;

  return (
    <div style={{ padding: 40, maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 850, marginBottom: 8, letterSpacing: "-0.02em" }}>Admin Panel</h1>
        <p style={{ color: "var(--sub)", fontSize: 16 }}>Review proof of payments and manage Pro upgrades.</p>
      </div>

      {data.length === 0 ? (
        <div style={{ padding: 100, textAlign: "center", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
             <I n="credit" s={32} />
          </div>
          <p style={{ color: "var(--sub)", fontSize: 16, fontWeight: 500 }}>No payment records found at this time.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="au1">
          {data.map(p => (
            <div key={p.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: "28px", display: "flex", alignItems: "center", gap: 28, transition: "all 0.3s ease" }} className="card-hover">
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                <div 
                  onClick={() => setPreviewUrl(p.screenshot)}
                  style={{ width: 90, height: 90, borderRadius: 16, overflow: "hidden", display: "block", flexShrink: 0, border: "2px solid var(--border)", cursor: "zoom-in", position: "relative", background: "var(--bg)" }}
                >
                  <img src={p.screenshot} alt="Screenshot" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", opacity: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }} className="hover-opacity">
                     <I n="search" s={24} c="#FFF" />
                  </div>
                </div>
                <button onClick={() => setPreviewUrl(p.screenshot)} style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 11, fontWeight: 700, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em", padding: "4px 8px" }}>View Proof</button>
              </div>
              
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: "var(--text)" }}>{p.user_name} <span style={{ color: "var(--sub)", fontWeight: 400, fontSize: 14 }}>({p.user_email})</span></div>
                <div style={{ fontSize: 14, color: "var(--sub)", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><I n="star" s={14} c="var(--accent)" /> Plan: <strong style={{ color: "var(--text)" }}>{p.plan_type.toUpperCase()}</strong></span>
                  <span style={{ width: 1, height: 12, background: "var(--border)" }}></span>
                  <span style={{ 
                    color: p.status === 'Approved' ? 'var(--green)' : p.status === 'Rejected' ? 'var(--danger)' : 'var(--accent)', 
                    fontWeight: 700 
                  }}>
                    {p.status}
                  </span>
                </div>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 6 }}>
                   {p.payment_id && (
                     <div style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", background: "rgba(191,164,106,0.1)", padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(191,164,106,0.2)", letterSpacing: "0.03em" }}>
                       ID: {p.payment_id}
                     </div>
                   )}
                   {p.trxn_id && (
                     <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", background: "rgba(81,152,240,0.1)", padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(81,152,240,0.2)" }}>
                       TRXN: {p.trxn_id}
                     </div>
                   )}
                </div>

                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <I n="clock" s={12} /> Received: {p.created_at ? new Date(p.created_at).toLocaleString() : 'N/A'}
                </div>
                {p.note && <div style={{ fontSize: 13, color: "var(--sub)", marginTop: 8, fontStyle: "italic", borderLeft: "2px solid var(--border)", paddingLeft: 12 }}>"{p.note}"</div>}
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                {p.status === 'Pending' && (
                  <>
                    <button className="btn-gold" style={{ padding: "12px 24px", fontSize: 14 }} onClick={() => handleAction(p.id, 'approve')}>Approve & Upgrade</button>
                    <button className="btn-ghost" style={{ padding: "12px 24px", fontSize: 14, color: "var(--red)", borderColor: "rgba(255,92,92,0.2)" }} onClick={() => handleAction(p.id, 'reject')}>Reject</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Screenshot Preview Modal (Premium Glassmorphism) */}
      {previewUrl && (
        <div 
          onClick={() => setPreviewUrl(null)}
          style={{ 
            position: "fixed", inset: 0, zIndex: 1000, 
            background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 40, animation: "fadeIn 0.3s ease"
          }}
        >
          <div style={{ position: "relative", maxWidth: "95vw", maxHeight: "90vh", borderRadius: 24, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", animation: "fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }} onClick={e => e.stopPropagation()}>
             <img src={previewUrl} alt="Preview" style={{ display: "block", width: "100%", height: "100%", maxHeight: "85vh", objectFit: "contain" }} />
             
             <div style={{ padding: "16px 24px", background: "rgba(0,0,0,0.6)", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ color: "var(--sub)", fontSize: 13, fontWeight: 500 }}>Proof of Payment Screenshot</div>
                <div style={{ display: "flex", gap: 12 }}>
                  <a href={previewUrl} download="Payment_Screenshot.png" className="btn-ghost" style={{ padding: "8px 16px", fontSize: 12, background: "rgba(255,255,255,0.05)" }}>
                    <I n="upload" s={14} /> Download
                  </a>
                  <button onClick={() => setPreviewUrl(null)} className="btn-gold" style={{ padding: "8px 20px", fontSize: 12 }}>Close</button>
                </div>
             </div>
             
             <button 
               onClick={() => setPreviewUrl(null)} 
               style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: 18, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
               onMouseEnter={e => e.currentTarget.style.background = "var(--red)"}
               onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
             >
               <I n="x" s={18} />
             </button>
          </div>
        </div>
      )}
    </div>
  );
};
