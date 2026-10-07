const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const newDir = path.join(__dirname, '..', 'public', 'images', 'new');
const catDir = path.join(__dirname, '..', 'public', 'images', 'categories');
const prodDir = path.join(__dirname, '..', 'public', 'images', 'products');

async function copyOptimized(srcFilename, destRelPath) {
  const src = path.join(newDir, srcFilename);
  if (!fs.existsSync(src)) {
    console.warn('Source file not found:', srcFilename);
    return;
  }
  const dest = path.join(__dirname, '..', 'public', destRelPath);
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await sharp(src)
    .flatten({ background: '#FFFFFF' })
    .jpeg({ quality: 90 })
    .toFile(dest);
  console.log(`Copied & optimized: ${srcFilename} -> ${destRelPath}`);
}

async function run() {
  console.log('--- STARTING IMAGE INTEGRATION FROM public/images/new ---');

  // 1. Categories
  await copyOptimized('14-ultraortho-front-978x589_d8f48ebe-6bfd-4334-b234-c9fc9de87a07.jpg', 'images/categories/ortho.jpg');
  await copyOptimized('13-Coolgel-front-978x589_792a53f5-1c07-4fb1-b29a-d36c9b80e052.jpg', 'images/categories/cooling.jpg');
  await copyOptimized('11-eternasoft-front-978x589_1600x.jpg', 'images/categories/cloud.jpg');
  await copyOptimized('Sleep_Memory_2048x2048.jpg', 'images/categories/memory.jpg');
  await copyOptimized('pillow-duckdown.jpg', 'images/categories/pillows.jpg');
  await copyOptimized('junior_700x700_6922efd9-2f3c-4e62-94c6-6bd0ea1c9ae9_2048x2048.jpg', 'images/categories/mom-baby.jpg');
  await copyOptimized('1080x1080_full_frontttt_2048x2048.jpg', 'images/placeholder-product.jpg');

  // 2. Mattresses
  // Foam Classic & Plus
  await copyOptimized('7-classique-front-978x589_1ddccfe3-7605-419c-9309-48b5a7740d64.jpg', 'images/products/dura-foam-classic-1.jpg');
  await copyOptimized('MoltyFoam_2048x2048.jpg', 'images/products/dura-foam-classic-2.jpg');
  await copyOptimized('7-classique-front-978x589_1ddccfe3-7605-419c-9309-48b5a7740d64.jpg', 'images/products/dura-foam-classic.jpg');
  await copyOptimized('3-classiqueexe-front-978x589_e9a051f3-5b12-4214-a296-469ae89be716.jpg', 'images/products/dura-foam-plus-1.jpg');
  await copyOptimized('3-classiqueexe-front-978x589_e9a051f3-5b12-4214-a296-469ae89be716.jpg', 'images/products/dura-foam-plus.jpg');

  // Ortho Pro & Medical
  await copyOptimized('14-ultraortho-front-978x589_d8f48ebe-6bfd-4334-b234-c9fc9de87a07.jpg', 'images/products/dura-ortho-pro-1.jpg');
  await copyOptimized('render_Final_oringal_side_2048x2048.jpg', 'images/products/dura-ortho-pro-2.jpg');
  await copyOptimized('14-ultraortho-front-978x589_d8f48ebe-6bfd-4334-b234-c9fc9de87a07.jpg', 'images/products/dura-ortho-pro.jpg');
  await copyOptimized('Molty_Cure_2_Layers_listing_2048x2048.jpg', 'images/products/dura-ortho-medical-1.jpg');
  await copyOptimized('Molty_Cure_2_Layers_bfc8f167-ebc1-403b-8923-e182f2cd3acf_2048x2048.jpg', 'images/products/dura-ortho-medical-2.jpg');
  await copyOptimized('Molty_Cure_2_Layers_listing_2048x2048.jpg', 'images/products/dura-ortho-medical.jpg');
  await copyOptimized('Senior_700x700_c8ca967b-4997-4435-8981-6c0f4ab57f59_2048x2048.jpg', 'images/products/dura-ortho-plus-1.jpg');

  // Cool Gel
  await copyOptimized('13-Coolgel-front-978x589_792a53f5-1c07-4fb1-b29a-d36c9b80e052.jpg', 'images/products/dura-cool-gel-1.jpg');
  await copyOptimized('Moltycoolgel_2048x2048.jpg', 'images/products/dura-cool-gel-2.jpg');
  await copyOptimized('13-Coolgel-front-978x589_792a53f5-1c07-4fb1-b29a-d36c9b80e052.jpg', 'images/products/dura-cool-gel-pro-1.jpg');
  await copyOptimized('Moltycoolgel_2048x2048.jpg', 'images/products/dura-cool-gel-pro-2.jpg');
  await copyOptimized('13-Coolgel-front-978x589_792a53f5-1c07-4fb1-b29a-d36c9b80e052.jpg', 'images/products/dura-cool-gel-pro.jpg');
  await copyOptimized('Moltycoolgel_2048x2048.jpg', 'images/products/dura-cool-gel-deluxe-1.jpg');

  // Memory 2-in-1 & Memory Pro
  await copyOptimized('1080x1080_2in111111111_2048x2048.jpg', 'images/products/dura-sleep-memory-1.jpg');
  await copyOptimized('1080x1080_2in1_2_2048x2048.jpg', 'images/products/dura-sleep-memory-2.jpg');
  await copyOptimized('1080x1080_2in111111111_2048x2048.jpg', 'images/products/dura-sleep-memory.jpg');
  await copyOptimized('Sleep_Memory_2048x2048.jpg', 'images/products/dura-memory-pro-1.jpg');
  await copyOptimized('Sleep_Memory_2048x2048.jpg', 'images/products/memory-foam-contour-1.jpg');
  await copyOptimized('Moltysleep_d8c0ffea-db6e-46bd-8c51-bbc31d385da0_2048x2048.jpg', 'images/products/dura-memory-pro-2.jpg');

  // Cloud Plush & Luxury
  await copyOptimized('11-eternasoft-front-978x589_1600x.jpg', 'images/products/dura-cloud-pillow-top-1.jpg');
  await copyOptimized('1080x1080_5e88ee5d-08f6-4284-b39d-f745c889c778_2048x2048.jpg', 'images/products/dura-cloud-pillow-top-2.jpg');
  await copyOptimized('11-eternasoft-front-978x589_1600x.jpg', 'images/products/dura-cloud-plush-1.jpg');
  await copyOptimized('1080x1080_5e88ee5d-08f6-4284-b39d-f745c889c778_2048x2048.jpg', 'images/products/dura-cloud-luxury-1.jpg');

  // Hybrid & Spring
  await copyOptimized('MoltyHybrid_2048x2048.jpg', 'images/products/hybrid-mattress-1.jpg');
  await copyOptimized('molty-hybrid_1_2048x2048.jpg', 'images/products/memory-foam-hybrid-1.jpg');

  // Junior, Kids, Baby
  await copyOptimized('junior_700x700_6922efd9-2f3c-4e62-94c6-6bd0ea1c9ae9_2048x2048.jpg', 'images/products/baby-mattress-1.jpg');
  await copyOptimized('junior_700x700_6922efd9-2f3c-4e62-94c6-6bd0ea1c9ae9_2048x2048.jpg', 'images/products/kids-mattress-1.jpg');
  await copyOptimized('junior_700x700_6922efd9-2f3c-4e62-94c6-6bd0ea1c9ae9_2048x2048.jpg', 'images/products/dura-baby-crib-1.jpg');

  // Pillows & Accessories
  await copyOptimized('pillow-duckdown.jpg', 'images/products/cervical-pillow-1.jpg');
  await copyOptimized('pillow-duckdown.jpg', 'images/products/bamboo-pillow-1.jpg');
  await copyOptimized('pillow-duckdown.jpg', 'images/products/body-pillow-1.jpg');
  await copyOptimized('pillow-duckdown.jpg', 'images/products/cool-gel-pillow-1.jpg');
  await copyOptimized('pillow-duckdown.jpg', 'images/products/adjustable-pillow-1.jpg');
  await copyOptimized('pillow-duckdown.jpg', 'images/products/ortho-cervical-pillow-1.jpg');
  await copyOptimized('pillow-duckdown.jpg', 'images/products/maternity-pillow-1.jpg');
  await copyOptimized('pillow-duckdown.jpg', 'images/products/nursing-pillow-1.jpg');
  await copyOptimized('pillow-duckdown.jpg', 'images/products/dura-mom-pillow-1.jpg');

  // Bed-in-a-box
  await copyOptimized('Moltyinabox_2048x2048.jpg', 'images/products/mattress-protector-1.jpg');
  await copyOptimized('Moltyinabox2_2048x2048.jpg', 'images/products/waterproof-protector-1.jpg');
  await copyOptimized('7Zone_2048x2048.jpg', 'images/products/memory-foam-topper-1.jpg');
  await copyOptimized('1080x1080_full_frontttt_2048x2048.jpg', 'images/products/bed-frame-1.jpg');
  await copyOptimized('1080x1080_2_98697d55-5f2f-4e9e-8cb0-7918ac23f1bb_2048x2048.jpg', 'images/products/bed-sheets-1.jpg');

  console.log('--- ALL REAL STUDIO IMAGES SUCCESSFULLY INTEGRATED! ---');
}

run().catch(console.error);
