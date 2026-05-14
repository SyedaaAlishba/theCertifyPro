import React, { useState, useEffect } from 'react';

let setToastRef = null;

export const Toast = () => {
  const [msg, setMsg] = useState(null);
  
  useEffect(() => {
    setToastRef = (m) => {
      setMsg(m);
      setTimeout(() => setMsg(null), 3200);
    };
    return () => { setToastRef = null; };
  }, []);

  if (!msg) return null;
  const icons = { success:"✓", error:"✗", info:"ℹ" };
  const colors = { success:"#40C988", error:"#E05757", info:"#5198F0" };
  
  return (
    <div className="toast" style={{ position:"fixed", top:20, right:20, zIndex:9999, background:"#111318", border:`1px solid ${colors[msg.type]||"#1A1C26"}40`, borderRadius:12, padding:"13px 18px", display:"flex", alignItems:"center", gap:10, boxShadow:"0 16px 48px rgba(0,0,0,.55)", maxWidth:320 }}>
      <div style={{ width:24, height:24, borderRadius:"50%", background:(colors[msg.type]||"#5198F0")+"20", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:colors[msg.type]||"#5198F0", fontWeight:700, flexShrink:0 }}>
        {icons[msg.type]||"ℹ"}
      </div>
      <span style={{ fontSize:13.5, fontWeight:500 }}>{msg.text}</span>
    </div>
  );
};

export const toast = (text, type="success") => {
  if (setToastRef) setToastRef({ text, type });
};
