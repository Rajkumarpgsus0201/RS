/**
 * Utility to generate a high-resolution, downloadable composite PNG mockup
 * of the customer's customized apparel (Half-Hand, Full-Hand, Hoodie)
 * including their placed artwork, custom text, selected color, and studio specs.
 */

export async function generateMockupImage({
  apparelType = 'halfhand',
  tshirtColor = { name: 'Onyx Black', hex: '#141416' },
  view = 'front',
  graphicImage = null,
  graphicPos = { x: 0, y: 0 },
  graphicScale = 1,
  graphicRotation = 0,
  customText = '',
  textFont = 'display',
  textColor = '#FFFFFF',
  textSize = 20
}) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1100;
    const ctx = canvas.getContext('2d');

    // 1. Studio Background with Luxury Dark Gradient
    const bgGrad = ctx.createRadialGradient(450, 550, 100, 450, 550, 650);
    bgGrad.addColorStop(0, '#1c1d22');
    bgGrad.addColorStop(1, '#0e0f12');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Studio Grid / Accents
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 45) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 45) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // 2. Header Studio Watermark & Specs
    ctx.fillStyle = '#016935';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('RADNUZ STUDIO // 1-OF-1 BESPOKE ATELIER SPECIFICATION', 50, 50);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const apparelTitle = apparelType === 'hoodie' 
      ? 'CUSTOM STREETWEAR HOODIE (380 GSM)'
      : apparelType === 'fullhand'
      ? 'CUSTOM FULL-HAND TEE (260 GSM)'
      : 'CUSTOM HALF-HAND TEE (240 GSM)';
    ctx.fillText(apparelTitle, 50, 80);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '12px monospace';
    ctx.fillText(`COLOR: ${tshirtColor.name.toUpperCase()}  |  VIEW: ${view.toUpperCase()}  |  PRINT: DTG 1200 DPI`, 50, 104);

    // 3. Garment Scaling & Placement Coordinates
    ctx.save();
    // Offset and scale garment center to fit beautifully on canvas
    ctx.translate(130, 150);
    const scale = 1.35;
    ctx.scale(scale, scale);

    // Shadow below garment
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 25;

    // A. Draw Garment Body Silhouette
    ctx.fillStyle = tshirtColor.hex;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.lineWidth = 2;

    if (apparelType === 'halfhand') {
      // Half-Hand Body
      ctx.beginPath();
      ctx.moveTo(160, 30);
      ctx.quadraticCurveTo(250, 55, 340, 30);
      ctx.lineTo(470, 120);
      ctx.lineTo(415, 190);
      ctx.lineTo(365, 160);
      ctx.lineTo(360, 520);
      ctx.quadraticCurveTo(250, 535, 140, 520);
      ctx.lineTo(135, 160);
      ctx.lineTo(85, 190);
      ctx.lineTo(30, 120);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Reset shadow for details
      ctx.shadowColor = 'transparent';

      // Collar
      ctx.beginPath();
      if (view === 'front') {
        ctx.moveTo(160, 30);
        ctx.quadraticCurveTo(250, 85, 340, 30);
        ctx.quadraticCurveTo(250, 65, 160, 30);
      } else {
        ctx.moveTo(160, 30);
        ctx.quadraticCurveTo(250, 45, 340, 30);
        ctx.quadraticCurveTo(250, 35, 160, 30);
      }
      ctx.fillStyle = tshirtColor.hex;
      ctx.fill();
      ctx.stroke();

      // Shoulder Seams
      ctx.strokeStyle = 'rgba(0,0,0,0.25)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(160, 30);
      ctx.lineTo(135, 160);
      ctx.moveTo(340, 30);
      ctx.lineTo(365, 160);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (apparelType === 'fullhand') {
      // Full-Hand Body (Long Sleeves)
      ctx.beginPath();
      ctx.moveTo(160, 30);
      ctx.quadraticCurveTo(250, 55, 340, 30);
      ctx.lineTo(470, 120);
      ctx.lineTo(435, 390);
      ctx.lineTo(390, 385);
      ctx.lineTo(365, 160);
      ctx.lineTo(360, 520);
      ctx.quadraticCurveTo(250, 535, 140, 520);
      ctx.lineTo(135, 160);
      ctx.lineTo(110, 385);
      ctx.lineTo(65, 390);
      ctx.lineTo(30, 120);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.shadowColor = 'transparent';

      // Collar
      ctx.beginPath();
      if (view === 'front') {
        ctx.moveTo(160, 30);
        ctx.quadraticCurveTo(250, 85, 340, 30);
        ctx.quadraticCurveTo(250, 65, 160, 30);
      } else {
        ctx.moveTo(160, 30);
        ctx.quadraticCurveTo(250, 45, 340, 30);
        ctx.quadraticCurveTo(250, 35, 160, 30);
      }
      ctx.fillStyle = tshirtColor.hex;
      ctx.fill();
      ctx.stroke();

      // Wrist Cuffs
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(390, 375, 45, 15);
      ctx.fillRect(65, 375, 45, 15);
    } else {
      // Hoodie Body with Kangaroo Pocket and Hood
      ctx.beginPath();
      ctx.moveTo(155, 45);
      ctx.quadraticCurveTo(250, 65, 345, 45);
      ctx.lineTo(475, 125);
      ctx.lineTo(435, 395);
      ctx.lineTo(385, 390);
      ctx.lineTo(365, 160);
      ctx.lineTo(360, 525);
      ctx.quadraticCurveTo(250, 540, 140, 525);
      ctx.lineTo(135, 160);
      ctx.lineTo(115, 390);
      ctx.lineTo(65, 395);
      ctx.lineTo(25, 125);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.shadowColor = 'transparent';

      // Hood Outline around neck
      ctx.beginPath();
      ctx.moveTo(145, 50);
      ctx.quadraticCurveTo(250, -15, 355, 50);
      ctx.quadraticCurveTo(250, 15, 145, 50);
      ctx.fillStyle = tshirtColor.hex;
      ctx.fill();
      ctx.stroke();

      // Kangaroo Pocket (Front View)
      if (view === 'front') {
        ctx.beginPath();
        ctx.moveTo(180, 390);
        ctx.lineTo(320, 390);
        ctx.lineTo(345, 495);
        ctx.lineTo(155, 495);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fill();
        ctx.stroke();
      }

      // Wrist Cuffs & Waistband
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(385, 380, 50, 15);
      ctx.fillRect(65, 380, 50, 15);
      ctx.fillRect(140, 505, 220, 20);
    }

    // Fabric Highlight Overlay
    const fabricHL = ctx.createLinearGradient(0, 0, 500, 560);
    fabricHL.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
    fabricHL.addColorStop(0.5, 'rgba(0, 0, 0, 0.0)');
    fabricHL.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
    ctx.fillStyle = fabricHL;
    ctx.fill();

    // 4. Print Zone & Customer Artwork
    const printCenterX = 250 + (graphicPos.x * 1.1);
    const printCenterY = (apparelType === 'hoodie' && view === 'front' ? 240 : 250) + (graphicPos.y * 1.1);

    const finishCanvas = () => {
      ctx.restore(); // Restore scale & translate

      // 5. Bottom Stamp & Instructions
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(50, canvas.height - 110, canvas.width - 100, 1);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('⚡ OFFICIAL WHATSAPP ATELIER ORDER SPECIFICATION', 50, canvas.height - 75);

      ctx.fillStyle = '#9CA3AF';
      ctx.font = '11px monospace';
      ctx.fillText('Attach this image when WhatsApp opens to confirm print alignment & sizing.', 50, canvas.height - 55);

      ctx.fillStyle = '#016935';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('✓ RADNUZ VERIFIED 1-OF-1 ATELIER PROTOTYPE', canvas.width - 360, canvas.height - 65);

      // Export to Data URL and Blob
      canvas.toBlob((blob) => {
        const dataUrl = canvas.toDataURL('image/png');
        resolve({ blob, dataUrl });
      }, 'image/png');
    };

    // Draw Custom Slogan / Text
    const renderText = () => {
      if (customText && customText.trim()) {
        ctx.save();
        ctx.translate(printCenterX, printCenterY + (graphicImage ? 110 : 0));
        ctx.rotate((graphicRotation * Math.PI) / 180);
        ctx.scale(graphicScale, graphicScale);

        ctx.fillStyle = textColor;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 2;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        let fontName = 'sans-serif';
        if (textFont === 'display') fontName = 'Impact, sans-serif';
        if (textFont === 'gothic') fontName = 'Georgia, serif';
        if (textFont === 'mono') fontName = 'Courier New, monospace';
        if (textFont === 'script') fontName = 'Brush Script MT, cursive';

        ctx.font = `900 ${Math.max(16, textSize * 1.3)}px ${fontName}`;
        ctx.fillText(customText, 0, 0);
        ctx.restore();
      }
    };

    // Draw Graphic if present
    if (graphicImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();
        ctx.translate(printCenterX, printCenterY);
        ctx.rotate((graphicRotation * Math.PI) / 180);
        ctx.scale(graphicScale, graphicScale);

        const imgWidth = 180;
        const aspect = img.height / img.width;
        const imgHeight = imgWidth * aspect;

        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 10;
        ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
        ctx.restore();

        renderText();
        finishCanvas();
      };
      img.onerror = () => {
        renderText();
        finishCanvas();
      };
      img.src = graphicImage;
    } else {
      renderText();
      finishCanvas();
    }
  });
}

/**
 * Downloads the mockup image file to the customer's phone / PC
 */
export function downloadMockupFile(blob, filename = 'RADNUZ-Custom-Mockup.png') {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Copies the mockup image to clipboard if supported
 */
export async function copyMockupToClipboard(blob) {
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard write not supported or failed:', err);
  }
  return false;
}

/**
 * Native Mobile Share (Web Share API Level 2)
 * When customer taps this on mobile, WhatsApp receives BOTH the image and text!
 */
export async function shareMockupDirectly({ blob, text, title = 'RADNUZ Custom Order' }) {
  try {
    const file = new File([blob], 'RADNUZ-Custom-Mockup.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title,
        text
      });
      return true;
    }
  } catch (err) {
    // User cancelled or share error
    if (err.name !== 'AbortError') {
      console.warn('Native share failed:', err);
    }
  }
  return false;
}
