import React from 'react';
import { TemplateRenderer, CERT_THEMES } from '../templates/TemplateRenderer';

// Wraps the raw Template SVG in a clean, high-integrity container
export const CertPreview = ({ data, themeIdx = 0, customTemplateUrl = null, themeMode = 'dark', logoPosition = 'top-left', logoSize = 'medium' }) => {
  // Check if current active template is portrait
  const activeTheme = CERT_THEMES[themeIdx % CERT_THEMES.length];
  const isPortrait = activeTheme?.isPortrait || false;

  return (
    <div className={`cert-preview-wrapper fi ${isPortrait ? 'portrait' : ''}`}>
      <TemplateRenderer
        themeIdx={themeIdx}
        data={data}
        customTemplateUrl={customTemplateUrl}
        themeMode={themeMode}
        logoPosition={logoPosition}
        logoSize={logoSize}
      />
    </div>
  );
};
