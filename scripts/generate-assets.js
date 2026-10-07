const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const catDir = path.join(__dirname, '..', 'public', 'images', 'categories');
const prodDir = path.join(__dirname, '..', 'public', 'images', 'products');
fs.mkdirSync(catDir, { recursive: true });
fs.mkdirSync(prodDir, { recursive: true });

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createSvg(title, subtitle, color1, color2) {
  const safeTitle = escapeXml(title);
  const safeSub = escapeXml(subtitle);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}"/>
        <stop offset="100%" stop-color="${color2}"/>
      </linearGradient>
      <linearGradient id="mattress" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#E2E8F0"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="15" stdDeviation="20" flood-color="#000000" flood-opacity="0.12"/>
      </filter>
    </defs>
    <rect width="800" height="600" fill="url(#bg)" rx="24"/>
    
    <!-- Mattress base 3D isometric representation -->
    <g transform="translate(400, 290)" filter="url(#shadow)">
      <!-- Base Layer -->
      <path d="M -260 0 L 0 110 L 260 0 L 0 -110 Z" fill="#1E293B" opacity="0.9"/>
      <path d="M -260 0 L 0 110 L 0 145 L -260 35 Z" fill="#0F172A"/>
      <path d="M 0 110 L 260 0 L 260 35 L 0 145 Z" fill="#334155"/>
      
      <!-- Foam Middle Layer -->
      <g transform="translate(0, -30)">
        <path d="M -255 0 L 0 108 L 255 0 L 0 -108 Z" fill="#5B65DC" opacity="0.9"/>
        <path d="M -255 0 L 0 108 L 0 135 L -255 27 Z" fill="#4A54CC"/>
        <path d="M 0 108 L 255 0 L 255 27 L 0 135 Z" fill="#7B83E8"/>
      </g>
      
      <!-- Top Quilted Comfort Layer -->
      <g transform="translate(0, -70)">
        <path d="M -250 0 L 0 105 L 250 0 L 0 -105 Z" fill="url(#mattress)" stroke="#CBD5E1" stroke-width="2"/>
        <path d="M -250 0 L 0 105 L 0 130 L -250 25 Z" fill="#E2E8F0"/>
        <path d="M 0 105 L 250 0 L 250 25 L 0 130 Z" fill="#F8FAFC"/>
        <!-- Quilted diamond pattern lines -->
        <path d="M -150 -40 L 50 45 M -50 -80 L 150 5 M 0 -105 L 200 -20 M -200 20 L 0 105 M -100 60 L 100 -25" stroke="#94A3B8" stroke-width="1.5" opacity="0.6"/>
      </g>
    </g>
    
    <!-- Dura Flex Badge -->
    <rect x="50" y="45" width="130" height="34" rx="17" fill="#FFFFFF" opacity="0.95"/>
    <text x="115" y="67" font-family="system-ui, sans-serif" font-weight="800" font-size="13" fill="#141B4D" text-anchor="middle">DURA FLEX</text>
    
    <!-- Title Text -->
    <text x="400" y="500" font-family="system-ui, sans-serif" font-weight="800" font-size="26" fill="#141B4D" text-anchor="middle">${safeTitle}</text>
    <text x="400" y="535" font-family="system-ui, sans-serif" font-weight="500" font-size="15" fill="#64748B" text-anchor="middle">${safeSub}</text>
  </svg>`;
}

async function renderJpeg(svgString, destPath) {
  await sharp(Buffer.from(svgString))
    .jpeg({ quality: 90 })
    .toFile(destPath);
}

const cats = [
  { name: 'ortho.jpg', title: 'Dura Ortho Series', sub: 'Medical Spinal Alignment & Zero Sag', c1: '#F1F5F9', c2: '#E2E8F0' },
  { name: 'cooling.jpg', title: 'Cooling Gel Memory Foam', sub: 'Cryo-Gel Heat Dispersal Technology', c1: '#F0F9FF', c2: '#E0F2FE' },
  { name: 'cloud.jpg', title: 'Dura Cloud Pillow-Top', sub: 'Hotel Luxury Plush Cushioning', c1: '#FAF5FF', c2: '#F3E8FF' },
  { name: 'memory.jpg', title: 'Zero Motion Memory Foam', sub: 'Undisturbed Deep REM Sleep', c1: '#F5F3FF', c2: '#EDE9FE' },
  { name: 'pillows.jpg', title: 'Ergonomic Sleep Pillows', sub: 'Cervical Contour Neck Support', c1: '#ECFDF5', c2: '#D1FAE5' },
  { name: 'mom-baby.jpg', title: 'Dura Mom & Baby Care', sub: 'Safe Maternal & Organic Crib Sleep', c1: '#FFF1F2', c2: '#FFE4E6' },
];

const prods = [
  'dura-foam-classic',
  'dura-foam-plus',
  'dura-ortho-pro',
  'dura-ortho-medical',
  'dura-cool-gel-pro',
  'dura-cool-gel-deluxe',
  'dura-cloud-plush',
  'dura-cloud-luxury',
  'memory-foam-contour',
  'memory-foam-hybrid',
  'ortho-cervical-pillow',
  'cool-gel-pillow',
  'waterproof-protector',
  'dura-mom-pillow',
  'dura-baby-crib',
];

async function run() {
  for (const c of cats) {
    await renderJpeg(createSvg(c.title, c.sub, c.c1, c.c2), path.join(catDir, c.name));
  }

  await renderJpeg(
    createSvg('Dura Flex Premium Mattress', 'Engineered for Pain-Free Sleep', '#F8FAFC', '#EEF2F6'),
    path.join(__dirname, '..', 'public', 'images', 'placeholder-product.jpg')
  );

  for (const p of prods) {
    const pretty = p.replace(/-/g, ' ').toUpperCase();
    await renderJpeg(
      createSvg(pretty, '100-Night Trial • 10-Year Sag Warranty', '#F8FAFC', '#EEF2F6'),
      path.join(prodDir, p + '-1.jpg')
    );
    await renderJpeg(
      createSvg(pretty, 'Anatomical Foam Layers & Breathable Cover', '#F8FAFC', '#EEF2F6'),
      path.join(prodDir, p + '-2.jpg')
    );
    await renderJpeg(
      createSvg(pretty, 'Dura Flex Sleep Science Pakistan', '#F8FAFC', '#EEF2F6'),
      path.join(prodDir, p + '.jpg')
    );
  }

  console.log('Successfully generated all REAL JPEG mattress images!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
