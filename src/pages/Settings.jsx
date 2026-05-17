import React, { useState } from 'react';
import { I } from '../components/Icons';
import { toast } from '../components/Toast';
import { users } from '../api';

export const Settings = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    org: user.org || ""
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.org.trim()) newErrors.org = "Organization name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return toast("Please fix the errors before saving", "error");
    
    setSaving(true);
    try {
      await users.update(formData);
      
      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);
      localStorage.setItem("cp_user", JSON.stringify(updatedUser));
      toast("Settings saved successfully!");
    } catch (e) {
      console.error(e);
      toast(e.message || "Error saving settings", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 40 }} className="au0">
        <h1 style={{ fontSize: 36, fontWeight: 850, marginBottom: 8, letterSpacing: "-0.02em" }}>Account Settings</h1>
        <p style={{ color: "var(--sub)", fontSize: 16 }}>Manage your personal profile and organization defaults.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
        
        {/* Left Column: Profile Overview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }} className="au1">
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 32, textAlign: "center", position: "relative", overflow: "hidden" }}>
             <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, var(--accent-glow), transparent)", opacity: 0.5 }}></div>
             <div style={{ width: 100, height: 100, borderRadius: "50%", background: "linear-gradient(135deg, var(--card), var(--surface))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 800, color: "var(--accent)", border: "4px solid var(--border)", margin: "0 auto 20px", position: "relative", zIndex: 1, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
              {formData.name ? formData.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : "U")}
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 4px 0", letterSpacing: "-0.01em" }}>{formData.name || "User"}</h3>
            <p style={{ color: "var(--sub)", margin: 0, fontSize: 15 }}>{formData.email}</p>
            
            <div style={{ marginTop: 24, display: "inline-flex", padding: "6px 16px", borderRadius: 30, background: "rgba(191,164,106,0.1)", border: "1px solid rgba(191,164,106,0.2)", color: "var(--accent)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {user.plan || 'Free'} Plan
            </div>
          </div>

          <div style={{ padding: 28, background: "var(--surface)", borderRadius: 20, border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(81,152,240,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I n="award" s={18} c="var(--blue)" />
              </div>
              <h4 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Subscription</h4>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: 16, border: "1px solid var(--border)" }}>
              <div>
                <span style={{ display: "block", color: "var(--sub)", fontSize: 13, marginBottom: 4 }}>Active Plan</span>
                <span style={{ textTransform: "capitalize", fontSize: 16, fontWeight: 800, color: user.plan === 'pro' ? 'var(--accent)' : 'var(--text)' }}>
                  {user.plan || 'Free'}
                </span>
              </div>
              {user.plan !== 'pro' && (
                <button className="btn-gold" style={{ padding: "8px 16px", fontSize: 13 }}>Upgrade</button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 40, display: "flex", flexDirection: "column", gap: 32 }} className="au2">
          
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.01em" }}>Profile Details</h3>
            <p style={{ color: "var(--sub)", fontSize: 15, margin: 0 }}>Update your identity and organizational presence.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--sub)", marginBottom: 10 }}>
                <I n="user" s={16} /> Full Name
              </label>
              <input 
                type="text" 
                className="field" 
                style={{ borderColor: errors.name ? "var(--red)" : "var(--border)" }}
                value={formData.name} 
                onChange={e => {
                  setFormData({...formData, name: e.target.value});
                  if (errors.name) setErrors({...errors, name: null});
                }}
                placeholder="John Doe"
              />
              {errors.name && <p style={{ fontSize: 12, color: "var(--red)", marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}><I n="x" s={12}/> {errors.name}</p>}
            </div>

            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--sub)", marginBottom: 10 }}>
                <I n="mail" s={16} /> Email Address
              </label>
              <input 
                type="email" 
                className="field" 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})}
                disabled={user.provider === 'google'} 
                placeholder="john@example.com"
                style={{ opacity: user.provider === 'google' ? 0.6 : 1, cursor: user.provider === 'google' ? 'not-allowed' : 'text', background: user.provider === 'google' ? 'var(--bg)' : 'var(--surface)' }}
              />
              {user.provider === 'google' && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, padding: "8px 12px", background: "rgba(191,164,106,0.05)", borderRadius: 8, border: "1px solid rgba(191,164,106,0.1)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#BFA46A" d="M12.48 10.92v3.28h7.84c-.24 1.84-1.88 5.39-7.84 5.39-5.11 0-9.27-4.22-9.27-9.44s4.16-9.44 9.27-9.44c2.91 0 5.4 1.25 6.51 3.42l3.05-3c-1.99-1.84-4.57-2.96-9.56-2.96-6.63 0-12 5.37-12 12s5.37 12 12 12c6.92 0 11.52-4.87 11.52-11.72 0-.79-.08-1.4-.24-2.01h-11.28z"/></svg>
                  <p style={{ fontSize: 12, color: "var(--sub)", margin: 0 }}>Managed by Google Auth</p>
                </div>
              )}
            </div>

            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--sub)", marginBottom: 10 }}>
                <I n="award" s={16} /> Default Organization
              </label>
              <input 
                type="text" 
                className="field" 
                style={{ borderColor: errors.org ? "var(--red)" : "var(--border)" }}
                value={formData.org} 
                onChange={e => {
                  setFormData({...formData, org: e.target.value});
                  if (errors.org) setErrors({...errors, org: null});
                }}
                placeholder="e.g. Acme University"
              />
              {errors.org && <p style={{ fontSize: 12, color: "var(--red)", marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}><I n="x" s={12}/> {errors.org}</p>}
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>This will be used as the default 'Issued By' on your certificates.</p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
            <button className="btn-gold" style={{ padding: "14px 40px", fontSize: 16 }} onClick={handleSave} disabled={saving}>
              {saving ? <div className="spin" style={{ width: 18, height: 18, border: "2px solid #000", borderTopColor: "transparent", borderRadius: "50%" }}></div> : "Save Changes"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
