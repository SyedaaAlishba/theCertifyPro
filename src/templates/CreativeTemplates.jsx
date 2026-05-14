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

// T09: Abstract Vision (Dark gradient, colorful flowing lines, modern sans-serif)
export const T09 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <defs>
        <linearGradient id="t09-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B0C10" />
          <stop offset="100%" stopColor="#1F2833" />
        </linearGradient>
        <linearGradient id="t09-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#66FCF1" />
          <stop offset="100%" stopColor="#45A29E" />
        </linearGradient>
      </defs>
      
      <rect width="1440" height="1020" fill="url(#t09-bg)" />
      
      <circle cx="1200" cy="200" r="400" fill="url(#t09-accent)" opacity="0.1" />
      <circle cx="200" cy="800" r="500" fill="url(#t09-accent)" opacity="0.05" />

      <path d="M 0 0 Q 300 200 400 0 Z" fill="url(#t09-accent)" opacity="0.4" />
      <path d="M 1440 1020 Q 1100 800 1000 1020 Z" fill="url(#t09-accent)" opacity="0.4" />

      <AuthAssets data={data} xLogo={720} yLogo={80} xSig={420} ySig={755} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 170 : 130} textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="26" fontWeight="700" fill="#66FCF1" letterSpacing="4">
        {organization || "CREATIVE STUDIO"}
      </text>

      <text x="720" y="340" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="72" fontWeight="800" fill="#C5C6C7" letterSpacing="-2">
        Creative Excellence
      </text>

      <text x="720" y="440" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="20" fill="#45A29E" letterSpacing="5">
        THIS PORTFOLIO AWARD BELONGS TO
      </text>

      <text x="720" y="560" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="64" fontWeight="600" fill="#FFFFFF">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="660" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="20" fill="#C5C6C7" letterSpacing="3">
        AWARDED FOR EXCEPTIONAL ORIGINALITY IN
      </text>

      <text x="720" y="740" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="42" fontWeight="600" fill="#66FCF1">
        {trunc(courseTitle, 40)}
      </text>

      <rect x="320" y="840" width="200" height="2" fill="#45A29E" />
      <text x="420" y="880" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="22" fill="#C5C6C7" fontWeight="500">{instructor}</text>

      <rect x="920" y="840" width="200" height="2" fill="#45A29E" />
      <text x="1020" y="880" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="22" fill="#C5C6C7" fontWeight="500">{date}</text>

      <text x="720" y="960" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#45A29E" opacity="0.6">ID • {certId}</text>
    </g>
  );
};

// T10: Vibrant Horizon (Gradient split, white background, bright colors)
export const T10 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#FAFAFA" />
      <defs>
        <linearGradient id="t10-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      
      <rect x="0" y="0" width="1440" height="30" fill="url(#t10-grad)" />
      <circle cx="1440" cy="510" r="300" fill="url(#t10-grad)" opacity="0.08" />
      <circle cx="0" cy="1020" r="400" fill="url(#t10-grad)" opacity="0.08" />

      <AuthAssets data={data} xLogo={720} yLogo={90} xSig={720} ySig={675} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 190 : 130} textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="20" fontWeight="700" fill="#111827" letterSpacing="4">
        {organization}
      </text>

      <text x="720" y="270" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="76" fontWeight="800" fill="url(#t10-grad)">
        ACHIEVEMENT
      </text>
      
      <text x="720" y="340" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="24" fill="#6B7280" letterSpacing="2">
        PROUDLY RECOGNIZES
      </text>

      <text x="720" y="460" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="68" fontWeight="700" fill="#1F2937">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="540" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fill="#6B7280" letterSpacing="1">
        FOR THEIR AMAZING CREATIVE WORK IN
      </text>

      <text x="720" y="620" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="48" fontWeight="600" fill="#1F2937">
        {trunc(courseTitle, 40)}
      </text>

      <line x1="620" y1="800" x2="820" y2="800" stroke="#E5E7EB" strokeWidth="2" />
      
      <text x="720" y="840" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fill="#374151" fontWeight="600">{instructor}</text>
      <text x="720" y="870" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fill="#9CA3AF">SIGNATURE</text>
      
      <text x="720" y="930" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fill="#374151" fontWeight="600">{date}</text>
      
      <text x="1380" y="970" textAnchor="end" fontFamily="monospace" fontSize="12" fill="#9CA3AF">{certId}</text>
    </g>
  );
};

