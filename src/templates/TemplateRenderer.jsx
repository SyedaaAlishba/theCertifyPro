import React from 'react';
import { T01, T02, T03, T04 } from './CorporateTemplates';
import { T05, T06, T07, T08 } from './AcademicTemplates';
import { T09, T10, T11, T12 } from './CreativeTemplates';
import { T13, T14, T15 } from './MinimalTemplates';
import { T16, T17, T18, T19, T20 } from './PremiumTemplates';

export const CERT_THEMES = [
  // Corporate
  { name: "Executive Noir", cat: "Corporate", medal: "🏅", plan: "free", themeMode: 'dark' },
  { name: "Global Standard", cat: "Corporate", medal: "🌎", plan: "free", themeMode: 'light' },
  { name: "Enterprise Edge", cat: "Corporate", medal: "⚡", plan: "pro", themeMode: 'dark' },
  { name: "Business Elite", cat: "Corporate", medal: "👔", plan: "pro", themeMode: 'light' },

  // Academic
  { name: "University Classic", cat: "Academic", medal: "🎓", plan: "free", themeMode: 'light' },
  { name: "Oxford Heritage", cat: "Academic", medal: "🏛️", plan: "free", themeMode: 'light' },
  { name: "Modern Scholar", cat: "Academic", medal: "📚", plan: "pro", themeMode: 'light' },
  { name: "Research Fellow", cat: "Academic", medal: "🔬", plan: "pro", themeMode: 'light' },

  // Creative / Award
  { name: "Abstract Vision", cat: "Creative", medal: "🎨", plan: "free", themeMode: 'light' },
  { name: "Vibrant Horizon", cat: "Creative", medal: "🌅", plan: "pro", themeMode: 'dark' },
  { name: "Geometric Pop", cat: "Creative", medal: "💠", plan: "pro", themeMode: 'light' },
  { name: "Organic Flow", cat: "Creative", medal: "🌿", plan: "pro", themeMode: 'light' },

  // Minimal / Luxury
  { name: "Pure Minimal", cat: "Minimal", medal: "✨", plan: "free", themeMode: 'light' },
  { name: "Dark Velvet", cat: "Luxury", medal: "💎", plan: "pro", themeMode: 'dark', isPortrait: true },
  { name: "Gilded Obsidian", cat: "Luxury", medal: "⚜️", plan: "pro", themeMode: 'dark', isPortrait: true },

  // Premium
  { name: "Classic Elegant", cat: "Premium", medal: "📜", plan: "pro", themeMode: 'light' },
  { name: "Modern Minimal", cat: "Premium", medal: "⬜", plan: "pro", themeMode: 'light' },
  { name: "Luxury Bold", cat: "Premium", medal: "🏆", plan: "pro", themeMode: 'dark' },
  { name: "Academic Formal", cat: "Premium", medal: "🏛️", plan: "pro", themeMode: 'light' },
  { name: "Creative Premium", cat: "Premium", medal: "✨", plan: "pro", themeMode: 'dark' },

  { name: "User Custom", cat: "Personal", medal: "🖼️", plan: "pro", isCustom: true, themeMode: 'dark' }
];

const TEMPLATES = [
  T01, T02, T03, T04,
  T05, T06, T07, T08,
  T09, T10, T11, T12,
  T13, T14, T15,
  T16, T17, T18, T19, T20
];

