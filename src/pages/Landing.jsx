import React, { useState, useEffect } from 'react';
import { I } from '../components/Icons';
import { CertPreview } from '../components/CertPreview';

export const Landing = ({ user, setPage }) => {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const it = setInterval(() => setHeroIdx(i => (i + 1) % 15), 4000);
    return () => clearInterval(it);
  }, []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <nav style={{ padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", background: "rgba(6,7,9,0.8)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,var(--accent),var(--accent-br))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I n="award" c="#000" s={24}/>
          </div>
          <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>Certify<span style={{ color: "var(--accent)" }}>Pro</span></span>
        </div>
        <div className="hide-mobile" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <button className="nav-link" onClick={() => setPage("landing")}>Home</button>
          <button className="nav-link" onClick={() => document.getElementById('features').scrollIntoView({behavior: "smooth"})}>Features</button>
          <button className="nav-link" onClick={() => document.getElementById('templates').scrollIntoView({behavior: "smooth"})}>Templates</button>
          <button className="nav-link" onClick={() => document.getElementById('pricing').scrollIntoView({behavior: "smooth"})}>Pricing</button>
          <button className="nav-link" onClick={() => setPage("faqs")}>FAQs</button>
          <button className="nav-link" onClick={() => setPage("contact")}>Contact</button>
          <button className="nav-link" onClick={() => setPage("terms")}>Terms</button>
          <div style={{ width: 1, height: 24, background: "var(--border)" }} />
          {!user ? (
            <>
              <button className="nav-link" onClick={() => setPage("auth")}>Sign In</button>
              <button className="btn-gold" style={{ padding: "10px 24px" }} onClick={() => setPage("auth")}>Get Started</button>
            </>
          ) : (
            <button className="btn-gold" style={{ padding: "10px 24px", display: "flex", alignItems: "center", gap: 8 }} onClick={() => setPage("dashboard")}>Dashboard <I n="arrow" s={14}/></button>
          )}
        </div>
        <div className="show-mobile" style={{ display: "none" }}>
           <button className="btn-gold" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => setPage(user ? "dashboard" : "auth")}>{user ? "Dashboard" : "Get Started"}</button>
        </div>
      </nav>

      <div className="stack-mobile p-mobile-20" style={{ padding: "120px 40px", maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 60, minHeight: "calc(100vh - 80px)" }}>
        <div style={{ flex: 1 }}>
          <div className="tag au0" style={{ marginBottom: 24 }}><I n="sparkle" s={14}/> NEXT-GEN CERTIFICATION PLATFORM</div>
          <h1 className="au1" style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 24 }}>
            Create <span style={{ color: "var(--accent)" }}>Stunning</span> Certificates in Seconds.
          </h1>
          <p className="au2" style={{ fontSize: 20, color: "var(--sub)", lineHeight: 1.6, marginBottom: 40, maxWidth: 540 }}>
            Stop wrestling with complex design tools. Generate, track, and verify premium beautiful certificates natively. 
          </p>
          <div className="au3" style={{ display: "flex", gap: 16 }}>
            <button className="btn-gold" style={{ padding: "16px 36px", fontSize: 16 }} onClick={() => setPage(user ? "dashboard" : "auth")}>{user ? "Launch App" : "Start Creating for Free"} <I n="arrow" s={16}/></button>
            <button className="btn-ghost" style={{ padding: "16px 36px", fontSize: 16 }} onClick={() => document.getElementById('templates').scrollIntoView({behavior: "smooth"})}>View Gallery</button>
          </div>
        </div>
        
        <div className="au4" style={{ flex: 1, position: "relative" }}>
          {/* A glowing backdrop to emphasize the premium feel */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", height: "80%", background: "var(--accent)", filter: "blur(120px)", opacity: 0.15, borderRadius: "50%" }} />
          <div className="cert-preview-wrapper cert-a">
            <CertPreview 
              themeIdx={heroIdx} 
              data={{
                recipientName: "Demo User",
                courseTitle: "Platform Feature Preview",
                date: "Aug 15, 2026",
                organization: "CertifyPro Demo",
                instructor: "Platform Director",
                certId: "DEMO-XYZ",
                logoUrl: "", sigUrl: ""
              }} 
            />
          </div>
        </div>
      </div>

      {/* Restored Sections for Navigation */}
      <section id="features" style={{ padding: "100px 40px", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 20 }}>Powerful Features</h2>
          <p style={{ fontSize: 18, color: "var(--sub)", marginBottom: 60 }}>Everything you need to automate certification.</p>
          <div className="grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            <div style={{ background: "var(--bg)", padding: 32, borderRadius: 16, border: "1px solid var(--border)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(191,164,106,0.1)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, margin: "0 auto 24px" }}><I n="award" s={24}/></div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>15+ Premium Templates</h3>
              <p style={{ color: "var(--sub)", fontSize: 15, lineHeight: 1.6 }}>Choose from dozens of professionally designed layouts for any occasion.</p>
            </div>
            <div style={{ background: "var(--bg)", padding: 32, borderRadius: 16, border: "1px solid var(--border)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(64,201,136,0.1)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, margin: "0 auto 24px" }}><I n="download" s={24}/></div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>High-Res Exports</h3>
              <p style={{ color: "var(--sub)", fontSize: 15, lineHeight: 1.6 }}>Download pixel-perfect PNGs natively generated without cropping issues.</p>
            </div>
            <div style={{ background: "var(--bg)", padding: 32, borderRadius: 16, border: "1px solid var(--border)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(81,152,240,0.1)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, margin: "0 auto 24px" }}><I n="users" s={24}/></div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Bulk Generation</h3>
              <p style={{ color: "var(--sub)", fontSize: 15, lineHeight: 1.6 }}>Import CSVs to generate hundreds of certificates in a single click.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="templates" style={{ padding: "100px 40px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 20 }}>Beautiful Templates</h2>
          <p style={{ fontSize: 18, color: "var(--sub)", marginBottom: 60 }}>Carefully crafted designs for every achievement.</p>
          <div className="grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[0, 4, 8, 12, 13, 2].map(idx => (
              <div key={idx} style={{ padding: "24px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", cursor: "pointer" }} className="card-hover">
                <CertPreview themeIdx={idx} data={{ recipientName: "Demo User", courseTitle: "Sample Course", date: "Jan 2026", organization: "Academy", instructor: "Director", certId: "123", logoUrl: "", sigUrl: "" }} />
              </div>
            ))}
          </div>
          <button style={{ marginTop: 40 }} className="btn-gold" onClick={() => setPage(user ? "billing" : "auth")}>Unlock All Templates</button>
        </div>
      </section>

      <section id="pricing" style={{ padding: "100px 40px", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 20 }}>Simple Pricing</h2>
          <p style={{ fontSize: 18, color: "var(--sub)", marginBottom: 60 }}>Everything you need to issue stunning verifications globally.</p>
          <div className="grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, textAlign: "left" }}>
            
            <div style={{ background: "var(--bg)", padding: 40, borderRadius: 16, border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Free</h3>
              <div style={{ fontSize: 48, fontWeight: 800, margin: "24px 0" }}>$0</div>
              <p style={{ color: "var(--sub)", marginBottom: 32 }}>Access to 4 basic templates without watermark.</p>
              <button className="btn-ghost" style={{ width: "100%", padding: 16 }} onClick={() => setPage(user ? "builder" : "auth")}>Get Started</button>
            </div>
            
            <div style={{ background: "var(--bg)", padding: 40, borderRadius: 16, border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "var(--accent)" }}>Pro (PKR)</h3>
              <div style={{ fontSize: 48, fontWeight: 800, margin: "24px 0" }}>PKR 1399</div>
              <p style={{ color: "var(--sub)", marginBottom: 32 }}>All pro features, bulk generation, no watermarks, PKR payment.</p>
              <button className="btn-gold" style={{ width: "100%", padding: 16 }} onClick={() => setPage(user ? "payment-pkr" : "auth")}>Proceed to Payment</button>
            </div>

            <div style={{ background: "linear-gradient(180deg, rgba(191,164,106,0.1), var(--bg))", padding: 40, borderRadius: 16, border: "1px solid var(--accent)", position: "relative" }}>
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "var(--accent)", color: "#000", padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>PRO</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "var(--accent)" }}>Pro (International)</h3>
              <div style={{ fontSize: 48, fontWeight: 800, margin: "24px 0" }}>$5</div>
              <p style={{ color: "var(--sub)", marginBottom: 32 }}>All pro features, bulk generation, no watermarks, USD payment.</p>
              <button className="btn-gold" style={{ width: "100%", padding: 16 }} onClick={() => setPage(user ? "payment-int" : "auth")}>Proceed to Payment</button>
            </div>
            
          </div>
        </div>
      </section>

      <footer style={{ padding: "60px 40px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div className="stack-mobile" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,var(--accent),var(--accent-br))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <I n="award" c="#000" s={18}/>
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>CertifyPro</span>
          </div>
          <div className="stack-mobile" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 24 }}>
                <button className="nav-link" onClick={() => setPage("terms")}>Terms</button>
                <button className="nav-link" onClick={() => setPage("privacy")}>Privacy</button>
            </div>
            <span style={{ color: "var(--muted)", fontSize: 14 }}>© 2026 CertifyPro.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
