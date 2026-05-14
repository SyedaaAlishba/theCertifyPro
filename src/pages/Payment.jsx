import React, { useState, useEffect } from 'react';
import { I } from '../components/Icons';
import { payments, uploads } from '../api';
import { toast } from '../components/Toast';

export const Payment = ({ user, setPage, planType }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [trxnId, setTrxnId] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    payments.generateId().then(res => setPaymentId(res.paymentId)).catch(console.error);
  }, []);

  const isPkr = planType === 'pkr';
  const planName = isPkr ? 'Pro (PKR)' : 'Pro (International)';
  const amount = isPkr ? 'PKR 1399' : '$5';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast("Please upload a payment screenshot", "error");
      return;
    }
    
    // File validation: check size and type
    if (!file.type.startsWith('image/')) {
      toast("Only image files are allowed", "error");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast("File size must be less than 2MB", "error");
      return;
    }

    if (isPkr && trxnId.length < 8) {
      toast("Transaction ID must be at least 8 characters", "error");
      return;
    }

    if (!paymentId) {
      toast("Payment ID is generating, please wait", "error");
      return;
    }

    setLoading(true);
    try {
      const { url } = await uploads.image(file);
      await payments.submit({
        planType,
        paymentId,
        screenshot: url,
        trxnId,
        note
      });
      setSubmitted(true);
      toast("Payment submitted successfully!");
    } catch (err) {
      toast(err.message || "Failed to submit payment", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`I have paid for Pro Plan. Payment ID: ${paymentId}`);
    window.open(`https://wa.me/923172033966?text=${msg}`);
  };

  if (submitted) {
    return (
      <div style={{ padding: 60, maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, background: "rgba(64,201,136,0.1)", color: "var(--green)", borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <I n="check" s={32} />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Payment Submitted</h2>
        <p style={{ color: "var(--sub)", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          Your payment is under verification. You will be upgraded after approval.
        </p>
        <button className="btn-gold" style={{ padding: "12px 24px" }} onClick={() => setPage("dashboard")}>Return to Dashboard</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "0 auto" }}>
      <button className="btn-ghost" style={{ padding: "8px 16px", marginBottom: 32 }} onClick={() => setPage("billing")}>
        <I n="arrow" style={{ transform: "rotate(180deg)", marginRight: 8 }} /> Back to Plans
      </button>

      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Complete Payment</h1>
      <p style={{ color: "var(--sub)", marginBottom: 32 }}>Upgrade to {planName} for {amount}</p>

      {paymentId && (
        <div style={{ background: "rgba(191,164,106,0.1)", border: "1px solid var(--accent)", borderRadius: 12, padding: 20, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, color: "var(--sub)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Your Unique Payment ID</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text)" }}>{paymentId}</div>
          </div>
          <div style={{ color: "var(--sub)", fontSize: 13, maxWidth: 220, textAlign: "right" }}>
            IMPORTANT: Add this ID in your payment note or reference.
          </div>
        </div>
      )}

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 32, marginBottom: 32 }}>
        {isPkr ? (
          <>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Payment Instructions</h3>
            <div style={{ background: "var(--bg)", padding: 20, borderRadius: 8, marginBottom: 24 }}>
              <ol style={{ margin: 0, paddingLeft: 20, color: "var(--sub)", display: "flex", flexDirection: "column", gap: 12 }}>
                <li>Send exactly <strong style={{color:"var(--text)"}}>PKR 1399</strong> to the following NayaPay account:</li>
                <div style={{ fontSize: 24, fontWeight: 800, color: "var(--accent)", padding: "12px 0" }}>03172033966</div>
                <li>When sending payment, include the <strong>Payment ID ({paymentId})</strong> in the note/message.</li>
                <li>Take a screenshot of the successful transaction.</li>
                <li>Upload the screenshot below and enter the Transaction ID.</li>
              </ol>
            </div>
          </>
        ) : (
          <>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Payment Instructions</h3>
            <div style={{ background: "var(--bg)", padding: 20, borderRadius: 8, marginBottom: 24 }}>
              <ol style={{ margin: 0, paddingLeft: 20, color: "var(--sub)", display: "flex", flexDirection: "column", gap: 12 }}>
                <li>Send payment of <strong style={{color:"var(--text)"}}>$5</strong> via international transfer / Wise / bank.</li>
                <li>When sending payment, include the <strong>Payment ID ({paymentId})</strong> in the reference or message.</li>
                <li>Take a screenshot or save the payment proof.</li>
                <li>Upload the proof below and submit.</li>
                <li>Contact us on WhatsApp after payment for confirmation.</li>
              </ol>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 500, fontSize: 14 }}>Upload Screenshot / Proof <span style={{color:"var(--danger)"}}>*</span></label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={e => setFile(e.target.files[0])}
              style={{ width: "100%", padding: 12, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", marginBottom: preview ? 12 : 0 }}
              required 
            />
            {preview && (
              <div style={{ position: "relative", width: "100%", height: 200, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", background: "black" }}>
                <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                <button 
                  type="button"
                  onClick={() => setFile(null)}
                  style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: 24, height: 24, color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <I n="x" s={14} />
                </button>
              </div>
            )}
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 500, fontSize: 14 }}>
              {isPkr ? <><span style={{color:"var(--danger)"}}>*</span> Transaction ID</> : 'Optional Note / Email'}
            </label>
            <input 
              type="text" 
              value={isPkr ? trxnId : note}
              onChange={e => isPkr ? setTrxnId(e.target.value) : setNote(e.target.value)}
              placeholder={isPkr ? "e.g. 12345678" : "Any details to help locate payment"}
              style={{ width: "100%", padding: 12, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)" }}
            />
          </div>

          <button type="submit" className="btn-gold" style={{ width: "100%", padding: 16, marginTop: 8 }} disabled={loading}>
            {loading ? "Uploading & Submitting..." : "Submit Payment"}
          </button>
        </form>
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "var(--sub)", fontSize: 14, marginBottom: 16 }}>Need help or want to confirm manually?</p>
        <button className="btn-ghost" style={{ padding: "10px 20px", display: "inline-flex", alignItems: "center", gap: 8 }} onClick={handleWhatsApp}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Confirm on WhatsApp
        </button>
      </div>
    </div>
  );
};
