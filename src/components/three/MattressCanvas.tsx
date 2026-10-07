'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface MattressModelProps {
  exploded: boolean;
  coverColor: string;
}

const LAYER_COLORS = {
  cover: '#F8FAFC',
  gelFoam: '#38BDF8',
  transitionFoam: '#A78BFA',
  supportCore: '#475569',
  base: '#1E293B',
};

function ExplodedMattress({ exploded, coverColor }: MattressModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Smooth lerping positions for exploded view
  const coverY = useRef(0.5);
  const gelY = useRef(0.25);
  const transitionY = useRef(0);
  const coreY = useRef(-0.25);
  const baseY = useRef(-0.5);

  const coverMesh = useRef<THREE.Mesh>(null);
  const gelMesh = useRef<THREE.Mesh>(null);
  const transMesh = useRef<THREE.Mesh>(null);
  const coreMesh = useRef<THREE.Mesh>(null);
  const baseMesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    // Target positions
    const targetCover = exploded ? 1.4 : 0.42;
    const targetGel = exploded ? 0.7 : 0.22;
    const targetTrans = exploded ? 0.0 : 0.02;
    const targetCore = exploded ? -0.7 : -0.22;
    const targetBase = exploded ? -1.3 : -0.42;

    const lerpSpeed = Math.min(delta * 5, 1);

    coverY.current = THREE.MathUtils.lerp(coverY.current, targetCover, lerpSpeed);
    gelY.current = THREE.MathUtils.lerp(gelY.current, targetGel, lerpSpeed);
    transitionY.current = THREE.MathUtils.lerp(transitionY.current, targetTrans, lerpSpeed);
    coreY.current = THREE.MathUtils.lerp(coreY.current, targetCore, lerpSpeed);
    baseY.current = THREE.MathUtils.lerp(baseY.current, targetBase, lerpSpeed);

    if (coverMesh.current) coverMesh.current.position.y = coverY.current;
    if (gelMesh.current) gelMesh.current.position.y = gelY.current;
    if (transMesh.current) transMesh.current.position.y = transitionY.current;
    if (coreMesh.current) coreMesh.current.position.y = coreY.current;
    if (baseMesh.current) baseMesh.current.position.y = baseY.current;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.2, -0.4, 0]}>
      {/* LAYER 1: Quilted Breathable Top Cover */}
      <mesh ref={coverMesh} position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.16, 4.4]} />
        <meshStandardMaterial
          color={coverColor}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* LAYER 2: Cooling Gel-Infused Memory Foam */}
      <mesh ref={gelMesh} position={[0, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.15, 0.2, 4.35]} />
        <meshStandardMaterial
          color={LAYER_COLORS.gelFoam}
          roughness={0.4}
          metalness={0.1}
          opacity={0.92}
          transparent
        />
      </mesh>

      {/* LAYER 3: Dynamic Pressure Relief Transition Foam */}
      <mesh ref={transMesh} position={[0, 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.15, 0.22, 4.35]} />
        <meshStandardMaterial
          color={LAYER_COLORS.transitionFoam}
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* LAYER 4: Orthopedic 7-Zone Pocket Coil & Support Core */}
      <mesh ref={coreMesh} position={[0, -0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.15, 0.38, 4.35]} />
        <meshStandardMaterial
          color={LAYER_COLORS.supportCore}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* LAYER 5: High-Density Non-Slip Base Foundation */}
      <mesh ref={baseMesh} position={[0, -0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.18, 4.4]} />
        <meshStandardMaterial
          color={LAYER_COLORS.base}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* When exploded, show layer labels in 3D */}
      {exploded && (
        <>
          <group position={[2.1, 1.4, 0]}>
            <Text fontSize={0.18} color="#0F172A" anchorX="left" anchorY="middle">
              1. Breathable TENCEL™ Quilted Cover
            </Text>
          </group>
          <group position={[2.1, 0.7, 0]}>
            <Text fontSize={0.18} color="#0284C7" anchorX="left" anchorY="middle">
              2. 45D Cooling Gel Memory Foam
            </Text>
          </group>
          <group position={[2.1, 0.0, 0]}>
            <Text fontSize={0.18} color="#7C3AED" anchorX="left" anchorY="middle">
              3. Ergonomic Spinal Transition Layer
            </Text>
          </group>
          <group position={[2.1, -0.7, 0]}>
            <Text fontSize={0.18} color="#334155" anchorX="left" anchorY="middle">
              4. 7-Zone Orthopedic Core Support
            </Text>
          </group>
          <group position={[2.1, -1.3, 0]}>
            <Text fontSize={0.18} color="#1E293B" anchorX="left" anchorY="middle">
              5. High-Density Dura-Base Foundation
            </Text>
          </group>
        </>
      )}
    </group>
  );
}

export interface MattressSceneProps {
  className?: string;
}

export const MattressCanvas: React.FC<MattressSceneProps> = ({ className }) => {
  const [exploded, setExploded] = useState(false);
  const [color, setColor] = useState('#F8FAFC');

  const colorOptions = [
    { label: 'Cloud White', value: '#F8FAFC', bg: 'bg-slate-100' },
    { label: 'Charcoal Grey', value: '#334155', bg: 'bg-slate-700' },
    { label: 'Indigo Blue', value: '#312E81', bg: 'bg-indigo-900' },
  ];

  return (
    <div className={`relative w-full h-[450px] md:h-[550px] bg-gradient-to-b from-slate-50 to-indigo-50/40 rounded-3xl overflow-hidden border border-slate-200/80 shadow-inner ${className || ''}`}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [5.5, 3.2, 5.5], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[6, 8, 5]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 3, -3]} intensity={0.6} color="#60A5FA" />
        <pointLight position={[0, -3, 2]} intensity={0.4} color="#A78BFA" />

        <ExplodedMattress exploded={exploded} coverColor={color} />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={4}
          maxDistance={10}
          autoRotate={!exploded}
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* Floating Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-slate-200/80 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-800 tracking-wide uppercase">
            Interactive 3D Cutaway
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-slate-200/80">
          <button
            type="button"
            onClick={() => setExploded((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              exploded
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {exploded ? 'Collapse Layers' : 'Explode 5 Layers'}
          </button>
        </div>
      </div>

      {/* Bottom Color & Hint Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Fabric Color Swatches */}
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl shadow-sm border border-slate-200/80 flex items-center gap-2">
          <span className="text-xs font-medium text-slate-600 mr-1">Fabric:</span>
          {colorOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setColor(opt.value)}
              title={opt.label}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${opt.bg} ${
                color === opt.value
                  ? 'border-primary scale-110 shadow-sm ring-2 ring-primary/20'
                  : 'border-slate-300 hover:scale-105'
              }`}
            />
          ))}
        </div>

        {/* Drag Hint */}
        <div className="pointer-events-auto bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] text-slate-500 font-medium">
          Drag to rotate • Scroll to zoom
        </div>
      </div>
    </div>
  );
};

export default MattressCanvas;
