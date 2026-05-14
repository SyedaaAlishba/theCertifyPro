import React from 'react';
import { trunc } from '../utils/helpers';

const AuthAssets = ({ data, xLogo, yLogo, xSig, ySig, logoW=100, sigW=160, align="middle", themeMode }) => (
  <g>
    {data.logoUrl && (
      <image href={data.logoUrl} x={align==="middle" ? xLogo - logoW/2 : xLogo} y={yLogo} width={logoW} height={logoW*0.6} preserveAspectRatio="xMidYMid contain" />
    )}
    {data.sigUrl && (
      <image 
        href={data.sigUrl} 
        x={align==="middle" ? xSig - sigW/2 : xSig} 
        y={ySig} 
        width={sigW} 
        height={sigW*0.4} 
        preserveAspectRatio="xMidYMid contain"
        filter={`url(#${themeMode === 'light' ? 'sig-make-dark' : 'sig-make-light'})`}
      />
    )}
  </g>
);

// T16: Classic Elegant (Academic/Corporate crossover, Serif, formal)
export const T16 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#FDFBF7" />
      <rect x="40" y="40" width="1360" height="940" fill="none" stroke="#2C3E50" strokeWidth="6" />
      <rect x="52" y="52" width="1336" height="916" fill="none" stroke="#D4AF37" strokeWidth="2" />

      <AuthAssets data={data} xLogo={720} yLogo={90} xSig={420} ySig={755} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 180 : 130} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="24" fontWeight="700" fill="#2C3E50" letterSpacing="6">
        {(organization || "INSTITUTE OF EXCELLENCE").toUpperCase()}
      </text>

      <text x="720" y="320" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="72" fontWeight="700" fill="#1A252F">
        Certificate of Achievement
      </text>

      <text x="720" y="400" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#7F8C8D" fontStyle="italic" letterSpacing="2">
        This document proudly certifies that
      </text>

      <text x="720" y="520" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="64" fontWeight="800" fill="#D4AF37">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="600" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#7F8C8D" fontStyle="italic">
        has successfully fulfilled all requirements to graduate from
      </text>

      <text x="720" y="680" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="42" fontWeight="600" fill="#2C3E50">
        {trunc(courseTitle, 45)}
      </text>

      <line x1="300" y1="840" x2="540" y2="840" stroke="#2C3E50" strokeWidth="1" />
      <text x="420" y="875" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#1A252F">{instructor}</text>
      <text x="420" y="900" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fill="#7F8C8D" letterSpacing="2">INSTRUCTOR / DIRECTOR</text>

      <line x1="900" y1="840" x2="1140" y2="840" stroke="#2C3E50" strokeWidth="1" />
      <text x="1020" y="875" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#1A252F">{date}</text>
      <text x="1020" y="900" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fill="#7F8C8D" letterSpacing="2">DATE OF ISSUANCE</text>

      <text x="720" y="950" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#BDC3C7" letterSpacing="2">
        ID: {certId}
      </text>
    </g>
  );
};

// T17: Modern Minimal (Sans-serif, clean)
export const T17 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#FFFFFF" />
      <rect x="0" y="0" width="1440" height="24" fill="#0F172A" />
      <rect x="60" y="60" width="1320" height="900" fill="none" stroke="#F1F5F9" strokeWidth="2" />

      <AuthAssets data={data} xLogo={720} yLogo={90} xSig={420} ySig={755} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 180 : 130} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="700" fill="#0F172A" letterSpacing="4">
        {(organization || "GLOBAL ACADEMY").toUpperCase()}
      </text>

      <text x="720" y="320" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="76" fontWeight="800" fill="#0F172A" letterSpacing="-1">
        CERTIFICATION
      </text>

      <text x="720" y="400" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fill="#64748B" letterSpacing="4">
        OFFICIALLY GRANTED TO
      </text>

      <text x="720" y="520" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="64" fontWeight="700" fill="#2563EB">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="600" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fill="#64748B" letterSpacing="1">
        IN RECOGNITION OF COMPLETING
      </text>

      <text x="720" y="680" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="36" fontWeight="600" fill="#0F172A">
        {trunc(courseTitle, 45)}
      </text>

      <line x1="300" y1="840" x2="540" y2="840" stroke="#CBD5E1" strokeWidth="2" />
      <text x="420" y="875" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="600" fill="#0F172A">{instructor}</text>
      <text x="420" y="900" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#94A3B8" letterSpacing="1">AUTHORIZED SIGNATURE</text>

      <line x1="900" y1="840" x2="1140" y2="840" stroke="#CBD5E1" strokeWidth="2" />
      <text x="1020" y="875" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="600" fill="#0F172A">{date}</text>
      <text x="1020" y="900" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#94A3B8" letterSpacing="1">AWARD DATE</text>

      <text x="720" y="950" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#CBD5E1" letterSpacing="1">
        REF: {certId}
      </text>
    </g>
  );
};

