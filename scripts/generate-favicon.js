const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create high-res SVG for Dura Flex brand favicon
// Theme: Modern, premium mattress & sleep brand
// Squircle with rich indigo gradient, layered ergonomic mattress contour curve forming a sleek "D"
const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1"/>
      <stop offset="50%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#3730A3"/>
    </linearGradient>
    <linearGradient id="foamTop" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#E0E7FF"/>
    </linearGradient>
    <linearGradient id="foamMid" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A5B4FC"/>
      <stop offset="100%" stop-color="#818CF8"/>
    </linearGradient>
    <linearGradient id="foamAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#1E1B4B" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Squircle Base -->
  <rect x="24" y="24" width="464" height="464" rx="116" fill="url(#bgGrad)"/>
  
  <!-- Subtle inner border for premium bezel feel -->
  <rect x="24" y="24" width="464" height="464" rx="116" fill="none" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="4"/>

  <!-- Brand Emblem: "D" formed by sleek contoured mattress comfort layers -->
  <g filter="url(#shadow)">
    <!-- Layer 1: Top quilted plush surface (pure white with soft curve) -->
    <path d="M140 148 C140 132 154 120 172 120 L270 120 C345 120 392 165 392 236 C392 278 372 312 338 332 C330 336 320 332 318 322 C315 308 308 280 270 280 L204 280 C194 280 186 272 186 262 L186 166 C186 156 178 148 168 148 L140 148 Z" 
          fill="url(#foamTop)"/>

    <!-- Layer 2: Memory foam contour / Flex wave (sky blue cooling gel accent) -->
    <path d="M140 215 C140 205 148 198 158 198 L240 198 C280 198 310 216 318 250 C320 260 312 268 302 268 L158 268 C148 268 140 260 140 250 Z" 
          fill="url(#foamAccent)"/>

    <!-- Layer 3: Orthopedic support base layer (periwinkle indigo) -->
    <path d="M140 285 C140 275 148 268 158 268 L275 268 C318 268 350 290 358 330 C368 376 335 408 275 408 L172 408 C154 408 140 396 140 380 Z" 
          fill="url(#foamMid)"/>

    <!-- Sparkle / Sleep Star in top right -->
    <path d="M375 110 Q375 130 395 130 Q375 130 375 150 Q375 130 355 130 Q375 130 375 110 Z" 
          fill="#FDE047"/>
  </g>
</svg>`;

async function run() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'app');

  // 1. Write SVG icons
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgFavicon, 'utf8');
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgFavicon, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon, 'utf8');
  console.log('Written icon.svg to public and app');

  // 2. Render PNGs using Sharp
  const svgBuffer = Buffer.from(svgFavicon);

  // 180x180 for Apple touch icon
  const appleIcon = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);
  console.log('Generated apple-touch-icon.png');

  // 192x192 and 512x512 for web app manifest
  const pwa192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), pwa192);

  const pwa512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), pwa512);

  // 32x32 and 16x16 PNGs
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);

  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);

  // 3. Create ICO file containing 16x16 and 32x32 PNG entries
  // Standard multi-image Windows ICO format containing PNG data
  function createIco(images) {
    const numImages = images.length;
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // 1 = ICO
    header.writeUInt16LE(numImages, 4);

    const dirEntrySize = 16;
    let offset = 6 + (numImages * dirEntrySize);
    const dirEntries = [];

    for (const img of images) {
      const entry = Buffer.alloc(dirEntrySize);
      entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
      entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
      entry.writeUInt8(0, 2); // color palette (0 = no palette)
      entry.writeUInt8(0, 3); // reserved
      entry.writeUInt16LE(1, 4); // color planes
      entry.writeUInt16LE(32, 6); // bits per pixel
      entry.writeUInt32LE(img.buffer.length, 8); // size of image data
      entry.writeUInt32LE(offset, 12); // offset of image data
      dirEntries.push(entry);
      offset += img.buffer.length;
    }

    return Buffer.concat([header, ...dirEntries, ...images.map(img => img.buffer)]);
  }

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 }
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('Successfully written favicon.ico to public and app dirs!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
