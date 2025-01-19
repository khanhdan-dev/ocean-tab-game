'use client';

import React, { ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import { Environment, OrbitControls } from '@react-three/drei';

interface Props {
  children: ReactNode;
  className?: string;
}

function RenderModel({ children, className }: Props) {
  return (
    <Canvas className={clsx('relative h-screen w-screen', className)}>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>{children}</Suspense>
      <Environment preset="city" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

export default RenderModel;
