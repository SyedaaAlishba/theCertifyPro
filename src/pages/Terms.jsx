import React from 'react';
import { I } from '../components/Icons';

export const Terms = ({ user, setPage }) => {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      {/* Navbar - Matching Landing.jsx */}
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
          Terms and <span style={{ color: "var(--accent)" }}>Conditions</span>
        </h1>
        <p style={{ color: "var(--sub)", textAlign: "center", marginBottom: 60, fontSize: 18 }}>Last updated: March 19, 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <Section title="1. Acceptance of Terms">
            By accessing or using CertifyPro ("the Service"), you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, do not use the Service.
          </Section>

          <Section title="2. Service Description">
            CertifyPro provides a web-based platform for creating, managing, and verifying digital certificates. Features include template selection, bulk generation, high-resolution exports, and public verification pages.
          </Section>

          <Section title="3. User Accounts">
            To access certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. We reserve the right to suspend or terminate accounts that violate our terms.
          </Section>

          <Section title="4. User Responsibilities / Content">
            You are solely responsible for the content you upload, including recipient names, course titles, organization details, logos, and signatures. You must ensure you have the necessary rights to use all provided materials. CertifyPro does not endorse or assume liability for any user-generated content.
          </Section>

          <Section title="5. Subscription & Billing">
            CertifyPro offers both Free and Pro subscription plans.
            <ul style={{ paddingLeft: 20, marginTop: 12, color: "var(--sub)", lineHeight: 1.8 }}>
              <li><strong>Free Plan:</strong> Limited templates and certificate generation counts. May include watermarks.</li>
              <li><strong>Pro Plan:</strong> Unlimited certificates, bulk generation, premium templates, and custom branding. Billed monthly or annually as selected during checkout.</li>
            </ul>
            Payments are processed securely via our third-party payment providers. Subscriptions renew automatically unless cancelled.
          </Section>

          <Section title="6. Acceptable Use">
            You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, or impair the platform. Prohibited activities include but are not limited to: fraud, distributing malware, or generating certificates for misleading or illegal purposes.
          </Section>

          <Section title="7. Intellectual Property">
            The Service and its original content (excluding user-provided content), features, and functionality are and will remain the exclusive property of CertifyPro and its licensors. Our templates and icons are provided for use within the platform only.
          </Section>

          <Section title="8. Limitation of Liability">
            In no event shall CertifyPro, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your access to or use of the Service.
          </Section>

          <Section title="9. Termination">
            We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </Section>

          <Section title="10. Changes to Terms">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of significant changes. Your continued use of the Service after such modifications constitutes acceptance of the new terms.
          </Section>

          <Section title="11. Contact Information">
            For contact, please go to the Contact Us page.
          </Section>
        </div>

        <div style={{ marginTop: 80, padding: 40, borderTop: "1px solid var(--border)", textAlign: "center", display: "flex", justifyContent: "center", gap: 24 }}>
          <button className="btn-ghost" style={{ padding: "12px 32px" }} onClick={() => setPage("landing")}>Back to Home</button>
          <button className="btn-ghost" style={{ padding: "12px 32px" }} onClick={() => setPage("faqs")}>FAQs</button>
          <button className="btn-ghost" style={{ padding: "12px 32px" }} onClick={() => setPage("contact")}>Contact Us</button>
          <button className="btn-gold" style={{ padding: "12px 32px" }} onClick={() => setPage("privacy")}>Privacy Policy</button>
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
