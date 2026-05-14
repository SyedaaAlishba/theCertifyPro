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

// T05: University Classic (Parchment, rich borders, highly traditional)
export const T05 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#F4F1EA" />
      <rect x="40" y="40" width="1360" height="940" fill="none" stroke="#2C3E50" strokeWidth="12" />
      <rect x="56" y="56" width="1328" height="908" fill="none" stroke="#2C3E50" strokeWidth="2" />
      
      <AuthAssets data={data} xLogo={720} yLogo={90} xSig={420} ySig={755} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 190 : 150} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="48" fontWeight="800" fill="#2C3E50">
        {(organization || "The University").toUpperCase()}
      </text>

      <text x="720" y="300" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="76" fontStyle="italic" fill="#1A252F">
        Certificate of Completion
      </text>

      <text x="720" y="420" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#34495E" letterSpacing="4">
        BE IT KNOWN THAT
      </text>

      <text x="720" y="540" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="64" fontWeight="700" fill="#2C3E50">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="640" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#34495E">
        HAS SATISFACTORILY COMPLETED THE PRESCRIBED COURSE OF STUDY IN
      </text>

      <text x="720" y="710" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="40" fontWeight="700" fill="#2C3E50">
        {trunc(courseTitle, 40)}
      </text>

      <line x1="300" y1="840" x2="540" y2="840" stroke="#2C3E50" strokeWidth="1" />
      <text x="420" y="875" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#2C3E50">{instructor}</text>
      <text x="420" y="900" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fill="#7F8C8D" letterSpacing="1">DEAN OF FACULTY</text>

      <line x1="900" y1="840" x2="1140" y2="840" stroke="#2C3E50" strokeWidth="1" />
      <text x="1020" y="875" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#2C3E50">{date}</text>
      <text x="1020" y="900" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fill="#7F8C8D" letterSpacing="1">DATE GRANTED</text>

      <text x="720" y="950" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#95A5A6">{certId}</text>
    </g>
  );
};

// T06: Oxford Heritage (Portrait layout supported via svg rotation logically or just a split column vertical feel, but we maintain 1440x1020 landscape viewport for simplicity, and make the design heavily framed with a seal)
export const T06 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#FFFFFF" />
      <rect width="1440" height="1020" fill="#Fdfbf7" />
      
      {/* Heavy green styling */}
      <rect x="40" y="40" width="1360" height="940" fill="none" stroke="#103F2D" strokeWidth="6" />
      <rect x="52" y="52" width="1336" height="916" fill="none" stroke="#B89B5E" strokeWidth="2" />

      {/* Background Seal */}
      <circle cx="720" cy="510" r="300" fill="none" stroke="#E8E2D2" strokeWidth="40" opacity="0.4" />
      
      <AuthAssets data={data} xLogo={720} yLogo={100} xSig={720} ySig={675} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 210 : 160} textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="36" fontWeight="700" fill="#103F2D">
        {organization || "Oxford Heritage"}
      </text>

      <text x="720" y="270" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#B89B5E" letterSpacing="6">
        ACADEMIC ACHIEVEMENT
      </text>

      <line x1="600" y1="310" x2="840" y2="310" stroke="#103F2D" strokeWidth="2" />

      <text x="720" y="400" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="66" fontWeight="400" fill="#103F2D">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="480" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="20" fill="#555" fontStyle="italic">
        having demonstrated exceptional scholarship, has completed
      </text>

      <text x="720" y="560" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="42" fontWeight="700" fill="#103F2D">
        {trunc(courseTitle, 45)}
      </text>

      <rect x="520" y="800" width="400" height="1" fill="#103F2D" />
      <text x="720" y="840" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="24" fill="#103F2D">{instructor}</text>
      <text x="720" y="870" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="16" fill="#777">DIRECTOR OF STUDIES</text>
      
      <text x="720" y="910" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="18" fill="#103F2D" fontWeight="700">{date}</text>

      <text x="1360" y="955" textAnchor="end" fontFamily="monospace" fontSize="12" fill="#999">ID: {certId}</text>
    </g>
  );
};

