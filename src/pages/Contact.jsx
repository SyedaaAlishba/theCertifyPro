import React from 'react';
import { I } from '../components/Icons';

export const Contact = ({ user, setPage }) => {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      {/* Navbar - Matching Privacy.jsx / Landing.jsx */}
      <nav style={{ padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", background: "rgba(6,7,9,0.8)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setPage("landing")}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,var(--accent),var(--accent-br))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I n="award" c="#000" s={24}/>
          </div>
          <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>Certify<span style={{ color: "var(--accent)" }}>Pro</span></span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <button className="nav-link" onClick={() => setPage("landing")}>Home</button>
          <button className="nav-link" onClick={() => setPage("faqs")}>FAQs</button>
          <button className="nav-link" onClick={() => setPage("terms")}>Terms</button>
          <button className="nav-link" onClick={() => setPage("privacy")}>Privacy</button>
          {!user ? (
            <button className="btn-gold" style={{ padding: "10px 24px" }} onClick={() => setPage("auth")}>Get Started</button>
          ) : (
            <button className="btn-gold" style={{ padding: "10px 24px" }} onClick={() => setPage("dashboard")}>Dashboard</button>
          )}
        </div>
      </nav>

      <div style={{ padding: "120px 40px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: 20, background: "rgba(191,164,106,0.1)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
          <I n="mail" s={40}/>
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 800, marginBottom: 24, letterSpacing: "-0.04em" }}>
          Get in <span style={{ color: "var(--accent)" }}>Touch</span>
        </h1>
        <p style={{ color: "var(--sub)", fontSize: 20, lineHeight: 1.6, marginBottom: 48, maxWidth: 600, margin: "0 auto 48px" }}>
          Have a question, feedback, or need support? We'd love to hear from you. Please fill out our contact form and our team will get back to you as soon as possible.
        </p>

        <div style={{ background: "var(--surface)", padding: 48, borderRadius: 24, border: "1px solid var(--border)", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Ready to help you!</h2>
          <p style={{ color: "var(--sub)", marginBottom: 32 }}>Click the button below to open our official contact form.</p>
          
          <a 
            href="https://forms.gle/vaeRjmszgCpbfyUN7" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: 12, 
              background: "var(--accent)", 
              color: "#000", 
              padding: "16px 40px", 
              borderRadius: 12, 
              fontSize: 18, 
              fontWeight: 700, 
              textDecoration: "none",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Open Contact Form <I n="arrow" s={18}/>
          </a>
        </div>

        <div style={{ marginTop: 80 }}>
          <button className="btn-ghost" style={{ padding: "12px 32px" }} onClick={() => setPage("landing")}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};
