'use client';

import React, { useState } from 'react';
import { MattressVisualizer } from '@/components/three/MattressVisualizer';
import { Sparkle, CheckCircle, ShieldCheck, Thermometer, Wind, ArrowsClockwise } from '@phosphor-icons/react';

const LAYERS_INFO = [
  {
    id: 1,
    name: '1. Breathable TENCEL™ Quilted Jacquard Cover',
    tag: 'Surface Comfort',
    icon: Wind,
    description:
      'Ultra-soft natural botanic eucalyptus fibers with antibacterial antimicrobial silver ions. Provides instant cooling to the touch, absorbs 50% more moisture than cotton, and is completely removable & washable.',
    metrics: ['Hypoallergenic', 'Removable Zipper Cover', 'Anti-Dust Mite'],
  },
  {
    id: 2,
    name: '2. 45D Cryo-Gel Infused Memory Foam',
    tag: 'Cooling & Pressure Relief',
    icon: Thermometer,
    description:
      'Engineered specifically for Pakistan’s climate. Millions of open micro-gel capsules absorb excess body warmth and disperse it away, keeping the sleeping surface up to 4°C cooler throughout humid nights.',
    metrics: ['Zero Heat Retention', 'Deep Contouring', 'Immediate Response'],
  },
  {
    id: 3,
    name: '3. High-Resilience Dynamic Transition Layer',
    tag: 'Ergonomic Support',
    icon: ArrowsClockwise,
    description:
      'Eliminates the "quicksand / trapped" feeling of cheap memory foam mattresses. Gently eases the transition from soft cushioning to the deep spinal support core, allowing effortless turning and movement.',
    metrics: ['Targeted Lumbar Pushback', 'Smooth Movement', 'Even Distribution'],
  },
  {
    id: 4,
    name: '4. 7-Zone Orthopedic High-Density Core',
    tag: 'Medical Spine Alignment',
    icon: ShieldCheck,
    description:
      'Provides varied support across 7 anatomical zones: softer for shoulders and feet, firmer under the pelvis and lumbar spine. Keeps your vertebrae aligned in a neutral anatomical curve all night long.',
    metrics: ['Doctor Recommended', 'Zero Sagging', 'Zero Motion Transfer'],
  },
  {
    id: 5,
    name: '5. High-Density Anti-Slip Dura-Base',
    tag: 'Structural Durability',
    icon: CheckCircle,
    description:
      'Toughened high-density cellular base foam with micro-grip silicone nodules on the bottom. Prevents mattress slippage on wooden slats, divan bases, or platform beds while extending life up to 15 years.',
    metrics: ['10-Year Sag Warranty', 'Reinforced Edges', 'Reinforced Base'],
  },
];

export const LayerExplodedSection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkle weight="fill" />
            <span>Patented 5-Layer Construction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            The Science Inside Every Dura Flex Mattress
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Explore our multi-layer orthopedic engineering. Tap &apos;Explode 5 Layers&apos; on the 3D model below to inspect the anatomical sleep technology layer by layer.
          </p>
        </div>

        {/* 3D Visualizer & Layer Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* 3D Canvas Column */}
          <div className="lg:col-span-7">
            <MattressVisualizer />
          </div>

          {/* Interactive Layer Breakdown List */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select a layer to examine details:
            </p>

            {LAYERS_INFO.map((layer, index) => {
              const isSelected = activeLayer === index;
              const Icon = layer.icon;

              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(index)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-50 border-primary shadow-md ring-1 ring-primary/30'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-[#F8F9FD]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon weight="fill" size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {layer.name}
                        </h4>
                        <span className="text-[11px] font-semibold text-primary">
                          {layer.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 animate-in fade-in duration-300">
                      <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                        {layer.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {layer.metrics.map((m) => (
                          <span
                            key={m}
                            className="text-[10px] font-bold bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700"
                          >
                            ✓ {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
