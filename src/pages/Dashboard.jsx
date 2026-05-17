import React, { useState, useEffect } from 'react';
import { I } from '../components/Icons';
import { CERT_THEMES } from '../templates/TemplateRenderer';
import { toast } from '../components/Toast';
import { certificates } from '../api';

export const Dashboard = ({ user, setPage }) => {
  const [stats, setStats] = useState({ total: 0, thisMonth: 0, themesUsed: 0, uniqueRecipients: 0 });
  const [recent, setRecent] = useState([]);
  
  const isMounted = React.useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchDashboard = React.useCallback(async () => {
    try {
      const [s, c] = await Promise.all([
        certificates.stats(),
        certificates.list({ limit: 5 })
      ]);

      if (isMounted.current) {
        setStats(s || {
          total: 0,
          thisMonth: 0,
          themesUsed: 0,
          uniqueRecipients: 0,
          verifications: 0
        });
        setRecent(c?.certificates || []);
      }
    } catch (e) {
      console.error("Dashboard fetch error", e);
      if (isMounted.current) {
        toast("Failed to load dashboard data", "error");
      }
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);
  return (
    <div style={{ padding: 40, maxWidth: 1200 }}>
      {user.plan === "free" && (
        <div style={{ padding: 20, background: "linear-gradient(135deg, rgba(191,164,106,0.1), rgba(191,164,106,0.02))", border: "1px solid rgba(191,164,106,0.2)", borderRadius: 12, marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }} className="au0">
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--accent)" }}>Unlock Premium Templates</h3>
            <p style={{ color: "var(--sub)", fontSize: 14, marginTop: 4 }}>Upgrade to a Pro plan to remove draft watermarks and access 10+ premium certificate templates.</p>
          </div>
          <button className="btn-gold" onClick={() => setPage("billing")} style={{ padding: "10px 24px" }}>Upgrade Now</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 40 }} className="au1 grid-tablet-2 grid-mobile-1">
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 24, borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(191,164,106,0.1)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}><I n="award" s={20}/></div>
            <span style={{ color: "var(--green)", fontSize: 13, fontWeight: 600 }}>+12%</span>
          </div>
          <p style={{ color: "var(--sub)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Total Generated</p>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginTop: 4 }}>{stats.total || 0}</h2>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 24, borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(81,152,240,0.1)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}><I n="users" s={20}/></div>
            <span style={{ color: "var(--green)", fontSize: 13, fontWeight: 600 }}>This Month: {stats.thisMonth || 0}</span>
          </div>
          <p style={{ color: "var(--sub)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Unique Themes Used</p>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginTop: 4 }}>{stats.themesUsed || 0}</h2>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 24, borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(145,121,242,0.1)", color: "var(--purple)", display: "flex", alignItems: "center", justifyContent: "center" }}><I n="star" s={20}/></div>
          </div>
          <p style={{ color: "var(--sub)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Verifications</p>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginTop: 4 }}>{stats.verifications ?? 0}</h2>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 24, borderRadius: 12, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <button className="btn-gold" style={{ padding: 16 }} onClick={() => setPage("builder")}>+ Create New</button>
          <button className="btn-ghost" style={{ padding: 16, marginTop: 12 }} onClick={() => setPage("bulk")}>Bulk Import CSV</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }} className="au2 grid-tablet-1 grid-mobile-1">
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Recent Exports</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--sub)" }}>
                <th style={{ textAlign: "left", paddingBottom: 12, fontWeight: 500 }}>Recipient</th>
                <th style={{ textAlign: "left", paddingBottom: 12, fontWeight: 500 }}>Certificate</th>
                <th style={{ textAlign: "left", paddingBottom: 12, fontWeight: 500 }}>Date</th>
                <th style={{ textAlign: "right", paddingBottom: 12, fontWeight: 500 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: "16px 0", color: "var(--sub)", textAlign: "center" }}>No recent exports</td></tr>
              ) : recent.map(c => (
                <tr key={c.id} className="table-row" style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "16px 0", fontWeight: 500 }}>{c.recipient_name}</td>
                  <td style={{ padding: "16px 0", color: "var(--sub)" }}>{c.course_title}</td>
                  <td style={{ padding: "16px 0", color: "var(--sub)" }}>{new Date(c.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: "16px 0", textAlign: "right" }}>
                    <button className="nav-link" onClick={() => setPage("history")} style={{ display: "inline-flex", padding: 6, background: "var(--bg)", borderRadius: 6, border: "1px solid var(--border)" }}><I n="arrow" s={14}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Popular Templates</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {CERT_THEMES.slice(0, 4).map((t, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 16, background: "var(--surface)", border: "1px solid var(--border)", padding: 16, borderRadius: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                  {t.medal}
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</h4>
                  <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 2 }}>{t.cat} Theme</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