// T11: Geometric Pop (Yellow/Black, strict grid UI, bold typography)
export const T11 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#FFDE00" />
      <rect x="60" y="60" width="1320" height="900" fill="#FFFFFF" stroke="#000000" strokeWidth="6" />
      
      {/* Heavy grid lines */}
      <line x1="60" y1="200" x2="1380" y2="200" stroke="#000" strokeWidth="6" />
      <line x1="60" y1="800" x2="1380" y2="800" stroke="#000" strokeWidth="6" />
      <line x1="400" y1="800" x2="400" y2="960" stroke="#000" strokeWidth="6" />
      <line x1="1040" y1="800" x2="1040" y2="960" stroke="#000" strokeWidth="6" />

      <AuthAssets data={data} xLogo={720} yLogo={100} xSig={720} ySig={810} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 170 : 140} textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="40" fontWeight="800" fill="#000">
        {(organization || "DESIGN CO").toUpperCase()}
      </text>

      <text x="720" y="320" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="88" fontWeight="900" fill="#000" letterSpacing="-2">
        CERTIFIED
      </text>

      <rect x="620" y="440" width="200" height="6" fill="#000" />

      <text x="720" y="560" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="76" fontWeight="800" fill="#000">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="660" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="32" fontWeight="700" fill="#000">
        {courseTitle.toUpperCase()}
      </text>
      
      <rect x="640" y="690" width="160" height="8" fill="#FFDE00" />

      <text x="230" y="870" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="#000">INSTRUCTOR</text>
      <text x="230" y="920" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="28" fontWeight="800" fill="#000">{instructor}</text>
      
      <text x="1210" y="870" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="#000">DATE</text>
      <text x="1210" y="920" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="28" fontWeight="800" fill="#000">{date}</text>

      <text x="1210" y="140" textAnchor="middle" fontFamily="monospace" fontSize="16" fontWeight="700" fill="#000">ID/{certId}</text>
    </g>
  );
};

// T12: Organic Flow (Soft colors, organic blobs)
export const T12 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#F8FAFC" />
      
      <path d="M 0 0 C 400 0 600 400 0 800 Z" fill="#E0F2FE" />
      <path d="M 1440 1020 C 1000 1020 800 600 1440 200 Z" fill="#FEF08A" opacity="0.5" />
      
      <AuthAssets data={data} xLogo={720} yLogo={100} xSig={420} ySig={755} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 200 : 150} textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="28" fontWeight="700" fill="#0F172A" letterSpacing="2">
        {organization}
      </text>

      <text x="720" y="300" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="88" fontWeight="700" fill="#38BDF8">
        Certificate
      </text>

      <text x="720" y="440" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fill="#64748B" letterSpacing="4">
        PREPARED AND PRESENTED TO
      </text>

      <text x="720" y="560" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="64" fontWeight="600" fill="#0F172A">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="660" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fill="#64748B" letterSpacing="1">
        IN RECOGNITION OF OUTSTANDING WORK IN
      </text>

      <text x="720" y="740" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="42" fontWeight="600" fill="#0F172A">
        {trunc(courseTitle, 40)}
      </text>

      <rect x="320" y="860" width="200" height="1" fill="#94A3B8" />
      <text x="420" y="895" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="20" fill="#0F172A" fontWeight="500">{instructor}</text>
      
      <rect x="920" y="860" width="200" height="1" fill="#94A3B8" />
      <text x="1020" y="895" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="20" fill="#0F172A" fontWeight="500">{date}</text>

      <text x="720" y="970" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#94A3B8" letterSpacing="1">{certId}</text>
    </g>
  );
};