// T18: Luxury Bold (Strong contrast, premium headings)
export const T18 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#0B0C10" />
      <rect x="50" y="50" width="1340" height="920" fill="none" stroke="#C5A880" strokeWidth="4" />
      <rect x="65" y="65" width="1310" height="890" fill="none" stroke="#C5A880" strokeWidth="1" opacity="0.4" />

      <AuthAssets data={data} xLogo={720} yLogo={90} xSig={420} ySig={755} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 180 : 130} textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="22" fontWeight="600" fill="#C5A880" letterSpacing="8">
        {(organization || "PREMIUM INSTITUTION").toUpperCase()}
      </text>

      <text x="720" y="320" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="76" fontWeight="700" fill="#F3F4F6">
        Award of Excellence
      </text>

      <text x="720" y="400" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fill="#9CA3AF" letterSpacing="6">
        PROUDLY BESTOWED UPON
      </text>

      <text x="720" y="520" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="68" fontWeight="800" fill="#C5A880">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="600" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#9CA3AF" fontStyle="italic">
        For outstanding mastery and performance in
      </text>

      <text x="720" y="680" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="40" fontWeight="500" fill="#F3F4F6">
        {trunc(courseTitle, 45)}
      </text>

      <line x1="300" y1="840" x2="540" y2="840" stroke="#C5A880" strokeWidth="1" opacity="0.6" />
      <text x="420" y="875" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="20" fontWeight="500" fill="#F3F4F6">{instructor}</text>
      <text x="420" y="900" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#C5A880" letterSpacing="2">INSTRUCTOR</text>

      <line x1="900" y1="840" x2="1140" y2="840" stroke="#C5A880" strokeWidth="1" opacity="0.6" />
      <text x="1020" y="875" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="20" fontWeight="500" fill="#F3F4F6">{date}</text>
      <text x="1020" y="900" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#C5A880" letterSpacing="2">DATE</text>

      <text x="720" y="950" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#4B5563" letterSpacing="3">
        {certId}
      </text>
    </g>
  );
};

// T19: Academic Formal (University-style document feel)
export const T19 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#FAFAFA" />
      <rect x="40" y="40" width="1360" height="940" fill="none" stroke="#1E3A8A" strokeWidth="3" />
      <rect x="48" y="48" width="1344" height="924" fill="none" stroke="#1E3A8A" strokeWidth="1" />

      <AuthAssets data={data} xLogo={720} yLogo={90} xSig={420} ySig={755} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 180 : 130} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="32" fontWeight="800" fill="#1E3A8A">
        {(organization || "ACADEMIA UNIVERSITY").toUpperCase()}
      </text>

      <text x="720" y="320" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="72" fontWeight="800" fill="#111827">
        DIPLOMA OF COMPLETION
      </text>

      <text x="720" y="400" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#4B5563" fontStyle="italic">
        The faculty hereby recognizes
      </text>

      <text x="720" y="520" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="64" fontWeight="700" fill="#1E3A8A">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="600" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#4B5563">
        who has satisfactorily fulfilled the prescribed curriculum for
      </text>

      <text x="720" y="680" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="42" fontWeight="700" fill="#111827">
        {trunc(courseTitle, 45)}
      </text>

      <line x1="300" y1="840" x2="540" y2="840" stroke="#1E3A8A" strokeWidth="2" />
      <text x="420" y="875" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="600" fill="#111827">{instructor}</text>
      <text x="420" y="900" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#6B7280" letterSpacing="1">ACADEMIC SUPERVISOR</text>

      <line x1="900" y1="840" x2="1140" y2="840" stroke="#1E3A8A" strokeWidth="2" />
      <text x="1020" y="875" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="600" fill="#111827">{date}</text>
      <text x="1020" y="900" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#6B7280" letterSpacing="1">ISSUANCE DATE</text>

      <text x="720" y="950" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#9CA3AF">
        NO. {certId}
      </text>
    </g>
  );
};

// T20: Creative Premium (Slight stylistic uniqueness)
export const T20 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#1C1E26" />
      
      <circle cx="1440" cy="1020" r="400" fill="#10B981" opacity="0.05" />
      <circle cx="0" cy="0" r="300" fill="#10B981" opacity="0.05" />
      
      <rect x="0" y="0" width="16" height="1020" fill="#10B981" />

      <AuthAssets data={data} xLogo={720} yLogo={90} xSig={420} ySig={755} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 180 : 130} textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="20" fontWeight="700" fill="#10B981" letterSpacing="4">
        {(organization || "STUDIO COLLECTIVE").toUpperCase()}
      </text>

      <text x="720" y="320" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="80" fontWeight="800" fill="#FFFFFF" letterSpacing="-2">
        CERTIFICATE
      </text>

      <text x="720" y="400" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#9CA3AF" letterSpacing="1">
        OF PROFESSIONAL MERIT
      </text>

      <text x="720" y="520" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="64" fontWeight="600" fill="#10B981">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="600" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fill="#9CA3AF" letterSpacing="2">
        FOR CREATIVE COMPLETION OF
      </text>

      <text x="720" y="680" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="36" fontWeight="600" fill="#FFFFFF">
        {trunc(courseTitle, 45)}
      </text>

      <line x1="300" y1="840" x2="540" y2="840" stroke="#374151" strokeWidth="2" />
      <text x="420" y="875" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="500" fill="#E5E7EB">{instructor}</text>
      <text x="420" y="900" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#6B7280" letterSpacing="1">SIGNATURE</text>

      <line x1="900" y1="840" x2="1140" y2="840" stroke="#374151" strokeWidth="2" />
      <text x="1020" y="875" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="500" fill="#E5E7EB">{date}</text>
      <text x="1020" y="900" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#6B7280" letterSpacing="1">DATE</text>

      <text x="720" y="950" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#4B5563">
        ID/{certId}
      </text>
    </g>
  );
};
