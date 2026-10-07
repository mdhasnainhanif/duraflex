import { HeroSection } from '@/components/home/HeroSection';
import { BestSellersSection } from '@/components/home/BestSellersSection';
import { LayerExplodedSection } from '@/components/home/LayerExplodedSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { HomeFaqSection } from '@/components/home/HomeFaqSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Clean, High-Contrast Hero */}
      <HeroSection />

      {/* 2. Top-Selling Mattresses with Quick Buy */}
      <BestSellersSection />

      {/* 3. Interactive 3D Anatomy Visualizer */}
      <LayerExplodedSection />

      {/* 4. Real Customer Reviews from Pakistan */}
      <TestimonialsSection />

      {/* 5. Frequently Asked Questions */}
      <HomeFaqSection />
    </div>
  );
}
