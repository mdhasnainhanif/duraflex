export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What is your 100-night trial policy?',
    answer:
      'We offer a 100-night free trial on all mattresses. If you\'re not completely satisfied within 100 nights, contact us and we\'ll arrange a full refund. No questions asked.',
    category: 'Policies',
  },
  {
    id: 'faq-2',
    question: 'Do you offer Cash on Delivery?',
    answer:
      'Yes! We offer Cash on Delivery (COD) across all major cities in Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar and more.',
    category: 'Payment',
  },
  {
    id: 'faq-3',
    question: 'How long does delivery take?',
    answer:
      'For major cities (Karachi, Lahore, Islamabad), delivery typically takes 2-4 working days. For other cities, it may take 4-7 working days. We\'ll send you a tracking notification once your order is dispatched.',
    category: 'Delivery',
  },
  {
    id: 'faq-4',
    question: 'What mattress is best for back pain?',
    answer:
      'For back pain, we recommend the Dura Ortho Medical or Dura Ortho Plus. These mattresses feature our 7-zone orthopedic support system designed in consultation with medical specialists to promote spinal alignment and reduce pressure points.',
    category: 'Products',
  },
  {
    id: 'faq-5',
    question: 'What is the warranty on your mattresses?',
    answer:
      'Our premium mattresses (Dura Cloud, Dura Ortho Medical, Memory Foam, Cooling Gel, Hybrid) come with a 10-year warranty. Our foam mattresses have a 5-7 year warranty. All warranties cover manufacturing defects and sagging beyond 3cm.',
    category: 'Warranty',
  },
  {
    id: 'faq-6',
    question: 'Can I return or exchange my mattress?',
    answer:
      'Yes. We offer a 100-night trial with free returns. For exchanges (different size or model), please contact us within 30 days of delivery. The mattress must be in its original condition.',
    category: 'Returns',
  },
  {
    id: 'faq-7',
    question: 'Which mattress is best for hot sleepers?',
    answer:
      'We recommend the Dura Cool Gel 7-Zone mattress. It features cooling gel-infused memory foam and an open-cell foam structure that actively dissipates body heat. The moisture-wicking cover further enhances cooling.',
    category: 'Products',
  },
  {
    id: 'faq-8',
    question: 'How do I choose the right mattress size?',
    answer:
      'For single adults or children: Single (78×36") or Single XL (78×42"). For couples: Double (78×60") for smaller rooms, Queen (78×66") for standard rooms, King (78×72") for maximum space. We also offer custom sizes.',
    category: 'Products',
  },
  {
    id: 'faq-9',
    question: 'Is free delivery available on all orders?',
    answer:
      'Free delivery is available on all orders above Rs. 25,000. For orders below this threshold, a flat delivery fee of Rs. 500 is charged. Some remote areas may have additional charges.',
    category: 'Delivery',
  },
  {
    id: 'faq-10',
    question: 'How does the Build Your Bundle discount work?',
    answer:
      'Add 3+ items to your bundle and get 5% off. Add 5+ items for 8% off, and 7+ items for 10% off. The discount applies to the bundle items total. You can mix mattresses, pillows, and accessories.',
    category: 'Discounts',
  },
  {
    id: 'faq-11',
    question: 'Do your mattresses need a box spring?',
    answer:
      'No, our mattresses work well on any flat, supportive surface including platform beds, slatted bases, the floor, or traditional divan beds. You do not need a box spring.',
    category: 'Products',
  },
  {
    id: 'faq-12',
    question: 'How do I care for my mattress?',
    answer:
      'Rotate your mattress 180° every 3-6 months. Use a mattress protector (we sell these too). Spot-clean with mild detergent and water. Avoid machine washing. Allow to air in sunlight occasionally.',
    category: 'Care',
  },
];
