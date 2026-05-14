import React from 'react';

export const Tag = ({ children, color = "var(--accent)", dot }) => (
  <span className="tag" style={{ background: color+"16", color, border:`1px solid ${color}30` }}>
    {dot && <span style={{width:5,height:5,borderRadius:"50%",background:color,display:"inline-block"}}/>}
    {children}
  </span>
);

export const GoldText = ({ children }) => (
  <span style={{ background:`linear-gradient(135deg,var(--accent-br) 0%,var(--accent) 50%,#9A7A30 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
    {children}
  </span>
);

export const Divider = ({ label }) => (
  <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0" }}>
    <div style={{ flex:1, height:1, background:"var(--border)" }} />
    {label && <span style={{ fontSize:12, color:"var(--muted)", whiteSpace:"nowrap" }}>{label}</span>}
    <div style={{ flex:1, height:1, background:"var(--border)" }} />
  </div>
);
