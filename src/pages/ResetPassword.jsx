import React, { useState, useEffect } from 'react';
import { toast } from '../components/Toast';
import { auth } from '../api';

export const ResetPassword = ({ setPage }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const isMounted = React.useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get('token');
    if (t) {
      if (isMounted.current) setToken(t);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast("Passwords do not match", "error");
    }
    if (password.length < 6) {
      return toast("Password must be at least 6 characters", "error");
    }

    setLoading(true);
    try {
      await auth.resetPassword({ token, newPassword: password });

      toast("Password reset successfully! You can now sign in.");
      if (isMounted.current) {
        setPage("auth");
      }
    } catch (err) {
      if (isMounted.current) {
        toast(err.message, "error");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  if (!token) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--bg)" }}>
        <div style={{ textAlign: "center", maxWidth: 400, padding: 40, background: "var(--surface)", borderRadius: 24, border: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Invalid Link</h2>
          <p style={{ color: "var(--sub)", marginBottom: 24 }}>This password reset link is invalid or has expired.</p>
          <button onClick={() => setPage("auth")} className="btn-gold" style={{ width: "100%" }}>Return to Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--bg)" }}>
      <div style={{ width: "100%", maxWidth: 400, padding: 40, background: "var(--surface)", borderRadius: 24, border: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, letterSpacing: "-0.02em" }}>Reset Password</h2>
        <p style={{ color: "var(--sub)", marginBottom: 32, fontSize: 15 }}>Enter your new secure password below.</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--sub)", marginBottom: 8, display: "block" }}>New Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="field" placeholder="••••••••" />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--sub)", marginBottom: 8, display: "block" }}>Confirm Password</label>
            <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="field" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="btn-gold" style={{ padding: "14px", marginTop: 8, fontSize: 15 }}>
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};