export const TemplateRenderer = ({ themeIdx = 0, data = {}, customTemplateUrl = null, themeMode = 'dark', logoPosition = 'top-left', logoSize = 'medium' }) => {
  const theme = CERT_THEMES[themeIdx % CERT_THEMES.length];

  const Component = theme?.isCustom ? CustomTemplate : TEMPLATES[themeIdx % TEMPLATES.length];
  if (!Component) return null;

  const isPortrait = Component.isPortrait || false;
  const vB = isPortrait ? "0 0 1020 1440" : "0 0 1440 1020";
  const wX = isPortrait ? 510 : 720;
  const wY = isPortrait ? 720 : 530;
  const fs = isPortrait ? "140" : "110";

  // All templates share the same root viewport resolution to ensure 
  // PDF cropping bug is resolved globally.
  const W = isPortrait ? 1020 : 1440;
  const H = isPortrait ? 1440 : 1020;
  const PAD = 60;
  const sizeMap = { small: 0.10, medium: 0.15, large: 0.20 };
  const logoW = Math.round(W * (sizeMap[logoSize] || 0.15));
  const logoH = logoW;
  const posMap = {
    'top-left': { x: PAD, y: PAD },
    'top-center': { x: (W - logoW) / 2, y: PAD },
    'top-right': { x: W - PAD - logoW, y: PAD },
  };
  const logoPos = posMap[logoPosition] || posMap['top-left'];

  return (
    <svg width="100%" height="100%" viewBox={vB} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/*
          Dark-background → WHITE signature
          Pipeline:
            1. luminanceToAlpha: dark ink pixels → low alpha (white bg → high alpha)
            2. Invert alpha: dark ink → HIGH alpha, white bg → LOW alpha
            3. Multiply by SourceAlpha: ensures transparent PNG areas stay transparent
            4. Flood white and cut to this combined mask
        */}
        <filter id="sig-make-light" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feColorMatrix type="luminanceToAlpha" result="lta" />
          <feComponentTransfer in="lta" result="invertedLuma">
            <feFuncA type="linear" slope="-1" intercept="1" />
          </feComponentTransfer>
          <feComposite in="invertedLuma" in2="SourceAlpha" operator="in" result="strokeMask" />
          <feFlood floodColor="#FFFFFF" floodOpacity="1" result="whiteFlood" />
          <feComposite in="whiteFlood" in2="strokeMask" operator="in" />
        </filter>
        {/*
          Light-background → BLACK signature
          Pipeline: same as above but flood black.
        */}
        <filter id="sig-make-dark" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feColorMatrix type="luminanceToAlpha" result="lta" />
          <feComponentTransfer in="lta" result="invertedLuma">
            <feFuncA type="linear" slope="-1" intercept="1" />
          </feComponentTransfer>
          <feComposite in="invertedLuma" in2="SourceAlpha" operator="in" result="strokeMask" />
          <feFlood floodColor="#000000" floodOpacity="1" result="blackFlood" />
          <feComposite in="whiteFlood" in2="strokeMask" operator="in" />
        </filter>
      </defs>

      <Component
        data={theme?.isCustom ? data : { ...data, logoUrl: '' }}
        customTemplateUrl={customTemplateUrl}
        themeMode={themeMode}
        logoPosition={logoPosition}
        logoSize={logoSize}
      />

      {/* Controlled logo overlay — pre-built templates only */}
      {!theme?.isCustom && data.logoUrl && (
        <image
          href={data.logoUrl}
          x={logoPos.x} y={logoPos.y}
          width={logoW} height={logoH}
          preserveAspectRatio="xMidYMid meet"
        />
      )}
    </svg>
  );
};


