import type { Product } from '@/types/product';

export const products: Product[] = [
  // ─── DURA FOAM CLASSIC ───────────────────────────────────────────────
  {
    id: 'df-001',
    slug: 'dura-foam-classic',
    name: 'Dura Foam Classic',
    category: 'dura-foam',
    type: 'Foam',
    shortDescription: 'Everyday comfort foam mattress with high-density base support.',
    description:
      'The Dura Foam Classic is our entry-level premium foam mattress, crafted for those who want reliable, consistent comfort every night. Built with a high-density polyurethane base and a knitted fabric cover, this mattress delivers firm-yet-comfortable support for all sleep positions.',
    images: [
      { src: '/images/products/dura-foam-classic-1.jpg', alt: 'Dura Foam Classic mattress front view' },
      { src: '/images/products/dura-foam-classic-2.jpg', alt: 'Dura Foam Classic mattress side profile' },
    ],
    basePrice: 17500,
    rating: 4.3,
    reviewCount: 142,
    badges: ['Best Seller'],
    firmness: 'Medium-Firm',
    features: ['High-density foam base', 'Knitted fabric cover', 'Anti-dust mite treatment', 'Breathable construction'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 2000 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 5000 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 8000 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 12000 },
      ],
      thicknesses: [
        { label: '4"', priceModifier: 0 },
        { label: '5"', priceModifier: 1500 },
        { label: '6"', priceModifier: 3000 },
      ],
      styles: [{ label: 'Standard', priceModifier: 0 }],
    },
    stock: 45,
    createdAt: '2024-01-15',
    soldCount: 892,
    specifications: {
      'Cover Fabric': 'Knitted Fabric',
      'Base Layer': '4" HD Polyurethane Foam',
      'Density': '35 kg/m³',
      'Fire Retardancy': 'Standard',
    },
    warranty: '5 Years',
    trialNights: 100,
    bestFor: ['Back pain', 'Side sleepers', 'Guest room'],
    layers: [
      { name: 'Quilted Cover', thickness: '0.5"', color: '#FFFFFF', description: 'Soft, breathable knitted fabric' },
      { name: 'Comfort Foam', thickness: '1.5"', color: '#EEEFFD', description: 'Medium-density comfort layer' },
      { name: 'Support Base', thickness: '2"', color: '#5B65DC', description: 'High-density support core' },
    ],
  },

  // ─── DURA CLOUD PILLOW TOP ───────────────────────────────────────────
  {
    id: 'df-002',
    slug: 'dura-cloud-pillow-top',
    name: 'Dura Cloud Pillow-Top',
    category: 'dura-cloud',
    type: 'Foam',
    shortDescription: 'Luxurious pillow-top comfort with plush upper layer for cloud-like sleep.',
    description:
      'Experience the Dura Cloud difference — a hotel-grade pillow-top mattress that cradles you in plush comfort while providing the support your body needs. The extra quilted pillow-top layer adds a luxurious softness that feels like sleeping on clouds.',
    images: [
      { src: '/images/products/dura-cloud-pillow-top-1.jpg', alt: 'Dura Cloud Pillow-Top mattress' },
      { src: '/images/products/dura-cloud-pillow-top-2.jpg', alt: 'Dura Cloud Pillow-Top side view' },
    ],
    basePrice: 28500,
    salePrice: 24500,
    rating: 4.7,
    reviewCount: 89,
    badges: ['Sale', 'New'],
    firmness: 'Soft',
    features: ['Pillow-top quilted layer', 'Pressure-relieving foam', 'Euro top design', 'Hypoallergenic materials'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 3000 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 7000 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 11000 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 16000 },
      ],
      thicknesses: [
        { label: '8"', priceModifier: 0 },
        { label: '10"', priceModifier: 3500 },
        { label: '12"', priceModifier: 7000 },
      ],
      styles: [
        { label: 'Standard Soft', priceModifier: 0 },
        { label: 'Extra Plush', priceModifier: 2500 },
      ],
    },
    stock: 28,
    createdAt: '2024-03-10',
    soldCount: 412,
    specifications: {
      'Cover Fabric': 'Quilted Euro-top',
      'Comfort Layer': '3" Plush Foam',
      'Support Layer': '5" HD Base Foam',
      'Total Height': '8" – 12"',
    },
    warranty: '10 Years',
    trialNights: 100,
    bestFor: ['Side sleepers', 'Couples', 'Luxury comfort'],
    layers: [
      { name: 'Pillow-Top Cover', thickness: '2"', color: '#FFFFFF', description: 'Quilted plush comfort layer' },
      { name: 'Plush Foam', thickness: '3"', color: '#F0F1FE', description: 'Pressure-relieving comfort foam' },
      { name: 'Transition Foam', thickness: '1.5"', color: '#EEEFFD', description: 'Gentle transition layer' },
      { name: 'HD Base Foam', thickness: '1.5"', color: '#5B65DC', description: 'High-density support base' },
    ],
  },

  // ─── DURA ORTHO MEDICAL ──────────────────────────────────────────────
  {
    id: 'df-003',
    slug: 'dura-ortho-medical',
    name: 'Dura Ortho Medical',
    category: 'dura-ortho',
    type: 'Orthopedic',
    shortDescription: 'Doctor-recommended orthopedic mattress for spine alignment and back pain relief.',
    description:
      'Designed in consultation with orthopedic specialists, the Dura Ortho Medical provides exceptional spinal support and pressure relief. Its 7-zone support system ensures your body is properly aligned while you sleep, reducing back pain and improving sleep quality.',
    images: [
      { src: '/images/products/dura-ortho-medical-1.jpg', alt: 'Dura Ortho Medical mattress' },
      { src: '/images/products/dura-ortho-medical-2.jpg', alt: 'Dura Ortho Medical support zones' },
    ],
    basePrice: 35000,
    rating: 4.8,
    reviewCount: 234,
    badges: ['Best Seller', 'Trending'],
    firmness: 'Firm',
    features: [
      '7-zone orthopedic support',
      'Spinal alignment technology',
      'Anti-sag construction',
      'Doctor recommended',
      'Breathable air channels',
    ],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 3500 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 8000 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 13000 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 18000 },
      ],
      thicknesses: [
        { label: '6"', priceModifier: 0 },
        { label: '8"', priceModifier: 4000 },
        { label: '10"', priceModifier: 8000 },
      ],
      styles: [
        { label: 'Firm', priceModifier: 0 },
        { label: 'Medium-Firm', priceModifier: 1000 },
      ],
    },
    stock: 32,
    createdAt: '2023-11-01',
    soldCount: 1204,
    specifications: {
      'Support System': '7-Zone Orthopedic',
      'Cover': 'Medical-Grade Fabric',
      'Core': 'High-Resilience Foam',
      'Certification': 'CertiPUR-US',
    },
    warranty: '10 Years',
    trialNights: 100,
    bestFor: ['Back pain', 'Orthopedic support', 'Side sleepers', 'Couples'],
    layers: [
      { name: 'Medical Fabric Cover', thickness: '0.5"', color: '#FFFFFF', description: 'Breathable medical-grade fabric' },
      { name: 'Comfort Foam', thickness: '1.5"', color: '#E8EAFD', description: 'Pressure-relieving layer' },
      { name: '7-Zone Support', thickness: '2"', color: '#8B93E8', description: 'Zoned orthopedic support' },
      { name: 'Orthopedic Base', thickness: '2"', color: '#141B4D', description: 'Ultra-firm support foundation' },
    ],
  },

  // ─── DURA COOL GEL 7-ZONE ────────────────────────────────────────────
  {
    id: 'df-004',
    slug: 'dura-cool-gel-7-zone',
    name: 'Dura Cool Gel 7-Zone',
    category: 'cooling-gel',
    type: 'Cooling Gel',
    shortDescription: 'Advanced cooling gel technology for hot sleepers – stays cool all night.',
    description:
      'The Dura Cool Gel 7-Zone mattress is engineered for Pakistan\'s warm climate. Infused with thousands of cooling gel beads and featuring an open-cell foam structure, it actively dissipates body heat and maintains an optimal sleep temperature throughout the night.',
    images: [
      { src: '/images/products/dura-cool-gel-1.jpg', alt: 'Dura Cool Gel mattress' },
      { src: '/images/products/dura-cool-gel-2.jpg', alt: 'Dura Cool Gel cooling technology' },
    ],
    basePrice: 42000,
    salePrice: 37000,
    rating: 4.6,
    reviewCount: 178,
    badges: ['Sale', 'Trending'],
    firmness: 'Medium',
    features: [
      'Cooling gel-infused memory foam',
      'Open-cell breathable structure',
      '7-zone pressure relief',
      'Moisture-wicking cover',
      'Anti-microbial treatment',
    ],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 4000 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 10000 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 15000 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 20000 },
      ],
      thicknesses: [
        { label: '8"', priceModifier: 0 },
        { label: '10"', priceModifier: 5000 },
        { label: '12"', priceModifier: 10000 },
      ],
      styles: [
        { label: 'Cooling Gel', priceModifier: 0 },
        { label: 'Advanced Cooling', priceModifier: 4000 },
      ],
    },
    stock: 19,
    createdAt: '2024-02-20',
    soldCount: 687,
    specifications: {
      'Gel Layer': '2" Gel-Infused Memory Foam',
      'Transition': '2" Adaptive Foam',
      'Base': '4" HD Support Foam',
      'Cover': 'Moisture-Wicking Fabric',
    },
    warranty: '10 Years',
    trialNights: 100,
    bestFor: ['Hot sleepers', 'Couples', 'Back pain'],
    layers: [
      { name: 'Cooling Cover', thickness: '0.5"', color: '#E8F4FD', description: 'Moisture-wicking cooling fabric' },
      { name: 'Gel Memory Foam', thickness: '2"', color: '#7DD3FC', description: 'Cooling gel-infused memory foam' },
      { name: 'Adaptive Foam', thickness: '2"', color: '#BFDBFE', description: 'Pressure-adaptive transition' },
      { name: 'HD Support Base', thickness: '3.5"', color: '#1E40AF', description: 'Durable support foundation' },
    ],
  },

  // ─── DURA SLEEP MEMORY 2-IN-1 ────────────────────────────────────────
  {
    id: 'df-005',
    slug: 'dura-sleep-memory-2-in-1',
    name: 'Dura Sleep Memory 2-in-1',
    category: 'memory-foam',
    type: 'Memory Foam',
    shortDescription: 'Reversible 2-in-1 memory foam mattress – firm on one side, soft on the other.',
    description:
      'Can\'t decide between firm and soft? The Dura Sleep Memory 2-in-1 solves the dilemma. Simply flip the mattress to switch between a firmer orthopedic side and a plush memory foam side. Two mattresses in one – the perfect choice for couples with different sleep preferences.',
    images: [
      { src: '/images/products/dura-sleep-memory-1.jpg', alt: 'Dura Sleep Memory 2-in-1 mattress' },
      { src: '/images/products/dura-sleep-memory-2.jpg', alt: 'Dura Sleep Memory flip side' },
    ],
    basePrice: 45000,
    rating: 4.5,
    reviewCount: 203,
    badges: ['2-in-1', 'Best Seller'],
    firmness: 'Medium',
    features: [
      'Reversible design',
      'Firm orthopedic side',
      'Soft memory foam side',
      'Motion isolation',
      'Body-contouring comfort',
    ],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 4500 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 11000 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 16000 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 22000 },
      ],
      thicknesses: [
        { label: '8"', priceModifier: 0 },
        { label: '10"', priceModifier: 6000 },
      ],
      styles: [
        { label: 'Firm/Soft', priceModifier: 0 },
        { label: 'Firm/Extra-Soft', priceModifier: 2000 },
      ],
    },
    stock: 24,
    createdAt: '2024-01-28',
    soldCount: 534,
    specifications: {
      'Side A': 'Orthopedic Firm Foam',
      'Side B': '2" Visco Memory Foam + Plush Layer',
      'Core': '4" HD Base Foam',
      'Total Height': '8" or 10"',
    },
    warranty: '10 Years',
    trialNights: 100,
    bestFor: ['Couples', 'Back pain', 'Side sleepers'],
    layers: [
      { name: 'Memory Foam Side', thickness: '2"', color: '#8B93E8', description: 'Visco memory foam layer' },
      { name: 'Comfort Foam', thickness: '2"', color: '#EEEFFD', description: 'Plush comfort layer' },
      { name: 'HD Base Core', thickness: '4"', color: '#5B65DC', description: 'High-density support core' },
      { name: 'Orthopedic Side', thickness: '2"', color: '#141B4D', description: 'Firm orthopedic layer' },
    ],
  },

  // ─── DURA MEMORY PRO ─────────────────────────────────────────────────
  {
    id: 'df-006',
    slug: 'dura-memory-pro',
    name: 'Dura Memory Pro',
    category: 'memory-foam',
    type: 'Memory Foam',
    shortDescription: 'Premium memory foam mattress with superior body contouring and motion isolation.',
    description:
      'The Dura Memory Pro features premium viscoelastic memory foam that responds to your body heat and weight, perfectly conforming to your unique shape. Ideal for couples, its exceptional motion isolation means you won\'t feel your partner tossing and turning.',
    images: [
      { src: '/images/products/dura-memory-pro-1.jpg', alt: 'Dura Memory Pro mattress' },
    ],
    basePrice: 39000,
    rating: 4.7,
    reviewCount: 156,
    badges: ['New', 'Trending'],
    firmness: 'Medium',
    features: ['Premium viscoelastic foam', 'Motion isolation', 'Body contouring', 'Temperature sensitive', 'Pressure point relief'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 4000 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 10000 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 15000 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 21000 },
      ],
      thicknesses: [
        { label: '8"', priceModifier: 0 },
        { label: '10"', priceModifier: 5500 },
        { label: '12"', priceModifier: 11000 },
      ],
      styles: [{ label: 'Standard', priceModifier: 0 }],
    },
    stock: 18,
    createdAt: '2024-04-05',
    soldCount: 289,
    warranty: '10 Years',
    trialNights: 100,
    bestFor: ['Couples', 'Back pain', 'Side sleepers'],
  },

  // ─── DURA ORTHO PLUS ─────────────────────────────────────────────────
  {
    id: 'df-007',
    slug: 'dura-ortho-plus',
    name: 'Dura Ortho Plus',
    category: 'dura-ortho',
    type: 'Orthopedic',
    shortDescription: 'Enhanced orthopedic support with added comfort layer for medical-grade sleep.',
    description:
      'Building on our acclaimed Ortho Medical, the Dura Ortho Plus adds a comfort foam layer on top for a perfect balance of therapeutic support and everyday comfort. Ideal for those who need orthopedic support without sacrificing softness.',
    images: [
      { src: '/images/products/dura-ortho-plus-1.jpg', alt: 'Dura Ortho Plus mattress' },
    ],
    basePrice: 29500,
    rating: 4.6,
    reviewCount: 98,
    badges: ['Best Seller'],
    firmness: 'Medium-Firm',
    features: ['Dual-layer comfort', 'Orthopedic core', 'Anti-allergy fabric', 'Ventilation channels'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 3000 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 7500 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 12000 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 16500 },
      ],
      thicknesses: [
        { label: '6"', priceModifier: 0 },
        { label: '8"', priceModifier: 4000 },
        { label: '10"', priceModifier: 8000 },
      ],
      styles: [
        { label: 'Medium-Firm', priceModifier: 0 },
        { label: 'Firm', priceModifier: 0 },
      ],
    },
    stock: 27,
    createdAt: '2023-12-15',
    soldCount: 671,
    warranty: '10 Years',
    trialNights: 100,
    bestFor: ['Back pain', 'Side sleepers'],
  },

  // ─── CERVICAL MEMORY FOAM PILLOW ─────────────────────────────────────
  {
    id: 'df-008',
    slug: 'cervical-memory-foam-pillow',
    name: 'Cervical Memory Foam Pillow',
    category: 'pillows',
    type: 'Pillow',
    shortDescription: 'Ergonomic cervical pillow for neck pain relief and proper spinal alignment.',
    description:
      'The Dura Flex Cervical Memory Foam Pillow is specially contoured to support the natural curve of your neck and spine. The memory foam adapts to your position, providing personalized support that helps relieve neck pain and stiffness.',
    images: [
      { src: '/images/products/cervical-pillow-1.jpg', alt: 'Cervical Memory Foam Pillow' },
    ],
    basePrice: 4500,
    salePrice: 3800,
    rating: 4.5,
    reviewCount: 312,
    badges: ['Sale', 'Best Seller'],
    features: ['Ergonomic contoured shape', 'Memory foam filling', 'Anti-microbial cover', 'Washable pillowcase'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Standard', priceModifier: 0 },
        { label: '78x42', displayName: 'Large', priceModifier: 500 },
      ],
      thicknesses: [
        { label: '4"', priceModifier: 0 },
        { label: '5"', priceModifier: 800 },
      ],
      styles: [
        { label: 'Low Profile', priceModifier: 0 },
        { label: 'High Profile', priceModifier: 300 },
      ],
    },
    stock: 120,
    createdAt: '2024-01-01',
    soldCount: 2340,
    warranty: '2 Years',
    bestFor: ['Neck pain', 'Back pain', 'Side sleepers'],
  },

  // ─── BAMBOO MEMORY FOAM PILLOW ───────────────────────────────────────
  {
    id: 'df-009',
    slug: 'bamboo-memory-foam-pillow',
    name: 'Bamboo Memory Foam Pillow',
    category: 'pillows',
    type: 'Pillow',
    shortDescription: 'Eco-friendly bamboo-covered memory foam pillow with natural cooling.',
    description:
      'Crafted with a natural bamboo-derived cover and filled with premium shredded memory foam, this eco-friendly pillow provides adjustable loft, natural temperature regulation, and superior softness for a perfectly personalized sleep experience.',
    images: [
      { src: '/images/products/bamboo-pillow-1.jpg', alt: 'Bamboo Memory Foam Pillow' },
    ],
    basePrice: 3800,
    rating: 4.4,
    reviewCount: 189,
    badges: ['New'],
    features: ['Bamboo fabric cover', 'Shredded memory foam fill', 'Adjustable loft', 'Naturally cooling', 'Hypoallergenic'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Standard', priceModifier: 0 },
        { label: '78x42', displayName: 'King', priceModifier: 800 },
      ],
      thicknesses: [{ label: '5"', priceModifier: 0 }],
      styles: [{ label: 'Shredded Fill', priceModifier: 0 }],
    },
    stock: 85,
    createdAt: '2024-05-01',
    soldCount: 456,
    warranty: '2 Years',
    bestFor: ['Hot sleepers', 'Eco-conscious', 'All sleepers'],
  },

  // ─── WATERPROOF MATTRESS PROTECTOR ───────────────────────────────────
  {
    id: 'df-010',
    slug: 'waterproof-mattress-protector',
    name: 'Waterproof Mattress Protector',
    category: 'accessories',
    type: 'Accessory',
    shortDescription: '100% waterproof Terry cloth mattress protector with quiet, soft feel.',
    description:
      'Protect your mattress investment with the Dura Flex Waterproof Protector. Features a silent Terry cloth surface with a fully waterproof membrane backing. Machine washable and designed to preserve your mattress warranty.',
    images: [
      { src: '/images/products/mattress-protector-1.jpg', alt: 'Waterproof Mattress Protector' },
    ],
    basePrice: 2500,
    rating: 4.6,
    reviewCount: 445,
    badges: ['Best Seller'],
    features: ['100% waterproof', 'Terry cloth surface', 'Silent protection', 'Machine washable', 'Deep-pocket elastic'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 300 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 600 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 900 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 1200 },
      ],
      thicknesses: [{ label: '4"', priceModifier: 0 }],
      styles: [{ label: 'White', priceModifier: 0 }],
    },
    stock: 200,
    createdAt: '2023-10-01',
    soldCount: 3120,
    warranty: '1 Year',
    bestFor: ['Kids', 'All sleepers'],
  },

  // ─── MEMORY FOAM TOPPER ──────────────────────────────────────────────
  {
    id: 'df-011',
    slug: 'memory-foam-topper',
    name: 'Memory Foam Topper 2"',
    category: 'accessories',
    type: 'Accessory',
    shortDescription: 'Add instant plush comfort to any mattress with our 2" memory foam topper.',
    description:
      'Transform your existing mattress with the Dura Flex Memory Foam Topper. The 2" layer of temperature-responsive viscoelastic foam adds a cloud-like comfort layer, reduces pressure points, and gives new life to an aging mattress.',
    images: [
      { src: '/images/products/memory-foam-topper-1.jpg', alt: 'Memory Foam Mattress Topper' },
    ],
    basePrice: 6500,
    rating: 4.3,
    reviewCount: 267,
    badges: ['Trending'],
    features: ['2" visco memory foam', 'Non-slip base', 'Breathable construction', 'Washable cover included'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 800 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 1800 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 2500 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 3500 },
      ],
      thicknesses: [
        { label: '4"', priceModifier: 0 },
        { label: '5"', priceModifier: 1200 },
      ],
      styles: [{ label: 'Memory Foam', priceModifier: 0 }],
    },
    stock: 67,
    createdAt: '2024-02-01',
    soldCount: 891,
    bestFor: ['All sleepers', 'Couples'],
  },

  // ─── DURA BABY MATTRESS ───────────────────────────────────────────────
  {
    id: 'df-012',
    slug: 'dura-baby-cot-mattress',
    name: 'Dura Baby Cot Mattress',
    category: 'dura-baby',
    type: 'Foam',
    shortDescription: 'Safe, breathable baby cot mattress with removable waterproof cover.',
    description:
      'Designed specifically for your little one\'s safety and comfort, the Dura Baby Cot Mattress features a firm, breathable core that promotes safe infant sleep. The removable, machine-washable waterproof cover makes cleanup effortless.',
    images: [
      { src: '/images/products/baby-mattress-1.jpg', alt: 'Dura Baby Cot Mattress' },
    ],
    basePrice: 8500,
    rating: 4.8,
    reviewCount: 156,
    badges: ['Best Seller', 'New'],
    firmness: 'Firm',
    features: [
      'Firm core for safe infant sleep',
      'Breathable air channels',
      'Removable waterproof cover',
      'Anti-allergen treatment',
      'CertiPUR certified',
    ],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Cot (24×48")', priceModifier: 0 },
        { label: '78x42', displayName: 'Toddler (27×52")', priceModifier: 1500 },
      ],
      thicknesses: [
        { label: '4"', priceModifier: 0 },
        { label: '5"', priceModifier: 800 },
      ],
      styles: [
        { label: 'White', priceModifier: 0 },
        { label: 'Pastel Blue', priceModifier: 200 },
        { label: 'Pastel Pink', priceModifier: 200 },
      ],
    },
    stock: 43,
    createdAt: '2024-03-15',
    soldCount: 678,
    warranty: '3 Years',
    bestFor: ['Kids'],
  },

  // ─── DURA MOM MATERNITY PILLOW ────────────────────────────────────────
  {
    id: 'df-013',
    slug: 'dura-mom-maternity-pillow',
    name: 'Dura Mom Full-Body Maternity Pillow',
    category: 'dura-mom',
    type: 'Pillow',
    shortDescription: 'C-shaped full-body support pillow for pregnancy comfort and nursing.',
    description:
      'The Dura Mom Maternity Pillow provides full-body support designed for the unique needs of pregnancy. Its C-shaped design supports the back, hips, knees, and belly simultaneously, reducing aches and promoting better circulation. Also excellent for nursing support post-birth.',
    images: [
      { src: '/images/products/maternity-pillow-1.jpg', alt: 'Dura Mom Maternity Pillow' },
    ],
    basePrice: 5500,
    salePrice: 4800,
    rating: 4.9,
    reviewCount: 289,
    badges: ['Sale', 'Best Seller'],
    features: [
      'C-shaped full-body design',
      'Pregnancy & nursing support',
      'Hypoallergenic filling',
      'Machine-washable cover',
      'Extra plush comfort',
    ],
    variants: {
      sizes: [{ label: '78x36', displayName: 'Standard (C-Shape)', priceModifier: 0 }],
      thicknesses: [{ label: '4"', priceModifier: 0 }],
      styles: [
        { label: 'Grey', priceModifier: 0 },
        { label: 'White', priceModifier: 0 },
        { label: 'Pink', priceModifier: 0 },
        { label: 'Mint', priceModifier: 0 },
      ],
    },
    stock: 58,
    createdAt: '2024-01-20',
    soldCount: 1245,
    warranty: '1 Year',
    bestFor: ['Back pain', 'Side sleepers'],
  },

  // ─── PREMIUM BED FRAME ────────────────────────────────────────────────
  {
    id: 'df-014',
    slug: 'dura-premium-bed-frame',
    name: 'Dura Premium Platform Bed Base',
    category: 'bed-frames',
    type: 'Bed Frame',
    shortDescription: 'Solid wood platform bed base with center support legs.',
    description:
      'Complete your sleep setup with the Dura Premium Platform Bed Base. Made from solid pine wood with a slatted design for maximum airflow, it provides a stable foundation for any Dura Flex mattress. No box spring needed.',
    images: [
      { src: '/images/products/bed-frame-1.jpg', alt: 'Dura Premium Platform Bed Base' },
    ],
    basePrice: 25000,
    rating: 4.5,
    reviewCount: 67,
    badges: ['New'],
    features: ['Solid pine wood', 'Slatted for airflow', 'Center support legs', 'No box spring needed', 'Easy assembly'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 3000 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 8000 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 12000 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 16000 },
      ],
      thicknesses: [{ label: '4"', priceModifier: 0 }],
      styles: [
        { label: 'Natural Wood', priceModifier: 0 },
        { label: 'Walnut Finish', priceModifier: 3000 },
        { label: 'White Painted', priceModifier: 2000 },
      ],
    },
    stock: 22,
    createdAt: '2024-02-10',
    soldCount: 234,
    warranty: '5 Years',
  },

  // ─── MICROFIBER BED SHEET SET ─────────────────────────────────────────
  {
    id: 'df-015',
    slug: 'microfiber-bedsheet-set',
    name: 'Dura Microfiber Bed Sheet Set',
    category: 'accessories',
    type: 'Bedding',
    shortDescription: '1000 thread-count microfiber sheet set – ultra-soft, wrinkle-resistant, 4-piece.',
    description:
      'Elevate your sleep with our premium Microfiber Bed Sheet Set. With 1000 thread-count equivalent softness, these wrinkle-resistant sheets stay smooth and fresh wash after wash. The set includes a flat sheet, fitted sheet, and two pillowcases.',
    images: [
      { src: '/images/products/bed-sheets-1.jpg', alt: 'Dura Microfiber Bed Sheet Set' },
    ],
    basePrice: 3200,
    salePrice: 2800,
    rating: 4.4,
    reviewCount: 523,
    badges: ['Sale', 'Best Seller'],
    features: ['4-piece set', 'Microfiber fabric', 'Wrinkle resistant', 'Machine washable', 'Deep-pocket fitted'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single', priceModifier: 0 },
        { label: '78x60', displayName: 'Double', priceModifier: 500 },
        { label: '78x66', displayName: 'Queen', priceModifier: 800 },
        { label: '78x72', displayName: 'King', priceModifier: 1200 },
      ],
      thicknesses: [{ label: '4"', priceModifier: 0 }],
      styles: [
        { label: 'White', priceModifier: 0 },
        { label: 'Grey', priceModifier: 0 },
        { label: 'Navy Blue', priceModifier: 0 },
        { label: 'Beige', priceModifier: 0 },
      ],
    },
    stock: 150,
    createdAt: '2023-11-15',
    soldCount: 2890,
    warranty: '6 Months',
    bestFor: ['All sleepers'],
  },

  // ─── DURA FOAM PLUS ───────────────────────────────────────────────────
  {
    id: 'df-016',
    slug: 'dura-foam-plus',
    name: 'Dura Foam Plus',
    category: 'dura-foam',
    type: 'Foam',
    shortDescription: 'Upgraded foam mattress with enhanced comfort layer and better edge support.',
    description:
      'The Dura Foam Plus takes our classic foam formula and adds a premium comfort layer for enhanced support and a more restful sleep. Reinforced edge support ensures no sagging on the sides.',
    images: [
      { src: '/images/products/dura-foam-plus-1.jpg', alt: 'Dura Foam Plus mattress' },
    ],
    basePrice: 22000,
    rating: 4.4,
    reviewCount: 112,
    badges: ['New'],
    firmness: 'Medium',
    features: ['Enhanced comfort layer', 'Edge support', 'Anti-microbial treatment', 'Breathable knitted cover'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 2500 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 6000 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 9500 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 13000 },
      ],
      thicknesses: [
        { label: '5"', priceModifier: 0 },
        { label: '6"', priceModifier: 2500 },
        { label: '8"', priceModifier: 5500 },
      ],
      styles: [{ label: 'Standard', priceModifier: 0 }],
    },
    stock: 38,
    createdAt: '2024-04-20',
    soldCount: 345,
    warranty: '7 Years',
    trialNights: 100,
    bestFor: ['Back pain', 'All sleepers'],
  },

  // ─── DURA CLOUD LUXURY ────────────────────────────────────────────────
  {
    id: 'df-017',
    slug: 'dura-cloud-luxury',
    name: 'Dura Cloud Luxury',
    category: 'dura-cloud',
    type: 'Foam',
    shortDescription: 'Top-of-the-line ultra-plush mattress for the ultimate sleep experience.',
    description:
      'Our finest creation – the Dura Cloud Luxury delivers a five-star hotel experience in your own bedroom. With multiple comfort layers, a hand-tufted top panel, and premium materials throughout, this is the definitive luxury mattress.',
    images: [
      { src: '/images/products/dura-cloud-luxury-1.jpg', alt: 'Dura Cloud Luxury mattress' },
    ],
    basePrice: 55000,
    salePrice: 48000,
    rating: 4.9,
    reviewCount: 78,
    badges: ['Sale', 'Limited'],
    firmness: 'Soft',
    features: ['Multi-layer construction', 'Hand-tufted top panel', 'Edge-to-edge support', 'Cashmere-blend cover', 'Natural materials'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 5000 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 12000 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 18000 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 25000 },
      ],
      thicknesses: [
        { label: '10"', priceModifier: 0 },
        { label: '12"', priceModifier: 8000 },
      ],
      styles: [
        { label: 'Ultra Plush', priceModifier: 0 },
        { label: 'Plush', priceModifier: -2000 },
      ],
    },
    stock: 12,
    createdAt: '2024-03-01',
    soldCount: 178,
    warranty: '10 Years',
    trialNights: 100,
    bestFor: ['Luxury comfort', 'Couples'],
  },

  // ─── KIDS FOAM MATTRESS ───────────────────────────────────────────────
  {
    id: 'df-018',
    slug: 'dura-kids-foam-mattress',
    name: 'Dura Kids Foam Mattress',
    category: 'dura-baby',
    type: 'Foam',
    shortDescription: 'Safe, supportive foam mattress for growing children aged 3-12.',
    description:
      'Designed for growing children, the Dura Kids Foam Mattress provides the perfect firmness for developing spines. Non-toxic, hypoallergenic materials and a fun, colorful design make bedtime an adventure.',
    images: [
      { src: '/images/products/kids-mattress-1.jpg', alt: 'Dura Kids Foam Mattress' },
    ],
    basePrice: 12000,
    rating: 4.7,
    reviewCount: 234,
    badges: ['Best Seller'],
    firmness: 'Medium-Firm',
    features: ['Child-safe materials', 'Non-toxic certification', 'Hypoallergenic', 'Firm growing support', 'Fun design'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 2000 },
      ],
      thicknesses: [
        { label: '4"', priceModifier: 0 },
        { label: '5"', priceModifier: 1500 },
      ],
      styles: [
        { label: 'Blue Stars', priceModifier: 0 },
        { label: 'Pink Clouds', priceModifier: 0 },
        { label: 'Green Dinos', priceModifier: 0 },
      ],
    },
    stock: 55,
    createdAt: '2024-02-15',
    soldCount: 892,
    warranty: '3 Years',
    bestFor: ['Kids'],
  },

  // ─── BODY SUPPORT PILLOW ──────────────────────────────────────────────
  {
    id: 'df-019',
    slug: 'body-support-pillow',
    name: 'Dura Body Support Pillow',
    category: 'pillows',
    type: 'Pillow',
    shortDescription: 'Long body pillow for side sleepers and pregnancy support.',
    description:
      'The Dura Body Support Pillow provides full-length support for side sleepers, reducing strain on hips, shoulders and spine. Also perfect as a pregnancy support pillow during early stages.',
    images: [
      { src: '/images/products/body-pillow-1.jpg', alt: 'Dura Body Support Pillow' },
    ],
    basePrice: 2800,
    rating: 4.3,
    reviewCount: 145,
    badges: ['Trending'],
    features: ['Full-body length', 'Microfiber filling', 'Washable cover', 'Side sleeper optimized'],
    variants: {
      sizes: [{ label: '78x36', displayName: 'Standard (20×54")', priceModifier: 0 }],
      thicknesses: [{ label: '5"', priceModifier: 0 }],
      styles: [
        { label: 'White', priceModifier: 0 },
        { label: 'Grey', priceModifier: 0 },
      ],
    },
    stock: 78,
    createdAt: '2024-01-10',
    soldCount: 567,
    bestFor: ['Side sleepers', 'Back pain'],
  },

  // ─── DURA COOL GEL PILLOW ─────────────────────────────────────────────
  {
    id: 'df-020',
    slug: 'dura-cool-gel-pillow',
    name: 'Dura Cool Gel Pillow',
    category: 'pillows',
    type: 'Pillow',
    shortDescription: 'Cooling gel-infused pillow for hot sleepers – stays cool all night.',
    description:
      'Beat the heat with the Dura Cool Gel Pillow. Gel-infused memory foam filling actively dissipates body heat while providing excellent support. The breathable cover enhances airflow for a refreshingly cool sleep.',
    images: [
      { src: '/images/products/cool-gel-pillow-1.jpg', alt: 'Dura Cool Gel Pillow' },
    ],
    basePrice: 5200,
    rating: 4.6,
    reviewCount: 198,
    badges: ['New', 'Trending'],
    features: ['Gel-infused filling', 'Cooling technology', 'Breathable cover', 'Hypoallergenic'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Standard', priceModifier: 0 },
        { label: '78x42', displayName: 'King', priceModifier: 800 },
      ],
      thicknesses: [{ label: '4"', priceModifier: 0 }],
      styles: [{ label: 'Cooling Gel', priceModifier: 0 }],
    },
    stock: 92,
    createdAt: '2024-05-10',
    soldCount: 423,
    bestFor: ['Hot sleepers', 'All sleepers'],
  },

  // ─── DURA HYBRID SPRING-FOAM ──────────────────────────────────────────
  {
    id: 'df-021',
    slug: 'dura-hybrid-spring-foam',
    name: 'Dura Hybrid Spring-Foam',
    category: 'dura-cloud',
    type: 'Hybrid',
    shortDescription: 'The best of both worlds – pocketed spring support with memory foam comfort.',
    description:
      'The Dura Hybrid combines 800+ individually pocketed springs with layers of premium memory foam. The springs provide responsive, zoned support and superior edge-to-edge stability, while the memory foam delivers cloud-like comfort and motion isolation.',
    images: [
      { src: '/images/products/hybrid-mattress-1.jpg', alt: 'Dura Hybrid Spring-Foam mattress' },
    ],
    basePrice: 61000,
    rating: 4.8,
    reviewCount: 89,
    badges: ['New', 'Limited'],
    firmness: 'Medium',
    features: ['800+ pocketed springs', 'Memory foam comfort layer', 'Motion isolation', 'Edge-to-edge support', 'Breathable design'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 6000 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 15000 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 22000 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 30000 },
      ],
      thicknesses: [
        { label: '10"', priceModifier: 0 },
        { label: '12"', priceModifier: 10000 },
      ],
      styles: [
        { label: 'Medium', priceModifier: 0 },
        { label: 'Firm', priceModifier: 0 },
      ],
    },
    stock: 15,
    createdAt: '2024-05-01',
    soldCount: 167,
    warranty: '10 Years',
    trialNights: 100,
    bestFor: ['Couples', 'Back pain', 'All sleepers'],
  },

  // ─── ADJUSTABLE PILLOW ────────────────────────────────────────────────
  {
    id: 'df-022',
    slug: 'adjustable-fill-pillow',
    name: 'Dura Adjustable Fill Pillow',
    category: 'pillows',
    type: 'Pillow',
    shortDescription: 'Customize your pillow height with adjustable shredded foam filling.',
    description:
      'The Dura Adjustable Fill Pillow lets you create the perfect pillow. Simply add or remove the shredded memory foam fill through the zipper to achieve your ideal loft height and firmness. Perfect for people who can never find the right pillow.',
    images: [
      { src: '/images/products/adjustable-pillow-1.jpg', alt: 'Dura Adjustable Fill Pillow' },
    ],
    basePrice: 4200,
    rating: 4.5,
    reviewCount: 178,
    badges: ['Best Seller'],
    features: ['Adjustable fill level', 'Shredded memory foam', 'Bamboo-blend cover', 'Machine washable cover'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Standard', priceModifier: 0 },
        { label: '78x42', displayName: 'King', priceModifier: 600 },
      ],
      thicknesses: [{ label: '4"', priceModifier: 0 }],
      styles: [{ label: 'White', priceModifier: 0 }],
    },
    stock: 110,
    createdAt: '2024-03-20',
    soldCount: 712,
    bestFor: ['All sleepers'],
  },

  // ─── LATEX MATTRESS TOPPER ────────────────────────────────────────────
  {
    id: 'df-023',
    slug: 'natural-latex-topper',
    name: 'Natural Latex Topper 3"',
    category: 'accessories',
    type: 'Accessory',
    shortDescription: 'Natural latex topper for eco-friendly, responsive, and durable comfort.',
    description:
      'Upgrade your mattress with our Natural Latex Topper. Derived from sustainable rubber trees, natural latex provides exceptional pressure relief, responsiveness, and durability. Naturally hypoallergenic and resistant to dust mites and mold.',
    images: [
      { src: '/images/products/latex-topper-1.jpg', alt: 'Natural Latex Topper' },
    ],
    basePrice: 12000,
    rating: 4.7,
    reviewCount: 134,
    badges: ['New'],
    features: ['100% natural latex', 'Pinhole ventilation', 'Hypoallergenic', 'Eco-friendly sourcing', 'Durable construction'],
    variants: {
      sizes: [
        { label: '78x36', displayName: 'Single (78×36")', priceModifier: 0 },
        { label: '78x42', displayName: 'Single XL (78×42")', priceModifier: 1500 },
        { label: '78x60', displayName: 'Double (78×60")', priceModifier: 3500 },
        { label: '78x66', displayName: 'Queen (78×66")', priceModifier: 5000 },
        { label: '78x72', displayName: 'King (78×72")', priceModifier: 7000 },
      ],
      thicknesses: [
        { label: '4"', priceModifier: 0 },
        { label: '5"', priceModifier: 3000 },
      ],
      styles: [
        { label: 'Medium', priceModifier: 0 },
        { label: 'Firm', priceModifier: 0 },
      ],
    },
    stock: 34,
    createdAt: '2024-04-01',
    soldCount: 289,
    warranty: '5 Years',
    bestFor: ['Eco-conscious', 'All sleepers'],
  },

  // ─── DURA NURSING PILLOW ──────────────────────────────────────────────
  {
    id: 'df-024',
    slug: 'dura-nursing-support-pillow',
    name: 'Dura Nursing Support Pillow',
    category: 'dura-mom',
    type: 'Pillow',
    shortDescription: 'Ergonomic nursing pillow for comfortable breastfeeding and infant support.',
    description:
      'The Dura Nursing Support Pillow wraps around your waist to bring baby to the optimal height for comfortable breastfeeding. The firm yet gentle foam filling supports baby\'s weight while a cover in soft organic cotton protects delicate skin.',
    images: [
      { src: '/images/products/nursing-pillow-1.jpg', alt: 'Dura Nursing Support Pillow' },
    ],
    basePrice: 3500,
    rating: 4.8,
    reviewCount: 312,
    badges: ['Best Seller'],
    features: ['Ergonomic shape', 'Organic cotton cover', 'Firm support foam', 'Easy to clean', 'Lightweight'],
    variants: {
      sizes: [{ label: '78x36', displayName: 'Standard', priceModifier: 0 }],
      thicknesses: [{ label: '4"', priceModifier: 0 }],
      styles: [
        { label: 'White Dots', priceModifier: 0 },
        { label: 'Pink Floral', priceModifier: 0 },
        { label: 'Grey Chevron', priceModifier: 0 },
      ],
    },
    stock: 95,
    createdAt: '2024-02-28',
    soldCount: 1567,
    bestFor: ['Back pain', 'Side sleepers'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getBestSellers(limit = 8): Product[] {
  return [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.badges.includes('Best Seller') || p.badges.includes('Trending')).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.type === product.type))
    .slice(0, limit);
}
