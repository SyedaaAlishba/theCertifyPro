import React, { useState } from 'react';
import { I } from './Icons';

export const Shell = ({ user, page, setPage, handleLogOut, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ display:"flex", height:"100vh", width:"100vw", background:"var(--bg)", overflow:"hidden", position: "relative" }}>
      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 90, display: "none" }} 
          className="show-mobile"
        />
      )}

      <div className={isSidebarOpen ? "show-mobile" : "hide-mobile"} style={{ zIndex: 100 }}>
        <Sidebar user={user} page={page} setPage={(p) => { setPage(p); setIsSidebarOpen(false); }} handleLogOut={handleLogOut} />
      </div>

      <div style={{ flex:1, display:"flex", flexDirection:"column", overflowY:"auto", position:"relative" }}>
        <Header user={user} page={page} setPage={setPage} handleLogOut={handleLogOut} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="p-mobile-20">
          {children}
        </div>
      </div>
    </div>
  );
};

const Header = ({ user, page, setPage, handleLogOut, onMenuClick }) => (
  <div style={{ padding:"24px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"var(--surface)", borderBottom:"1px solid var(--border)", position:"sticky", top:0, zIndex:80 }} className="p-mobile-20">
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <button className="show-mobile btn-ghost" style={{ display: "none", padding: 8 }} onClick={onMenuClick}>
        <I n="menu" s={20} />
      </button>
      <div>
        <h2 style={{ fontSize:22, fontWeight:700 }}>{page.charAt(0).toUpperCase() + page.slice(1)}</h2>
        <p className="hide-mobile" style={{ color:"var(--muted)", fontSize:14, marginTop:4 }}>CertifyPro Dashboard</p>
      </div>
    </div>
    <div style={{ display:"flex", alignItems:"center", gap:20 }}>
      {user.plan === "free" && (
        <button onClick={() => setPage("billing")} className="btn-gold hide-mobile" style={{ padding:"10px 20px", display:"flex", alignItems:"center", gap:8, fontSize:13 }}>
          <I n="star" s={16}/> Upgrade Pro
        </button>
      )}
      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"6px 14px", background:"var(--bg)", borderRadius:30, border:"1px solid var(--border)" }} className="p-mobile-20">
        <div style={{ width:32, height:32, borderRadius:16, background:"var(--accent)", color:"#000", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14 }}>
          {user.email.charAt(0).toUpperCase()}
        </div>
        <span className="hide-mobile" style={{ fontSize:14, fontWeight:500, color:"var(--text)" }}>{user.email}</span>
      </div>
    </div>
  </div>
);

const Sidebar = ({ user, page, setPage, handleLogOut }) => (
  <div style={{ width:260, height: "100%", background:"var(--surface)", borderRight:"1px solid var(--border)", display:"flex", flexDirection:"column" }}>
    <div style={{ padding:"30px", borderBottom:"1px solid var(--border)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer" }} onClick={() => setPage("landing")}>
        <div style={{ width:36, height:36, borderRadius:8, background:"linear-gradient(135deg,var(--accent),var(--accent-br))", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <I n="award" c="#000" s={22}/>
        </div>
        <span style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.03em" }}>Certify<span style={{color:"var(--accent)"}}>Pro</span></span>
      </div>
    </div>
    <div className="hide-scroll" style={{ padding:"24px 20px", display:"flex", flexDirection:"column", gap:8, flex:1, overflowY: "auto" }}>
      <button className={`sidebar-btn ${page==="dashboard"?"act":""}`} onClick={() => setPage("dashboard")}>
        <I n="grid"/> Dashboard
      </button>
      <button className={`sidebar-btn ${page==="builder"?"act":""}`} onClick={() => setPage("builder")}>
        <I n="paint"/> Certificate Builder
      </button>
      <button className={`sidebar-btn ${page==="bulk"?"act":""}`} onClick={() => setPage("bulk")}>
        <I n="upload"/> Bulk Generation
      </button>
      <button className={`sidebar-btn ${page==="history"?"act":""}`} onClick={() => setPage("history")}>
        <I n="clock"/> Export History
      </button>
      
      <div style={{ margin:"24px 0", height:1, background:"var(--border)" }} />
      <div style={{ fontSize:11, fontWeight:700, color:"var(--sub)", letterSpacing:".08em", padding:"0 12px 12px", textTransform:"uppercase" }}>Workspace</div>
      
      {user.role === 'admin' && (
        <button className={`sidebar-btn ${page==="admin"?"act":""}`} onClick={() => setPage("admin")} style={{ color: "var(--accent)" }}>
          <I n="shield"/> Admin Panel
        </button>
      )}

      <button className={`sidebar-btn ${page==="settings"?"act":""}`} onClick={() => setPage("settings")}>
        <I n="settings"/> Settings
      </button>
      <button className={`sidebar-btn ${page==="billing"?"act":""}`} onClick={() => setPage("billing")}>
        <I n="credit"/> Billing <span style={{ marginLeft:"auto", background:user.plan==="pro"?"#40C98820":"var(--border)", color:user.plan==="pro"?"var(--green)":"var(--text)", padding:"2px 8px", borderRadius:10, fontSize:10, fontWeight:700 }}>{user.plan.toUpperCase()}</span>
      </button>

      <button className={`sidebar-btn ${page==="terms"?"act":""}`} onClick={() => setPage("terms")}>
        <I n="file"/> Terms & Conditions
      </button>

      <button className={`sidebar-btn ${page==="privacy"?"act":""}`} onClick={() => setPage("privacy")}>
        <I n="shield"/> Privacy Policy
      </button>
      
      <button className={`sidebar-btn ${page==="faqs"?"act":""}`} onClick={() => setPage("faqs")}>
        <I n="award"/> FAQs
      </button>

      <button className={`sidebar-btn ${page==="contact"?"act":""}`} onClick={() => setPage("contact")}>
        <I n="mail"/> Contact Us
      </button>
    </div>
    <div style={{ padding:"24px 20px", borderTop:"1px solid var(--border)" }}>
      <button className="sidebar-btn" onClick={handleLogOut}>
        <I n="logout"/> Sign Out
      </button>
    </div>
  </div>
);