const CustomTemplate = ({ data, customTemplateUrl, themeMode, logoPosition = 'top-left', logoSize = 'medium' }) => {
  const isLight = themeMode === 'light';

  const c = {
    org: isLight ? '#555555' : '#AAAAAA',
    sub: isLight ? '#888888' : '#666666',
    label: isLight ? '#999999' : '#777777',
    name: isLight ? '#0D0D0D' : '#BF9442',
    course: isLight ? '#1A1A1A' : '#EFEFEF',
    meta: isLight ? '#222222' : '#CCCCCC',
    id: isLight ? '#AAAAAA' : '#555555',
    line: isLight ? '#CCCCCC' : '#333333',
  };

  const serif = 'Georgia, serif';

  return (
    <g>
      {/* Signature — positioned just above the instructor field line with a professional gap */}

      {/* Certificate background */}
      {customTemplateUrl ? (
        <image href={customTemplateUrl} width="1440" height="1020" preserveAspectRatio="xMidYMid slice" />
      ) : (
        <rect width="1440" height="1020" fill="#0A0B10" />
      )}

      {/* Logo — preset position + percentage-based size */}
      {data.logoUrl && (() => {
        const W = 1440; const PAD = 60;
        const sizeMap = { small: 0.10, medium: 0.15, large: 0.20 };
        const logoW = Math.round(W * (sizeMap[logoSize] || 0.15));
        const logoH = logoW; // square aspect by default, SVG preserveAspectRatio does the rest
        const posMap = {
          'top-left': { x: PAD, y: PAD },
          'top-center': { x: (W - logoW) / 2, y: PAD },
          'top-right': { x: W - PAD - logoW, y: PAD },
        };
        const { x, y } = posMap[logoPosition] || posMap['top-left'];
        return (
          <image
            href={data.logoUrl}
            x={x} y={y}
            width={logoW} height={logoH}
            preserveAspectRatio="xMidYMid meet"
          />
        );
      })()}

      {/* Organization */}
      {data.organization && (
        <text x="50%" y="17%" textAnchor="middle" fill={c.org}
          fontSize="24" fontFamily="Outfit, sans-serif" fontWeight={600}
          letterSpacing="3" style={{ userSelect: 'none' }}>
          {data.organization.toUpperCase()}
        </text>
      )}

      {/* Top divider */}
      <line x1="560" y1="190" x2="880" y2="190" stroke={c.line} strokeWidth="1" opacity="0.7" />

      {/* Contextual phrase */}
      <text x="50%" y="30%" textAnchor="middle" fill={c.label}
        fontSize="22" fontFamily={serif} fontStyle="italic"
        style={{ userSelect: 'none' }}>
        This is to certify that
      </text>

      {/* Recipient Name */}
      {data.recipientName && (
        <text x="50%" y="43%" textAnchor="middle" fill={c.name}
          fontSize="74" fontFamily="Playfair Display, serif" fontWeight={800}
          style={{ userSelect: 'none' }}>
          {data.recipientName}
        </text>
      )}

      {/* Connecting phrase */}
      <text x="50%" y="52%" textAnchor="middle" fill={c.label}
        fontSize="19" fontFamily={serif} fontStyle="italic"
        style={{ userSelect: 'none' }}>
        has successfully completed
      </text>

      {/* Course Title */}
      {data.courseTitle && (
        <text x="50%" y="62%" textAnchor="middle" fill={c.course}
          fontSize="34" fontFamily="Inter, sans-serif" fontWeight={500}
          style={{ userSelect: 'none' }}>
          {data.courseTitle}
        </text>
      )}

      {/* Recognition phrase */}
      <text x="50%" y="71%" textAnchor="middle" fill={c.label}
        fontSize="16" fontFamily={serif} fontStyle="italic"
        style={{ userSelect: 'none' }}>
        in recognition of outstanding dedication and achievement
      </text>

      {/* Signature — positioned just above the instructor field line with a professional gap */}
      {data.sigUrl && (
        <image
          href={data.sigUrl}
          x="1033" y="755"
          width="180" height="56"
          preserveAspectRatio="xMidYMid meet"
          opacity="0.92"
          filter={`url(#${isLight ? 'sig-make-dark' : 'sig-make-light'})`}
        />
      )}

      {/* Bottom divider/Signature Line */}
      <line x1="430" y1="825" x2="1010" y2="825" stroke={c.line} strokeWidth="1.2" opacity="0.4" />

      {/* Date (left column) */}
      {data.date && (
        <text x="22%" y="87%" textAnchor="middle" fill={c.meta}
          fontSize="18" fontFamily="Inter, sans-serif" fontWeight={400}
          style={{ userSelect: 'none' }}>
          {data.date}
        </text>
      )}
      {data.date && (
        <text x="22%" y="91.5%" textAnchor="middle" fill={c.sub}
          fontSize="12" fontFamily="Inter, sans-serif" letterSpacing="1.5"
          style={{ userSelect: 'none' }}>
          DATE ISSUED
        </text>
      )}

      {/* Instructor (right column) */}
      {data.instructor && (
        <text x="78%" y="87%" textAnchor="middle" fill={c.meta}
          fontSize="18" fontFamily="Inter, sans-serif" fontWeight={600}
          style={{ userSelect: 'none' }}>
          {data.instructor}
        </text>
      )}
      {data.instructor && (
        <text x="78%" y="91.5%" textAnchor="middle" fill={c.sub}
          fontSize="12" fontFamily="Inter, sans-serif" letterSpacing="1.5"
          style={{ userSelect: 'none' }}>
          AUTHORIZED BY
        </text>
      )}

      {/* Cert ID */}
      {data.certId && (
        <text x="50%" y="94.5%" textAnchor="middle" fill={c.id}
          fontSize="12" fontFamily="monospace"
          style={{ userSelect: 'none' }}>
          Certificate ID: {data.certId}
        </text>
      )}
    </g>
  );
};

