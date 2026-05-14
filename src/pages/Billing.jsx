import React, { useState } from 'react';
import { I } from '../components/Icons';
import { toast } from '../components/Toast';
import { Tag } from '../components/Shared';
import { users, payments } from '../api';


export const Billing = ({ user, setUser, setPage }) => {
  const [loading, setLoading] = useState(false);
  const [hasPending, setHasPending] = useState(false);
  
  React.useEffect(() => {
    if (user.plan !== "pro") {
      payments.checkStatus().then(res => {
        if (res.status === 'pending') setHasPending(true);
      }).catch(console.error);
    }
  }, [user.plan]);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await users.upgrade();
      const updatedUser = { ...user, plan: "pro" };
      setUser(updatedUser);
      localStorage.setItem("cp_user", JSON.stringify(updatedUser));
      toast("Successfully upgraded to Pro!");
    } catch (e) {
      console.error(e);
      toast(e.message || "Failed to upgrade", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }} className="au0">
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Pricing & Plans</h1>
        <p style={{ color: "var(--sub)", fontSize: 18 }}>Everything you need to issue stunning verifications globally.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }} className="au1">
        
        {/* FREE TIER */}
        <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 16, padding: 40, position: "relative", display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Free</h3>
          <p style={{ color: "var(--sub)" }}>Perfect for individuals getting started.</p>
          <div style={{ margin: "32px 0", fontSize: 48, fontWeight: 800 }}>$0</div>
          
          <ul style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40, listStyle: "none", flexGrow: 1 }}>
            <li style={{ display: "flex", gap: 12, color: "var(--sub)" }}><I n="check" c="currentColor"/> Access to 4 Basic Templates</li>
            <li style={{ display: "flex", gap: 12, color: "var(--sub)" }}><I n="check" c="currentColor"/> Standard Quality Exports</li>
            <li style={{ display: "flex", gap: 12, color: "var(--sub)" }}><I n="check" c="currentColor"/> Form-based Builder</li>
            <li style={{ display: "flex", gap: 12, color: "var(--sub)" }}><I n="check" c="currentColor"/> Without Watermark</li>
            <li style={{ display: "flex", gap: 12, color: "var(--muted)" }}><I n="x" c="currentColor"/> <span style={{ textDecoration: "line-through" }}>11+ Premium Aesthetic Templates</span></li>
            <li style={{ display: "flex", gap: 12, color: "var(--muted)" }}><I n="x" c="currentColor"/> <span style={{ textDecoration: "line-through" }}>Bulk CSV Generation</span></li>
          </ul>

          <button className="btn-ghost" style={{ width: "100%", padding: 16, marginTop: "auto" }} disabled>Get Started</button>
        </div>

        {/* PRO TIER (PKR) */}
        <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 16, padding: 40, position: "relative", display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "var(--accent)" }}>Pro (PKR)</h3>
          <p style={{ color: "var(--sub)" }}>For Pakistani users and organizations.</p>
          <div style={{ margin: "32px 0", fontSize: 48, fontWeight: 800 }}>PKR 1399</div>
          
          <ul style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40, listStyle: "none", flexGrow: 1 }}>
            <li style={{ display: "flex", gap: 12, color: "var(--text)" }}><I n="check" c="var(--accent)"/> Pro Certificates</li>
            <li style={{ display: "flex", gap: 12, color: "var(--text)" }}><I n="check" c="var(--accent)"/> Bulk Certificate Generation</li>
            <li style={{ display: "flex", gap: 12, color: "var(--text)" }}><I n="check" c="var(--accent)"/> All Pro Features Access</li>
          </ul>



          <button 
            className="btn-gold" 
            style={{ width: "100%", padding: 16, marginTop: "auto" }} 
            onClick={() => setPage("payment-pkr")}
            disabled={user.plan === "pro" || hasPending || loading}
          >
            {user.plan === "pro" ? "Active Subscription" : hasPending ? "Pending Approval" : "Proceed to Payment"}
          </button>
        </div>

        {/* PRO TIER (INTERNATIONAL) */}
        <div style={{ background: "linear-gradient(180deg, rgba(191,164,106,0.1), var(--bg))", border: "1px solid var(--accent)", borderRadius: 16, padding: 40, position: "relative", display: "flex", flexDirection: "column" }}>
          <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "var(--accent)", color: "#000", padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>PRO</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "var(--accent)" }}>Pro (International)</h3>
          <p style={{ color: "var(--sub)" }}>For international individuals and users.</p>
          <div style={{ margin: "32px 0", fontSize: 48, fontWeight: 800 }}>$5</div>
          
          <ul style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40, listStyle: "none", flexGrow: 1 }}>
            <li style={{ display: "flex", gap: 12, color: "var(--text)" }}><I n="check" c="var(--accent)"/> Pro Certificates</li>
            <li style={{ display: "flex", gap: 12, color: "var(--text)" }}><I n="check" c="var(--accent)"/> Bulk Certificate Generation</li>
            <li style={{ display: "flex", gap: 12, color: "var(--text)" }}><I n="check" c="var(--accent)"/> All Pro Features Access</li>
          </ul>



          <button 
            className="btn-gold" 
            style={{ width: "100%", padding: 16, marginTop: "auto" }} 
            onClick={() => setPage("payment-int")}
            disabled={user.plan === "pro" || hasPending || loading}
          >
            {user.plan === "pro" ? "Active Subscription" : hasPending ? "Pending Approval" : "Proceed to Payment"}
          </button>
        </div>

      </div>
    </div>
  );
};

