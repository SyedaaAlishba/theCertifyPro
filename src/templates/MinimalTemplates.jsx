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

// T13: Pure Minimal (White, off-grid alignment, extreme minimal)
export const T13 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1440" height="1020" fill="#FFFFFF" />
      <rect x="100" y="100" width="1240" height="820" fill="none" stroke="#E5E7EB" strokeWidth="2" />
      
      <AuthAssets data={data} xLogo={160} yLogo={160} xSig={420} ySig={675} align="start" themeMode={themeMode} />

      <text x="160" y={data.logoUrl ? 260 : 180} textAnchor="start" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="600" fill="#374151" letterSpacing="4">
        {organization}
      </text>

      <text x="160" y="380" textAnchor="start" fontFamily="Outfit, sans-serif" fontSize="72" fontWeight="300" fill="#111827">
        Certificate
      </text>
      
      <text x="160" y="480" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="14" fill="#9CA3AF" letterSpacing="4">
        AWARDED TO
      </text>

      <text x="160" y="560" textAnchor="start" fontFamily="Outfit, sans-serif" fontSize="56" fontWeight="600" fill="#111827">
        {trunc(recipientName, 35)}
      </text>

      <text x="160" y="640" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="20" fill="#4B5563">
        In recognition of successfully completing <tspan fontWeight="700">{courseTitle}</tspan>
      </text>

      <text x="160" y="860" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="16" fill="#111827" fontWeight="600">{instructor}</text>
      <text x="160" y="885" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="12" fill="#9CA3AF">SIGNATURE</text>
      
      <text x="1280" y="860" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="16" fill="#111827" fontWeight="600">{date}</text>
      <text x="1280" y="885" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="12" fill="#9CA3AF">DATE</text>

      <text x="1280" y="180" textAnchor="end" fontFamily="monospace" fontSize="12" fill="#D1D5DB">{certId}</text>
    </g>
  );
};

// T14: Dark Velvet (Portrait Orientation - 1020x1440)
export const T14 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1020" height="1440" fill="#1A1C21" />
      <rect x="40" y="40" width="940" height="1360" fill="none" stroke="#D4BC82" strokeWidth="2" opacity="0.3" />
      
      <AuthAssets data={data} xLogo={510} yLogo={140} xSig={510} ySig={1050} themeMode={themeMode} />

      <text x="510" y={data.logoUrl ? 260 : 200} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="500" fill="#9CA3AF" letterSpacing="8">
        {(organization || "L'ACADEMIE").toUpperCase()}
      </text>

      <line x1="460" y1="300" x2="560" y2="300" stroke="#D4BC82" strokeWidth="2" />

      <text x="510" y="440" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="72" fontWeight="600" fill="#F3F4F6">
        Certificate
      </text>
      <text x="510" y="500" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="36" fill="#D4BC82" fontStyle="italic">
        of Completion
      </text>

      <text x="510" y="640" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#9CA3AF" letterSpacing="4">
        PROUDLY PRESENTED TO
      </text>

      <text x="510" y="760" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="64" fontWeight="700" fill="#FFFFFF">
        {trunc(recipientName, 26)}
      </text>

      <text x="510" y="860" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fill="#E5E7EB">
        For outstanding achievement in
      </text>

      <text x="510" y="930" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="38" fontWeight="600" fill="#D4BC82">
        {trunc(courseTitle, 35)}
      </text>

      <rect x="360" y="1180" width="300" height="1" fill="#4B5563" />
      <text x="510" y="1220" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fill="#E5E7EB">{instructor}</text>
      
      <text x="510" y="1280" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#D4BC82">{date}</text>

      <text x="510" y="1380" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#4B5563">{certId}</text>
    </g>
  );
};
T14.isPortrait = true;

// T15: Gilded Obsidian (Portrait Orientation - 1020x1440)
export const T15 = ({ data, themeMode }) => {
  const { recipientName, courseTitle, date, organization, instructor, certId } = data;
  return (
    <g>
      <rect width="1020" height="1440" fill="#060709" />
      
      <path d="M 0 0 L 1020 0 L 1020 120 L 510 180 L 0 120 Z" fill="#BFA46A" />

      <AuthAssets data={data} xLogo={510} yLogo={40} xSig={510} ySig={1110} themeMode={themeMode} />

      <text x="510" y={data.logoUrl ? 150 : 80} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="800" fill="#060709" letterSpacing="4">
        {(organization || "STUDIO").toUpperCase()}
      </text>

      <circle cx="510" cy="400" r="160" fill="none" stroke="#BFA46A" strokeWidth="1" opacity="0.3" />
      <circle cx="510" cy="400" r="140" fill="none" stroke="#BFA46A" strokeWidth="2" />
      <text x="510" y="420" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="64" fontWeight="800" fill="#BFA46A">
        AWARD
      </text>

      <text x="510" y="660" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#6B7280" letterSpacing="4">
        RECOGNITION OF EXCELLENCE
      </text>

      <text x="510" y="780" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="56" fontWeight="600" fill="#F3F4F6">
        {trunc(recipientName, 26)}
      </text>

      <text x="510" y="880" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="22" fill="#9CA3AF" fontStyle="italic">
        Has successfully completed
      </text>

      <text x="510" y="960" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="48" fontWeight="700" fill="#BFA46A">
        {trunc(courseTitle, 35)}
      </text>

      <line x1="410" y1="1220" x2="610" y2="1220" stroke="#BFA46A" strokeWidth="1" opacity="0.5" />
      <text x="510" y="1255" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#F3F4F6">{instructor}</text>
      <text x="510" y="1280" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#BFA46A" letterSpacing="2">INSTRUCTOR</text>
      
      <text x="510" y="1320" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fill="#6B7280">{date}</text>

      <text x="960" y="1380" textAnchor="end" fontFamily="monospace" fontSize="12" fill="#374151">{certId}</text>
    </g>
  );
};
T15.isPortrait = true;
