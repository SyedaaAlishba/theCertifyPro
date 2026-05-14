import React from 'react';
import { I } from '../components/Icons';

export const FAQs = ({ user, setPage }) => {
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
          <button className="nav-link" onClick={() => setPage("terms")}>Terms</button>
          <button className="nav-link" onClick={() => setPage("privacy")}>Privacy</button>
          <button className="nav-link" onClick={() => setPage("contact")}>Contact</button>
          {!user ? (
            <button className="btn-gold" style={{ padding: "10px 24px" }} onClick={() => setPage("auth")}>Get Started</button>
          ) : (
            <button className="btn-gold" style={{ padding: "10px 24px" }} onClick={() => setPage("dashboard")}>Dashboard</button>
          )}
        </div>
      </nav>

      <div style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, textAlign: "center", letterSpacing: "-0.04em" }}>
          Frequently Asked <span style={{ color: "var(--accent)" }}>Questions</span>
        </h1>
        <p style={{ color: "var(--sub)", textAlign: "center", marginBottom: 60, fontSize: 18 }}>Everything you need to know about CertifyPro.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <Section title="What is CertifyPro?">
            CertifyPro is a next-generation SaaS platform designed for creating, managing, and issuing professional certificates. Whether you're an educational institution, a corporate trainer, or an event organizer, CertifyPro helps you automate the certification process with premium templates and bulk generation tools.
          </Section>

          <Section title="Is there a free trial available?">
            Yes! We offer a free tier that allows you to explore our platform and create certificates using a selection of starter templates. Pro features like high-resolution exports and watermark removal are available on our paid plans.
          </Section>

          <Section title="Can I generate certificates in bulk?">
            Absolutely. Our Bulk Generator allows you to upload a CSV file with recipient details and generate hundreds of personalized certificates in minutes. This feature is designed to save you hours of manual work.
          </Section>

          <Section title="Are the certificates customizable?">
            Yes, you can customize almost every aspect of your certificates, including names, course titles, dates, organization logos, and signatures. Our Builder tool gives you full control over the final look and feel.
          </Section>

          <Section title="What formats can I export my certificates in?">
            Certificates can be exported as high-resolution PNG files, ensuring they look pixel-perfect whether they are shared digitally or printed.
          </Section>

          <Section title="Is my data secure?">
            Security is our top priority. We use industry-standard encryption for data storage and secure authentication methods to ensure that your certificates and recipient data are always protected.
          </Section>
        </div>

        <div style={{ marginTop: 80, padding: 40, borderTop: "1px solid var(--border)", textAlign: "center", display: "flex", justifyContent: "center", gap: 24 }}>
          <button className="btn-ghost" style={{ padding: "12px 32px" }} onClick={() => setPage("landing")}>Back to Home</button>
          <button className="btn-gold" style={{ padding: "12px 32px" }} onClick={() => setPage("contact")}>Still have questions? Contact Us</button>
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
