import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Dura Flex Pakistan',
  description: 'Read the official Dura Flex terms of service, 100-night trial guidelines, 10-year warranty policy, and delivery terms.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Last Updated: October 2026 • Dura Flex Pakistan
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            Welcome to <strong>Dura Flex</strong>. By accessing our website or purchasing our products, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h3 className="text-lg font-bold text-navy mt-6">1. 100-Night Risk-Free Sleep Trial</h3>
          <p>
            We believe you cannot properly judge a mattress in a 5-minute showroom visit. That is why every full-size Dura Flex mattress includes a 100-Night Sleep Trial:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Adjustment Period:</strong> We recommend sleeping on your new mattress for at least 21 to 30 nights. Orthopedic foam takes time to adapt to your body pressure, and your spine needs time to correct years of poor alignment.
            </li>
            <li>
              <strong>Trial Window:</strong> Returns are accepted between day 21 and day 100 following documented delivery.
            </li>
            <li>
              <strong>Condition:</strong> Returned mattresses must be free from physical tears, burns, or excessive liquid stains. Use of a mattress protector is strongly encouraged during the trial.
            </li>
            <li>
              <strong>Refund:</strong> Upon collection and inspection in major cities (Lahore, Karachi, Islamabad), 100% of your purchase price is refunded via direct bank transfer.
            </li>
          </ul>

          <h3 className="text-lg font-bold text-navy mt-6">2. 10-Year Sag-Free Warranty</h3>
          <p>
            Dura Flex mattresses are engineered with high-density medical cores that resist indentations. Our 10-Year Warranty covers:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Any visible permanent indentation or sag exceeding 2.5 cm (1 inch) not associated with an improper bed foundation.</li>
            <li>Any manufacturing defect in the cover zipper assembly or seam bonding.</li>
            <li>Warranty claims are processed with photographic verification and replaced with a brand-new mattress free of charge.</li>
          </ul>

          <h3 className="text-lg font-bold text-navy mt-6">3. Delivery & Cash on Delivery (COD)</h3>
          <p>
            Doorstep delivery is complimentary on all mattresses. Standard delivery takes 2 to 4 business days for major metropolitan areas (Karachi, Lahore, Islamabad, Rawalpindi) and 4 to 7 business days for nationwide hubs. When choosing Cash on Delivery, customers are expected to have the exact invoice total ready for courier handover.
          </p>

          <h3 className="text-lg font-bold text-navy mt-6">4. Custom Size Orders</h3>
          <p>
            Mattresses ordered in custom non-standard dimensions are handcrafted to order based on customer specifications. Please double check your inner bed frame dimensions prior to confirming custom orders.
          </p>
        </div>

      </div>
    </div>
  );
}
