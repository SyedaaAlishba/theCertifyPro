// We inject raw SVG string based on the active template to achieve highest quality PNG export.
export const downloadCertSVG = async (svgString, filename = "certificate", w = 1440, h = 1020) => {
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    canvas.toBlob((b) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `${filename}.png`;
      a.click();
    }, "image/png");
  };
  img.src = url;
};