// T07: Modern Scholar (Clean, serif + sans, left aligned structure)
export const T07 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#FFFFFF" />
      <rect x="120" y="0" width="1320" height="1020" fill="#FAFAFA" />
      <rect x="0" y="0" width="120" height="1020" fill="#4B2BA8" />
      
      <AuthAssets data={data} xLogo={200} yLogo={120} xSig={200} ySig={755} align="start" themeMode={themeMode} />

      <text x="200" y={data.logoUrl ? 240 : 160} textAnchor="start" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="700" fill="#4B2BA8" letterSpacing="2">
        {(organization || "Academy").toUpperCase()}
      </text>

      <text x="200" y="320" textAnchor="start" fontFamily="Playfair Display, serif" fontSize="72" fontWeight="800" fill="#111827">
        Certificate
      </text>
      <text x="200" y="380" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="24" fill="#6B7280" letterSpacing="1">
        OF ADVANCED STUDIES
      </text>

      <text x="200" y="520" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="16" fill="#9CA3AF" letterSpacing="2">
        PRESENTED TO
      </text>

      <text x="200" y="580" textAnchor="start" fontFamily="Playfair Display, serif" fontSize="64" fontWeight="700" fill="#4B2BA8">
        {trunc(recipientName, 30)}
      </text>

      <text x="200" y="680" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="16" fill="#9CA3AF" letterSpacing="2">
        FOR COMPLETING
      </text>
      
      <text x="200" y="730" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="32" fontWeight="600" fill="#111827">
        {trunc(courseTitle, 40)}
      </text>

      <line x1="200" y1="840" x2="440" y2="840" stroke="#111827" strokeWidth="2" />
      <text x="200" y="880" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="18" fill="#111827" fontWeight="600">{instructor}</text>
      <text x="200" y="905" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="13" fill="#6B7280">PROGRAM INSTRUCTOR</text>
      
      <line x1="600" y1="840" x2="840" y2="840" stroke="#111827" strokeWidth="2" />
      <text x="600" y="880" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="18" fill="#111827" fontWeight="600">{date}</text>
      <text x="600" y="905" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="13" fill="#6B7280">AWARD DATE</text>

      <text x="1360" y="940" textAnchor="end" fontFamily="monospace" fontSize="12" fill="#D1D5DB">{certId}</text>
    </g>
  );
};

// T08: Research Fellow (Parchment, rich, centered)
export const T08 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#FDFBF7" />
      <rect x="60" y="60" width="1320" height="900" fill="none" stroke="#D4AF37" strokeWidth="4" />
      <rect x="75" y="75" width="1290" height="870" fill="none" stroke="#2C3E50" strokeWidth="1" />
      
      <AuthAssets data={data} xLogo={720} yLogo={120} xSig={720} ySig={755} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 230 : 180} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="32" fill="#2C3E50" letterSpacing="4">
        {organization}
      </text>
      <line x1="620" y1="260" x2="820" y2="260" stroke="#D4AF37" strokeWidth="2" />

      <text x="720" y="360" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="80" fontWeight="600" fill="#111">
        Fellowship Award
      </text>

      <text x="720" y="460" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="24" fill="#555" fontStyle="italic">
        This acknowledges the distinguished efforts of
      </text>

      <text x="720" y="560" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="64" fontWeight="800" fill="#2C3E50">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="640" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="24" fill="#555" fontStyle="italic">
        in the study and mastery of
      </text>

      <text x="720" y="720" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="42" fontWeight="600" fill="#D4AF37">
        {trunc(courseTitle, 40)}
      </text>

      <line x1="520" y1="840" x2="920" y2="840" stroke="#2C3E50" strokeWidth="1" />
      <text x="720" y="875" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="24" fill="#111">{instructor} — {date}</text>

      <text x="720" y="930" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#AAA">{certId}</text>
    </g>
  );
};
