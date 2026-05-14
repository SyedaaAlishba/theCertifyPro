import React from 'react';
import { I } from '../components/Icons';

export const Privacy = ({ user, setPage }) => {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      {/* Navbar - Matching Terms.jsx / Landing.jsx */}
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
          <button className="nav-link" onClick={() => setPage("contact")}>Contact</button>
          <button className="nav-link" onClick={() => setPage("terms")}>Terms</button>
          <button className="nav-link" onClick={() => setPage("privacy")}>Privacy</button>
          {!user ? (
            <button className="btn-gold" style={{ padding: "10px 24px" }} onClick={() => setPage("auth")}>Get Started</button>
          ) : (
            <button className="btn-gold" style={{ padding: "10px 24px" }} onClick={() => setPage("dashboard")}>Dashboard</button>
          )}
        </div>
      </nav>

      <div style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, textAlign: "center", letterSpacing: "-0.04em" }}>
          Privacy <span style={{ color: "var(--accent)" }}>Policy</span>
        </h1>
        <p style={{ color: "var(--sub)", textAlign: "center", marginBottom: 60, fontSize: 18 }}>Effective Date: March 19, 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <Section title="1. Information We Collect">
            We collect information you provide directly to us when you create an account, generate certificates, or contact us for support. This includes:
            <ul style={{ paddingLeft: 20, marginTop: 12, color: "var(--sub)", lineHeight: 1.8 }}>
              <li><strong>Account Data:</strong> Email address, password (hashed), and subscription status.</li>
              <li><strong>Certificate Data:</strong> Names, dates, organization details, logos, and signatures used to generate certificates.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our platform, including IP address, browser type, and page views via industry-standard logs.</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            We use the collected data to provide, maintain, and improve CertifyPro. Specifically:
            <ul style={{ paddingLeft: 20, marginTop: 12, color: "var(--sub)", lineHeight: 1.8 }}>
              <li>To facilitate certificate creation and bulk processing.</li>
              <li>To manage your subscription and process payments.</li>
              <li>To provide customer support and send technical updates.</li>
              <li>To monitor and prevent fraudulent activity.</li>
            </ul>
          </Section>

          <Section title="3. Data Storage and Security">
            Your data is stored securely using industry-standard encryption. We use local storage for fast session handling and a protected database for permanent records. While we implement robust security measures, no system is 100% secure, and we cannot guarantee absolute security of your transmission.
          </Section>

          <Section title="4. Third-Party Services">
            We may use third-party services for specific functionalities:
            <ul style={{ paddingLeft: 20, marginTop: 12, color: "var(--sub)", lineHeight: 1.8 }}>
              <li><strong>Authentication:</strong> Google OAuth for social sign-in.</li>
              <li><strong>Storage:</strong> Secure database hosting for your certificate records.</li>
              <li><strong>Analytics:</strong> Basic telemetry to understand app performance.</li>
            </ul>
            These third parties have access to your information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </Section>

          <Section title="5. Your Rights and Choices">
            You have the right to access, update, or delete your personal information. You can do this within the platform settings or by contacting us. You may also opt out of non-essential communications at any time.
          </Section>

          <Section title="6. Cookies">
            We use cookies and similar technologies to remember your session and preferences. You can control cookie settings in your browser, though disabling them may limit some platform features.
          </Section>

          <Section title="7. Changes to This Policy">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Effective Date" at the top.
          </Section>

          <Section title="8. Contact Us">
            For contact, please go to the Contact Us page.
          </Section>
        </div>

        <div style={{ marginTop: 80, padding: 40, borderTop: "1px solid var(--border)", textAlign: "center", display: "flex", justifyContent: "center", gap: 24 }}>
          <button className="btn-ghost" style={{ padding: "12px 32px" }} onClick={() => setPage("landing")}>Back to Home</button>
          <button className="btn-ghost" style={{ padding: "12px 32px" }} onClick={() => setPage("faqs")}>FAQs</button>
          <button className="btn-ghost" style={{ padding: "12px 32px" }} onClick={() => setPage("contact")}>Contact Us</button>
          <button className="btn-gold" style={{ padding: "12px 32px" }} onClick={() => setPage("terms")}>Terms of Service</button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 32 }}>
    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>{title}</h2>
    <div style={{ color: "var(--sub)", lineHeight: 1.7, fontSize: 16 }}>{children}</div>
  </div>
);
