'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkle,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  WhatsappLogo,
  ArrowClockwise,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';
import { products } from '@/data/products';

interface QuizAnswers {
  position: string;
  firmness: string;
  concern: string;
  size: string;
}

const POSITIONS = [
  { id: 'side', title: 'Side Sleeper', desc: 'Needs pressure relief on hips and shoulders' },
  { id: 'back', title: 'Back Sleeper', desc: 'Needs targeted lumbar spine contouring' },
  { id: 'stomach', title: 'Stomach Sleeper', desc: 'Needs firmer support to prevent spine hyperextension' },
  { id: 'combo', title: 'Combination / Moves Often', desc: 'Needs responsive surface with easy turning' },
];

const FIRMNESS = [
  { id: 'soft', title: 'Plush & Cloud-Like (3-4/10)', desc: 'Sink-in luxury with deep gentle cradling' },
  { id: 'medium', title: 'Medium Balanced (5-6/10)', desc: 'The sweet spot of contouring & body support' },
  { id: 'medium-firm', title: 'Medium-Firm (7-8/10)', desc: 'Doctor-recommended for active spinal alignment' },
  { id: 'firm', title: 'Firm Orthopedic (8-9/10)', desc: 'Maximum solid support with minimal give' },
];

const CONCERNS = [
  { id: 'back-pain', title: 'Chronic Back or Neck Pain', desc: 'Require medical-grade posture alignment' },
  { id: 'hot-sleeper', title: 'Sleep Hot / Night Sweats', desc: 'Require cooling gel & breathable fabric' },
  { id: 'partner', title: 'Partner Disturbance', desc: 'Require zero motion transfer memory foam' },
  { id: 'pregnancy', title: 'Pregnancy or Joint Ache', desc: 'Require ergonomic pressure alleviation' },
];

const SIZES = [
  { id: 'single', title: 'Single (78" x 39" / 42")', desc: 'Ideal for kids, teens, or single adults' },
  { id: 'queen', title: 'Queen (78" x 66")', desc: 'Popular for master bedrooms and cozy couples' },
  { id: 'king', title: 'King (78" x 72")', desc: 'Most popular Pakistani master bedroom standard' },
  { id: 'super-king', title: 'Super King (84" x 78")', desc: 'Ultimate spacious luxury for families' },
];

export const SleepQuiz: React.FC = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    position: '',
    firmness: '',
    concern: '',
    size: '',
  });

  const handleSelect = (key: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      setStep(5); // results
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ position: '', firmness: '', concern: '', size: '' });
  };

  // Recommendation engine
  const getRecommendation = () => {
    if (answers.concern === 'back-pain' || answers.firmness === 'firm' || answers.firmness === 'medium-firm') {
      return (
        products.find((p) => p.slug === 'dura-ortho-pro') ||
        products.find((p) => p.category === 'dura-ortho') ||
        products[0]
      );
    }
    if (answers.concern === 'hot-sleeper') {
      return (
        products.find((p) => p.slug === 'dura-cool-gel-pro') ||
        products.find((p) => p.category === 'cooling-gel') ||
        products[0]
      );
    }
    if (answers.concern === 'pregnancy') {
      return (
        products.find((p) => p.category === 'dura-mom') ||
        products.find((p) => p.slug === 'dura-cloud-plush') ||
        products[0]
      );
    }
    if (answers.firmness === 'soft' || answers.position === 'side') {
      return (
        products.find((p) => p.slug === 'dura-cloud-plush') ||
        products.find((p) => p.category === 'dura-cloud') ||
        products[0]
      );
    }
    return products[0];
  };

  const matchedProduct = getRecommendation();

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-indigo-50/30 to-white" id="sleep-quiz">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkle weight="fill" />
            <span>Interactive Mattress Finder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Find Your Ideal Mattress in 60 Seconds
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Answer 4 simple questions and our sleep algorithm will calculate your ideal firmness, core structure, and size.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
          
          {/* Progress Bar (steps 1-4) */}
          {step <= 4 && (
            <div className="w-full bg-slate-100 h-2">
              <div
                className="bg-primary h-2 transition-all duration-500 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          )}

          <div className="p-6 sm:p-10">
            {/* STEP 1: Sleeping Position */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Question 1 of 4</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  What is your primary sleeping position?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {POSITIONS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelect('position', p.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all ${
                        answers.position === p.id
                          ? 'border-primary bg-primary-light shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <h4 className="font-bold text-slate-800 text-base">{p.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Firmness */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <ArrowLeft /> Back
                  </button>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Question 2 of 4</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  How firm do you like your mattress to feel?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {FIRMNESS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleSelect('firmness', f.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all ${
                        answers.firmness === f.id
                          ? 'border-primary bg-primary-light shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <h4 className="font-bold text-slate-800 text-base">{f.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Concern */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <ArrowLeft /> Back
                  </button>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Question 3 of 4</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  What is your biggest sleep health priority?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {CONCERNS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelect('concern', c.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all ${
                        answers.concern === c.id
                          ? 'border-primary bg-primary-light shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <h4 className="font-bold text-slate-800 text-base">{c.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{c.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Size */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <ArrowLeft /> Back
                  </button>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Question 4 of 4</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  What mattress size does your bed frame need?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSelect('size', s.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all ${
                        answers.size === s.id
                          ? 'border-primary bg-primary-light shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <h4 className="font-bold text-slate-800 text-base">{s.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: RESULTS SCREEN */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <CheckCircle weight="fill" size={16} />
                    <span>98% Sleep Match Identified</span>
                  </div>
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
                  >
                    <ArrowClockwise size={14} /> Retake Quiz
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-sm">
                    <Image
                      src={matchedProduct.images[0]?.src || '/images/categories/ortho.jpg'}
                      alt={matchedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Recommended For Your Profile
                    </span>
                    <h3 className="text-2xl font-extrabold text-navy leading-tight">
                      {matchedProduct.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {matchedProduct.shortDescription || matchedProduct.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700">
                        Firmness: {matchedProduct.firmness || 'Medium-Firm'}
                      </span>
                      <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700">
                        10-Year Warranty
                      </span>
                      <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700">
                        100 Nights Trial
                      </span>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <Link href={`/products/${matchedProduct.slug}`}>
                        <Button size="md" className="gap-2">
                          <span>View Matching Mattress</span>
                          <ArrowRight weight="bold" />
                        </Button>
                      </Link>

                      <a
                        href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                          `Hi Dura Flex, I took the Sleep Quiz and got matched with ${matchedProduct.name}. I'd like to ask a few questions before ordering.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
                      >
                        <WhatsappLogo weight="fill" size={18} />
                        <span>Confirm with Doctor on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
