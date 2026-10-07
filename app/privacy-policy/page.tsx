import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Dura Flex Pakistan',
  description: 'Understand how Dura Flex protects and handles your personal information, delivery details, and order data in Pakistan.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Last Updated: October 2026 • Dura Flex Pakistan
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            At <strong>Dura Flex</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we take your privacy and personal data seriously. This Privacy Policy outlines what information we collect when you browse our website, place an order, or communicate with our sleep advisors via WhatsApp and phone.
          </p>

          <h3 className="text-lg font-bold text-navy mt-6">1. Information We Collect</h3>
          <p>
            When you place an order or contact us, we collect necessary shipping and contact details including:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Your full name and delivery address (house/street, city, province).</li>
            <li>Your mobile phone number for delivery dispatch and WhatsApp tracking notifications.</li>
            <li>Your email address for automated order receipts and warranty registration.</li>
            <li>Payment preference (Cash on Delivery or Bank Transfer confirmation references).</li>
          </ul>

          <h3 className="text-lg font-bold text-navy mt-6">2. How We Use Your Information</h3>
          <p>
            Your information is strictly used to fulfill and service your mattress order:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To dispatch your compressed mattress via our logistics partners across Pakistan.</li>
            <li>To manage your 100-night trial and register your 10-year sag warranty.</li>
            <li>To provide timely delivery updates and sleep support via WhatsApp or SMS.</li>
          </ul>

          <h3 className="text-lg font-bold text-navy mt-6">3. Data Sharing & Security</h3>
          <p>
            We never sell, rent, or trade your personal information with third-party advertisers. Your shipping address and contact number are shared solely with authorized courier partners (e.g. TCS, Leopards, Trax, or our private white-glove fleet) to complete physical delivery.
          </p>

          <h3 className="text-lg font-bold text-navy mt-6">4. Contact Our Data Protection Team</h3>
          <p>
            If you have questions regarding your stored data or wish to update your records, please email us at <strong>privacy@duraflex.pk</strong> or contact our customer support.
          </p>
        </div>

      </div>
    </div>
  );
}
