'use client';

import React, { useState } from 'react';
import {
  Phone,
  Envelope,
  MapPin,
  Clock,
  WhatsappLogo,
  Sparkle,
  PaperPlaneTilt,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';
import { toast } from 'sonner';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Karachi',
    subject: 'General Question',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitted(true);
    toast.success('Thank you! Our sleep advisor will contact you within 2 business hours.');
  };

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkle weight="fill" />
            <span>We&apos;re Here to Help You Sleep Better</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
            Contact Dura Flex Sleep Specialists
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Have questions about dimensions, firmness, the 100-night trial, or shipping to your city? Reach out to our customer care team anytime.
          </p>
        </div>

        {/* Contact Layout: Contact Details Column + Form Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Direct Contact Channels & Showrooms */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Priority Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <WhatsappLogo weight="fill" size={28} />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">Instant WhatsApp Support</h3>
                  <p className="text-xs text-white/80">Average response time: &lt; 5 minutes</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                Chat directly with our Karachi-based sleep advisors for custom sizing recommendations, order tracking, and mattress comparisons.
              </p>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Dura Flex team, I have a question regarding your mattresses.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-emerald-700 font-bold text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-colors"
              >
                <WhatsappLogo weight="fill" size={18} />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Support Details Cards */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Phone weight="fill" className="text-primary text-xl flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Phone Support Hotline</h4>
                  <p className="text-slate-600 mt-0.5">{SITE_CONFIG.phone}</p>
                  <p className="text-slate-400 text-xs">Mon – Sat: 9:00 AM – 9:00 PM PST</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200/60">
                <Envelope weight="fill" className="text-primary text-xl flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Email Inquiries</h4>
                  <p className="text-slate-600 mt-0.5">{SITE_CONFIG.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200/60">
                <MapPin weight="fill" className="text-primary text-xl flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Store & Experience Studio</h4>
                  <p className="text-slate-600 mt-1">
                    <strong>Main Location:</strong> Ayesha Manzil, Karachi, Pakistan<br />
                    <strong>Display Center:</strong> Near Ayesha Manzil, F.B Area, Karachi<br />
                    <strong>Nationwide Delivery:</strong> Free doorstep delivery across all cities in Pakistan
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3 className="text-2xl font-extrabold text-navy">Message Received!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for reaching out, {formData.name}. Our sleep support team has received your message and will get back to you promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-extrabold text-navy border-b border-slate-100 pb-3">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Asad Khan"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0313-2183210"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. asad@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Inquiry Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    >
                      <option value="General Question">General Inquiry</option>
                      <option value="Mattress Recommendation">Mattress Recommendation</option>
                      <option value="100-Night Trial & Warranty">100-Night Trial & Warranty</option>
                      <option value="Custom Bed Dimensions">Custom Bed Dimensions</option>
                      <option value="Bulk / Hotel Orders">Bulk / Commercial Orders</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your sleep preferences, bed frame dimensions, or any specific questions..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full gap-2 shadow-lg shadow-primary/20">
                  <PaperPlaneTilt weight="bold" />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
