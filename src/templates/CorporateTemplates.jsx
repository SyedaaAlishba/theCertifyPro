import React from 'react';
import { trunc } from '../utils/helpers';

// Shared Helper for Logo/Signature across templates to fix the "not rendering" bug
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

// T01: Executive Noir (Dark, elegant, symmetric, gold accent)
export const T01 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#09111F" />
      <rect x="30" y="30" width="1380" height="960" fill="none" stroke="#C8A96B" strokeWidth="4" opacity="0.4" />
      <rect x="42" y="42" width="1356" height="936" fill="none" stroke="#C8A96B" strokeWidth="1" opacity="0.2" />
      
      <circle cx="720" cy="510" r="400" fill="url(#t01-glow)" />
      
      <defs>
        <radialGradient id="t01-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A96B" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#C8A96B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path d="M 0 0 L 120 0 L 0 120 Z" fill="#C8A96B" />
      <path d="M 1440 0 L 1320 0 L 1440 120 Z" fill="#C8A96B" />
      <path d="M 0 1020 L 120 1020 L 0 900 Z" fill="#C8A96B" />
      <path d="M 1440 1020 L 1320 1020 L 1440 900 Z" fill="#C8A96B" />

      <AuthAssets data={data} xLogo={720} yLogo={90} xSig={420} ySig={755} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 180 : 130} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="22" fill="#C8A96B" letterSpacing="6">
        {(organization || "ACADEMY").toUpperCase()}
      </text>

      <text x="720" y="320" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="64" fontWeight="700" fill="#F0EBE0">
        Certificate of Excellence
      </text>

      <text x="720" y="400" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fill="#C8A96B" opacity="0.6" letterSpacing="3">
        PROUDLY PRESENTED TO
      </text>

      <text x="720" y="520" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="88" fontWeight="800" fill="#E8D5A0" fontStyle="italic">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="600" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#8A8799" letterSpacing="1">
        for successfully completing the rigorous requirements of
      </text>

      <text x="720" y="680" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="42" fontWeight="600" fill="#C8A96B">
        {trunc(courseTitle, 45)}
      </text>

      <line x1="320" y1="840" x2="520" y2="840" stroke="#C8A96B" strokeWidth="1" opacity="0.4" />
      <text x="420" y="870" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#8A8799">{instructor}</text>
      <text x="420" y="895" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#C8A96B" opacity="0.5" letterSpacing="2">INSTRUCTOR</text>

      <line x1="920" y1="840" x2="1120" y2="840" stroke="#C8A96B" strokeWidth="1" opacity="0.4" />
      <text x="1020" y="870" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#8A8799">{date}</text>
      <text x="1020" y="895" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#C8A96B" opacity="0.5" letterSpacing="2">DATE ISSUED</text>

      <text x="720" y="960" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#C8A96B" opacity="0.4" letterSpacing="3">
        ID: {certId}
      </text>
    </g>
  );
};

// T02: Global Standard (White/Blue, clean corporate, horizontal divide)
export const T02 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#FFFFFF" />
      <rect width="1440" height="240" fill="#1A3B66" />
      
      <circle cx="1440" cy="0" r="300" fill="#FFFFFF" opacity="0.05" />
      <circle cx="0" cy="240" r="150" fill="#FFFFFF" opacity="0.05" />

      <AuthAssets data={data} xLogo={720} yLogo={40} xSig={420} ySig={755} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 170 : 120} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="38" fontWeight="700" fill="#FFFFFF" letterSpacing="2">
        {(organization || "GLOBAL ORG").toUpperCase()}
      </text>

      <text x="720" y="380" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="20" fill="#1A3B66" fontWeight="600" letterSpacing="4">
        CERTIFICATE OF ACHIEVEMENT
      </text>

      <text x="720" y="440" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fill="#666" letterSpacing="1">
        This is to certify that
      </text>

      <text x="720" y="560" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="80" fontWeight="700" fill="#112240">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="640" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#666" letterSpacing="1">
        has fulfilled the requirements for the completion of
      </text>

      <text x="720" y="720" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="36" fontWeight="600" fill="#1A3B66">
        {trunc(courseTitle, 45)}
      </text>

      <line x1="300" y1="840" x2="540" y2="840" stroke="#1A3B66" strokeWidth="2" />
      <text x="420" y="875" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="18" fill="#333" fontWeight="500">{instructor}</text>
      <text x="420" y="900" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#888" letterSpacing="1">AUTHORIZED SIGNATURE</text>

      <line x1="900" y1="840" x2="1140" y2="840" stroke="#1A3B66" strokeWidth="2" />
      <text x="1020" y="875" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="18" fill="#333" fontWeight="500">{date}</text>
      <text x="1020" y="900" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#888" letterSpacing="1">DATE</text>

      <text x="1400" y="980" textAnchor="end" fontFamily="monospace" fontSize="12" fill="#AAA">VERIFY: {certId}</text>
    </g>
  );
};

