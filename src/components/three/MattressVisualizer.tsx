'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MattressCanvas = dynamic(
  () => import('./MattressCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] md:h-[550px] bg-slate-100/80 rounded-3xl animate-pulse flex flex-col items-center justify-center p-6 border border-slate-200">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
          <div className="w-8 h-8 rounded-full border-3 border-primary border-t-transparent animate-spin" />
        </div>
        <p className="text-slate-600 font-semibold text-sm">Loading 3D Mattress Visualizer...</p>
        <p className="text-slate-400 text-xs mt-1">Preparing multi-layer orthopedic view</p>
      </div>
    ),
  }
);

interface MattressVisualizerProps {
  className?: string;
}

export const MattressVisualizer: React.FC<MattressVisualizerProps> = ({ className }) => {
  return <MattressCanvas className={className} />;
};

export default MattressVisualizer;
