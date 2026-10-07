export interface BlogSection {
  heading: string;
  subheading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  callout?: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: 'Sleep Science' | 'Health & Wellness' | 'Mattress Care' | 'Buying Guides';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number; // in minutes
  tags: string[];
  keyTakeaways: string[];
  sections: BlogSection[];
  relatedProductSlug?: string;
  relatedProductName?: string;
  faqs?: BlogFaq[];
}

export const BLOG_POSTS: BlogPostItem[] = [
  {
    id: 'blog-1',
    slug: 'how-to-choose-the-right-mattress-firmness',
    title: 'How to Choose the Right Mattress Firmness: Complete Pakistani Guide',
    excerpt:
      'Discover which firmness level – Soft, Medium-Firm, or Firm – is ideal for your sleeping posture, body weight, and long-term spinal health.',
    coverImage: '/images/blog/mattress-firmness.jpg',
    category: 'Buying Guides',
    author: {
      name: 'Dr. Ayesha Malik',
      role: 'Consultant Orthopedic Sleep Specialist',
      avatar: '/images/products/ortho-med-1.jpg',
    },
    publishedAt: 'October 12, 2024',
    readTime: 6,
    tags: ['Firmness Guide', 'Spine Alignment', 'Buying Tips', 'Dura Flex'],
    keyTakeaways: [
      'Side sleepers generally need medium-firm cushioning to relieve shoulder and hip pressure points.',
      'Back and stomach sleepers require firmer support to keep the lumbar spine from sagging.',
      'Body weight plays a massive role: individuals over 80kg should look for higher density core support.',
      'Dura Flex offers a 100-night in-home sleep trial so you can test firmness in your own bedroom.',
    ],
    sections: [
      {
        heading: '1. Understanding the 1–10 Firmness Scale',
        paragraphs: [
          'When shopping for mattresses online in Pakistan, the firmness rating is the single most critical factor determining comfort and spinal posture. In sleep science, firmness is measured on a standardized 1 to 10 scale:',
        ],
        bulletPoints: [
          'Plush / Soft (1–3): Conforms deeply around the body. Recommended primarily for lighter side sleepers who need maximal pressure relief.',
          'Medium to Medium-Firm (4–6.5): The sweet spot for over 80% of sleepers. Balances plush comfort with rigid orthopedic lumbar support.',
          'Firm to Extra-Firm (7–10): Very little sinkage. Keeps the spine in a neutral horizontal plane, ideal for chronic lower back pain and stomach sleepers.',
        ],
        callout:
          'Pro Tip: Many people confuse "firmness" with "support". A mattress can have plush top quilting for luxurious comfort while still delivering medical-grade orthopedic core support underneath.',
      },
      {
        heading: '2. Matching Firmness to Your Sleep Position',
        paragraphs: [
          'Your habitual sleeping posture exerts pressure on different points of your anatomy throughout the night. Choosing a firmness incompatible with your posture causes morning stiffness and tossing and turning.',
          'Side Sleepers: Your hips and shoulders jut out furthest. A mattress that is too hard will compress the sciatic nerve and pinch shoulders. Opt for Medium (5–6) or high-density zoned foam.',
          'Back Sleepers: Your lumbar curve requires gentle upward contouring while preventing the pelvis from sinking deeper than the torso. Medium-Firm (6.5) is universally acclaimed by orthopedic doctors.',
          'Stomach Sleepers: Sinking hips cause the lower spine to hyperextend, triggering acute morning backache. A Firm (7.5–8.5) mattress is required to keep your spine neutral.',
        ],
      },
      {
        heading: '3. The Climate & Body Weight Equation',
        paragraphs: [
          'In Pakistan’s diverse climate, body weight and ambient temperature interact with foam density. Heavier bodies exert greater downward pressure, making a medium mattress feel like a soft one.',
          'If you weigh under 60kg, a softer surface will cradle you comfortably. If you weigh 60kg to 85kg, a Medium-Firm model like the Dura Flex Deluxe or Cloud is ideal. Above 85kg, choose Dura Flex Orthopedic high-density rebonded core mattresses for guaranteed non-sag longevity.',
        ],
        callout:
          'Dura Flex uses high-density cellular foam that does not degrade or develop permanent body impressions even in extreme Pakistani summers.',
      },
    ],
    relatedProductSlug: 'dura-ortho-mattress',
    relatedProductName: 'Dura Flex Orthopedic Support Mattress',
    faqs: [
      {
        question: 'What if I order a firmness that feels too hard or too soft?',
        answer:
          'Every Dura Flex mattress comes with a risk-free 100-Night Sleep Trial. If the firmness does not match your comfort, we arrange a free exchange or full refund.',
      },
      {
        question: 'Do orthopedic mattresses have to be rock hard?',
        answer:
          'No! Modern orthopedic mattresses combine high-density resilient core layers with responsive transition foams so your spine remains straight without aching joints.',
      },
    ],
  },
  {
    id: 'blog-2',
    slug: 'best-mattress-for-back-pain-in-pakistan',
    title: 'Best Mattress for Back Pain in Pakistan – Medical & Orthopedic Guide',
    excerpt:
      'Struggling with morning stiffness or chronic backache? Learn how zoned orthopedic foam restores natural spinal alignment and eliminates pressure points.',
    coverImage: '/images/blog/back-pain-mattress.jpg',
    category: 'Health & Wellness',
    author: {
      name: 'Dr. Tariq Mansoor',
      role: 'Spine & Posture Consultant',
      avatar: '/images/products/ortho-med-1.jpg',
    },
    publishedAt: 'September 28, 2024',
    readTime: 7,
    tags: ['Back Pain', 'Orthopedic', 'Spine Health', 'Sleep Quality'],
    keyTakeaways: [
      'Morning back pain is a primary indicator that your existing mattress has lost its structural resilience.',
      'Multi-zone orthopedic core foam distributes body weight evenly, preventing pelvic sagging.',
      'Doctors recommend Medium-Firm over extra-hard floors or rock-hard surfaces for disc recuperation.',
      'Dura Flex orthopedic designs are trusted by thousands of patients across Lahore, Karachi, and Islamabad.',
    ],
    sections: [
      {
        heading: '1. Why Old Mattresses Trigger Chronic Back Pain',
        paragraphs: [
          'Did you know that the average adult spends over 2,500 hours each year on their mattress? Over time, conventional spring mattresses sag into an uneven "hammock" shape.',
          'When your pelvis sinks lower than your thoracic spine for 7 to 8 consecutive hours, the intervertebral discs remain compressed rather than rehydrating and relaxing. The result: severe morning lumbar stiffness, neck tension, and interrupted sleep.',
        ],
      },
      {
        heading: '2. The Myth of the "Rock Hard" Mattress',
        paragraphs: [
          'For decades in Pakistan, elders advised sleeping on a wooden plank or an unforgiving rock-hard bed for back pain. Modern medical research in the Lancet has debunked this completely.',
          'A surface with zero contouring fails to accommodate the lumbar arch, leaving a gap where your lower back is unsupported while excessively pressuring your tailbone and shoulder blades.',
          'The clinical consensus today is **Medium-Firm Orthopedic Construction**: a firm orthopedic base coupled with a 2-inch pressure-relieving comfort layer that conforms precisely to the natural S-curve of human spine.',
        ],
        callout:
          'Clinical Fact: Studies published in The Lancet revealed that patients sleeping on medium-firm mattresses reported twice as much pain reduction compared to those sleeping on extra-hard surfaces.',
      },
      {
        heading: '3. Why Dura Flex Orthopedic Mattresses Excel',
        paragraphs: [
          'At Dura Flex, our orthopedic mattresses are engineered with high-resilience bonded cores enveloped in breathable jacquard quilted fabric. This ensures:',
        ],
        bulletPoints: [
          'Zero Motion Transfer: Your partner moving will never disrupt your healing spine.',
          'Multi-Zoned Lumbar Reinforcement: Heavier torso regions receive reinforced pushback.',
          '10-Year Sag-Proof Warranty: Tested to maintain structural integrity across decades of use.',
        ],
      },
    ],
    relatedProductSlug: 'dura-ortho-mattress',
    relatedProductName: 'Dura Flex Ortho Master Orthopedic Mattress',
    faqs: [
      {
        question: 'How long does it take for my back to adjust to a new orthopedic mattress?',
        answer:
          'It typically takes 2 to 3 weeks for your spinal posture and musculature to decompress and adapt to correct orthopedic alignment. That is why our 100-night trial is essential.',
      },
      {
        question: 'Can this mattress help with sciatica pain?',
        answer:
          'Yes, by relieving pressure on the sciatic nerve root around the lower lumbar and hip joints, users frequently report substantial relief within weeks.',
      },
    ],
  },
  {
    id: 'blog-3',
    slug: 'how-to-clean-and-maintain-your-mattress',
    title: 'How to Clean & Maintain Your Mattress for 10+ Years of Freshness',
    excerpt:
      'Step-by-step care guide: how to eliminate dust mites, deodorize sweat stains, rotate properly, and safeguard your mattress in Pakistan’s dusty climate.',
    coverImage: '/images/blog/mattress-care.jpg',
    category: 'Mattress Care',
    author: {
      name: 'Dura Flex Care Team',
      role: 'Quality & Maintenance Experts',
      avatar: '/images/products/cool-gel-1.jpg',
    },
    publishedAt: 'August 24, 2024',
    readTime: 5,
    tags: ['Mattress Cleaning', 'Hygiene', 'Maintenance', 'Longevity'],
    keyTakeaways: [
      'Vacuuming your mattress every 3 months removes accumulated dead skin cells and dust mites.',
      'Baking soda works wonders as a natural odor neutralizer for humid monsoon seasons.',
      'Rotate your mattress head-to-toe 180° every 6 months to ensure uniform wear.',
      'Always use a 100% waterproof breathable mattress protector to prevent liquid spills.',
    ],
    sections: [
      {
        heading: '1. The 15-Minute DIY Mattress Deep Clean',
        paragraphs: [
          'In Pakistani cities where dust and smog levels can be elevated, your mattress naturally traps microscopic allergens. Follow this simple quarterly cleaning ritual:',
        ],
        bulletPoints: [
          'Step 1 - Strip & Wash: Strip sheets, pillows, and protectors. Wash in hot water (60°C) to eliminate all dust mites.',
          'Step 2 - Vacuum thoroughly: Use the upholstery attachment to vacuum the top surface, quilt seams, and side borders.',
          'Step 3 - Baking Soda Treatment: Sprinkle 1 cup of sodium bicarbonate (baking soda) evenly across the mattress. Leave for 45 minutes to absorb sweat moisture and odors.',
          'Step 4 - Final Vacuum: Vacuum away the powder, leaving a fresh, naturally deodorized sleeping surface.',
        ],
      },
      {
        heading: '2. Spot Cleaning Spills & Stains Without Damaging Foam',
        paragraphs: [
          'Never soak a foam mattress with buckets of water or harsh bleach, as moisture trapped inside foam can cause mold growth.',
          'Instead, create a mixture of mild liquid detergent and cold water. Dip a clean microfiber cloth into the suds and gently blot the stain from outside inward. Allow it to air dry fully under a ceiling fan before remaking the bed.',
        ],
        callout:
          'Important: Direct sunlight for 1 to 2 hours is an excellent natural disinfectant, but avoid leaving memory foam in scorching 45°C sun for extended hours.',
      },
      {
        heading: '3. Rotation Schedule for Maximum Lifespan',
        paragraphs: [
          'Because we tend to sleep in the exact same spot every night, rotating your mattress by 180 degrees (swapping head and foot) every 3 to 6 months distributes body weight evenly and prevents premature depression spots.',
        ],
      },
    ],
    relatedProductSlug: 'cooling-gel-mattress',
    relatedProductName: 'Dura Flex Breathable Mattress Protector',
    faqs: [
      {
        question: 'Should I flip my Dura Flex mattress upside down?',
        answer:
          'Dura Flex mattresses feature precision progressive layers with a specific top comfort layer and bottom high-density support core. Rotate them head-to-toe, but do not flip them upside down.',
      },
    ],
  },
  {
    id: 'blog-4',
    slug: 'cooling-gel-vs-memory-foam-pakistan-summer',
    title: 'Cooling Gel vs Traditional Memory Foam: What You Need for Pakistani Summers',
    excerpt:
      'Tired of waking up drenched in sweat during hot summer nights? Here is how phase-change cooling gel technology regulates body heat compared to regular foam.',
    coverImage: '/images/products/cool-gel-1.jpg',
    category: 'Sleep Science',
    author: {
      name: 'Hamza Farooq',
      role: 'Materials & Thermal Engineer',
      avatar: '/images/products/cool-gel-1.jpg',
    },
    publishedAt: 'July 19, 2024',
    readTime: 6,
    tags: ['Cooling Gel', 'Summer Sleep', 'Thermoregulation', 'Memory Foam'],
    keyTakeaways: [
      'Traditional closed-cell memory foam traps body heat, creating uncomfortable temperature spikes.',
      'Cooling gel-infused bead memory foam absorbs and dissipates thermal energy away from your skin.',
      'Open-cell foam architecture increases airflow by up to 300% compared to legacy foam blocks.',
      'Pairs exceptionally well with air conditioning, maintaining a crisp, refreshing surface all night.',
    ],
    sections: [
      {
        heading: '1. Why Conventional Foam Gets Hot in Summer',
        paragraphs: [
          'Pakistani summers frequently cross 40°C in Punjab and Sindh with intense humidity. Memory foam is celebrated for body-contouring comfort, but standard polyurethanes have a closed-cell microstructure that restricts air circulation.',
          'As you sleep, your body naturally generates 100 watts of thermal heat. If the mattress cannot conduct this heat away, it builds up beneath your body, triggering sweating, tossing, and light sleep stages.',
        ],
      },
      {
        heading: '2. The Science of Infused Cooling Gel Beads',
        paragraphs: [
          'Dura Flex Cooling Gel mattresses integrate thousands of microscopic thermal conductive gel beads directly into the memory foam matrix. These beads perform two vital functions:',
        ],
        bulletPoints: [
          'Phase-Change Heat Absorption: Concurrently draws excess heat away from your skin contact zones.',
          'Breathable Porous Cellular Matrix: Channels fresh air horizontally through the mattress core whenever you shift positions.',
          'Silky Cooling Fabric Cover: Knitted with ice-touch yarn that stays cool to the touch without needing electricity.',
        ],
        callout:
          'Sleep Tip: Lowering skin temperature by just 1.5°C triggers the brain to release melatonin, allowing you to fall asleep 40% faster and achieve deeper REM cycles.',
      },
    ],
    relatedProductSlug: 'cooling-gel-mattress',
    relatedProductName: 'Dura Flex Arctic Cool Gel Mattress',
    faqs: [
      {
        question: 'Does the cooling gel effect wear off after a few years?',
        answer:
          'No! The cooling gel beads are molecularly integrated into the high-density foam structure and do not evaporate, degrade, or diminish over time.',
      },
    ],
  },
  {
    id: 'blog-5',
    slug: 'when-to-replace-your-mattress-signs',
    title: '7 Warning Signs It’s Time to Replace Your Old Mattress',
    excerpt:
      'Is your mattress older than 7 years? Discover the telltale signs that your bed is secretly damaging your health, mood, and daily productivity.',
    coverImage: '/images/products/dura-cloud-1.jpg',
    category: 'Buying Guides',
    author: {
      name: 'Dr. Ayesha Malik',
      role: 'Consultant Orthopedic Sleep Specialist',
      avatar: '/images/products/ortho-med-1.jpg',
    },
    publishedAt: 'June 14, 2024',
    readTime: 5,
    tags: ['Mattress Replacement', 'Sleep Health', 'Springs Sagging', 'Guide'],
    keyTakeaways: [
      'The National Sleep Foundation recommends replacing mattresses every 7 to 10 years.',
      'Visible sagging deeper than 1 inch indicates the internal core support has collapsed.',
      'Waking up feeling tired, sore, or with allergy sneezes are signs of a worn-out mattress.',
      'Upgrading to modern high-density foam delivers an immediate boost to your daily energy levels.',
    ],
    sections: [
      {
        heading: '1. Visible Sagging & The "Valley" Effect',
        paragraphs: [
          'If you take off your sheets and see an indent or hollow where your body rests, your mattress has lost its elastic recovery. Sleeping on a sagged core forces your spine to curve unnaturally, stressing back ligaments all night long.',
        ],
      },
      {
        heading: '2. Waking Up With Stiff Joints or Backache',
        paragraphs: [
          'If you go to bed feeling fine but wake up with stiff shoulders, neck cramps, or lower back pain that eases up after an hour of walking, your mattress is the culprit. A quality mattress should rejuvenate your muscles, not strain them.',
        ],
      },
      {
        heading: '3. You Sleep Significantly Better in Hotels or Other Beds',
        paragraphs: [
          'Have you ever noticed that you sleep like a baby when traveling or staying at a hotel? If sleep in another bed feels instantly superior to your own home bedroom, your current mattress is overdue for retirement.',
        ],
      },
      {
        heading: '4. Noisy Squeaks, Creaks & Motion Waves',
        paragraphs: [
          'Old innerspring coils fatigue and generate metal-on-metal squeaking whenever someone turns. Furthermore, motion transfer wakes your partner every time you move. Modern foam beds operate in 100% total silence.',
        ],
      },
    ],
    relatedProductSlug: 'dura-cloud-mattress',
    relatedProductName: 'Dura Flex Cloud Comfort Mattress',
    faqs: [
      {
        question: 'How do I dispose of my old mattress in Pakistan?',
        answer:
          'Dura Flex delivery teams in Lahore, Karachi, and Islamabad can assist with responsibly recycling or hauling away your old mattress upon delivery of your new Dura Flex.',
      },
    ],
  },
  {
    id: 'blog-6',
    slug: 'sleep-postures-spine-health-guide',
    title: 'The Best Sleep Postures for Sciatica, Neck Pain & Spine Health',
    excerpt:
      'Learn how simple adjustments with pillows and supportive mattress contouring can unlock pain-free mornings and optimal circulation.',
    coverImage: '/images/products/ortho-med-1.jpg',
    category: 'Health & Wellness',
    author: {
      name: 'Dr. Tariq Mansoor',
      role: 'Spine & Posture Consultant',
      avatar: '/images/products/ortho-med-1.jpg',
    },
    publishedAt: 'May 30, 2024',
    readTime: 6,
    tags: ['Sleep Posture', 'Sciatica', 'Ergonomics', 'Pillows'],
    keyTakeaways: [
      'Side sleeping in the fetal position with a pillow between knees relieves pressure on the sciatic nerve.',
      'Back sleeping distributes body weight most evenly and prevents facial sleep wrinkles.',
      'Stomach sleeping places high torque on cervical vertebrae and should be avoided or modified with thin pillows.',
      'An ergonomic contour pillow keeps the neck at a natural 15-degree angle.',
    ],
    sections: [
      {
        heading: '1. The Golden Position: Back Sleeping with Knee Support',
        paragraphs: [
          'Sleeping flat on your back (supine) is clinically considered the healthiest posture for neutral spine alignment. Your weight is distributed over the largest possible surface area.',
          'To optimize this posture for lower back relief, place a small cylindrical pillow or rolled towel beneath your knees. This slight knee bend reduces tension on the lumbar lordosis.',
        ],
      },
      {
        heading: '2. The Side Sleeper Technique for Sciatica Relief',
        paragraphs: [
          'Over 60% of people sleep on their side. However, when your top leg falls forward onto the mattress, it twists your pelvis and tugs on the sciatic nerve.',
          'Placing a firm memory foam pillow between your knees keeps your hips, pelvis, and spine in parallel alignment, instantly relieving pressure on your lower lumbar discs.',
        ],
        callout:
          'Dura Flex Orthopedic Memory Foam pillows are contoured specifically to support cervical spine posture whether you sleep on your back or side.',
      },
    ],
    relatedProductSlug: 'dura-ortho-mattress',
    relatedProductName: 'Dura Flex Orthopedic Mattress & Pillows',
    faqs: [
      {
        question: 'Which side is best to sleep on for acid reflux or heartburn?',
        answer:
          'Sleeping on your left side keeps the gastric junction elevated above stomach acid levels due to human anatomy, significantly reducing nighttime acid reflux and heartburn.',
      },
    ],
  },
];

export function getAllBlogs(): BlogPostItem[] {
  return BLOG_POSTS;
}

export function getBlogBySlug(slug: string): BlogPostItem | undefined {
  return BLOG_POSTS.find((b) => b.slug === slug);
}

export function getRelatedBlogs(currentSlug: string, category?: string, limit = 3): BlogPostItem[] {
  const others = BLOG_POSTS.filter((b) => b.slug !== currentSlug);
  if (category) {
    const sameCat = others.filter((b) => b.category === category);
    if (sameCat.length >= limit) return sameCat.slice(0, limit);
    return [...sameCat, ...others.filter((b) => b.category !== category)].slice(0, limit);
  }
  return others.slice(0, limit);
}

export const BLOG_CATEGORIES = [
  'All',
  'Buying Guides',
  'Health & Wellness',
  'Sleep Science',
  'Mattress Care',
] as const;
