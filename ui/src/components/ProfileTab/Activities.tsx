'use client';
'use cache';
import React, { Ref, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import {
  Euler,
  ExtendedColors,
  Layers,
  Matrix4,
  NodeProps,
  NonFunctionKeys,
  Overwrite,
  Quaternion,
  useFrame,
  Vector3,
} from '@react-three/fiber';
import {
  BufferGeometry,
  Group,
  Object3DEventMap,
  NormalBufferAttributes,
} from 'three';
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';

export function Activities(
  props: React.JSX.IntrinsicAttributes &
    Omit<
      ExtendedColors<
        Overwrite<
          Partial<Group<Object3DEventMap>>,
          NodeProps<Group<Object3DEventMap>, typeof Group>
        >
      >,
      NonFunctionKeys<{
        position?: Vector3;
        up?: Vector3;
        scale?: Vector3;
        rotation?: Euler;
        matrix?: Matrix4;
        quaternion?: Quaternion;
        layers?: Layers;
        dispose?: (() => void) | null;
      }>
    > & {
      position?: Vector3;
      up?: Vector3;
      scale?: Vector3;
      rotation?: Euler;
      matrix?: Matrix4;
      quaternion?: Quaternion;
      layers?: Layers;
      dispose?: (() => void) | null;
    } & EventHandlers,
) {
  const { nodes, materials } = useGLTF('/models/activities.glb');
  const modelRef = useRef<Group<Object3DEventMap>>();

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.position.y =
        -0.1 + Math.sin(state.clock.elapsedTime) * 0.4;
    }
  });

  return (
    <group
      {...props}
      ref={modelRef as Ref<Group<Object3DEventMap>>}
      position={[0, 0, 0]}
      scale={[0.25, 0.25, 0.25]}
      rotation={[0, 0, 0]}
      dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.133}>
        <mesh
          castShadow
          receiveShadow
          geometry={
            (
              nodes.pSphere21_lambert1_0 as unknown as {
                geometry: BufferGeometry<NormalBufferAttributes>;
              }
            )?.geometry
          }
          material={materials.lambert1}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/models/activities.glb');