// T03: Enterprise Edge (Modern, Tech-focused, angled geometry)
export const T03 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#F4F6F8" />
      <polygon points="0,0 600,0 450,1020 0,1020" fill="#2563EB" />
      <polygon points="0,0 560,0 410,1020 0,1020" fill="#1E40AF" />
      
      <AuthAssets data={data} xLogo={240} yLogo={100} xSig={740} ySig={755} themeMode={themeMode} />

      <text x="200" y="240" textAnchor="middle" fill="#FFF" fontFamily="Outfit, sans-serif" fontSize="32" fontWeight="700" transform="rotate(-90 200 240)">
        {organization}
      </text>

      <text x="740" y="300" textAnchor="start" fontFamily="Outfit, sans-serif" fontSize="64" fontWeight="800" fill="#1E3A8A" letterSpacing="-1">
        CERTIFICATE
      </text>
      <text x="740" y="340" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="24" fill="#3B82F6" fontWeight="600" letterSpacing="2">
        OF PROFESSIONAL COMPLETION
      </text>
      
      <text x="740" y="440" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="16" fill="#64748B" letterSpacing="1">
        PRESENTED TO
      </text>

      <text x="740" y="520" textAnchor="start" fontFamily="Outfit, sans-serif" fontSize="60" fontWeight="700" fill="#0F172A">
        {trunc(recipientName, 30)}
      </text>

      <text x="740" y="600" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="16" fill="#64748B" letterSpacing="1">
        FOR SUCCESSFUL MASTERY OF
      </text>

      <text x="740" y="660" textAnchor="start" fontFamily="Outfit, sans-serif" fontSize="32" fontWeight="600" fill="#1E3A8A">
        {trunc(courseTitle, 40)}
      </text>

      <text x="740" y="860" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="18" fill="#0F172A" fontWeight="600">{instructor}</text>
      <text x="740" y="885" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="12" fill="#64748B">ISSUING DIRECTOR</text>
      
      <text x="1000" y="860" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="18" fill="#0F172A" fontWeight="600">{date}</text>
      <text x="1000" y="885" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="12" fill="#64748B">COMPLETION DATE</text>

      <rect x="740" y="940" width="300" height="1" fill="#CBD5E1" />
      <text x="740" y="970" textAnchor="start" fontFamily="monospace" fontSize="11" fill="#94A3B8">SECURE ID: {certId}</text>
    </g>
  );
};

// T04: Business Elite (Dark slate, off-center, red accent)
export const T04 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#181A1F" />
      <rect x="0" y="0" width="1440" height="16" fill="#DC2626" />
      <rect x="80" y="80" width="1280" height="860" fill="#1F2229" rx="20" />
      
      <AuthAssets data={data} xLogo={720} yLogo={120} xSig={720} ySig={755} themeMode={themeMode} />

      <text x="720" y={data.logoUrl ? 230 : 180} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#9CA3AF" letterSpacing="8">
        {(organization || "ELITE BUSINESS").toUpperCase()}
      </text>

      <text x="720" y="320" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="68" fontWeight="600" fill="#F3F4F6">
        Award of Excellence
      </text>

      <line x1="620" y1="380" x2="820" y2="380" stroke="#DC2626" strokeWidth="3" />

      <text x="720" y="460" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fill="#9CA3AF" letterSpacing="2">
        IS HEREBY GRANTED TO
      </text>

      <text x="720" y="560" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="56" fontWeight="700" fill="#FFFFFF">
        {trunc(recipientName, 30)}
      </text>

      <text x="720" y="660" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="24" fill="#E5E7EB" fontWeight="400">
        In recognition of outstanding performance in <tspan fontWeight="700" fill="#DC2626">{courseTitle}</tspan>
      </text>

      <rect x="520" y="840" width="400" height="1" fill="#4B5563" />
      <text x="720" y="870" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fill="#E5E7EB">{instructor}  —  {date}</text>

      <text x="1320" y="910" textAnchor="end" fontFamily="monospace" fontSize="12" fill="#4B5563">{certId}</text>
    </g>
  );
};
