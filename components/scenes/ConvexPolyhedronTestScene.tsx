// @ts-nocheck
import * as THREE from "three";
import { Stats } from '@react-three/drei'
import React, { Suspense, useMemo } from "react";
import { Canvas } from '@react-three/fiber'
import { Sky, Loader, useGLTF } from '@react-three/drei'
import { Physics, usePlane, useConvexPolyhedron } from '@react-three/cannon'
import { Geometry } from "three-stdlib";

/**
 * Returns legacy geometry vertices, faces for ConvP
 * @param {THREE.BufferGeometry} bufferGeometry
 */

 function toConvexProps(bufferGeometry) {
    const geo = new Geometry().fromBufferGeometry(bufferGeometry);
    // Merge duplicate vertices resulting from glTF export.
    // Cannon assumes contiguous, closed meshes to work
    geo.mergeVertices();
    return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []]; // prettier-ignore
  }

  function Banana(props) {
    const diamond = useGLTF("/diamond.glb")
    const geo = useMemo(() => toConvexProps(diamond.nodes.Cylinder.geometry), [diamond.nodes]);
    const [ref] = useConvexPolyhedron(() => ({ mass: 100, ...props, args: geo }));
  
    return (
      <mesh
        castShadow
        receiveShadow
        ref={ref}
        geometry={diamond.nodes.Cylinder.geometry}
        {...props}
      >
        <meshNormalMaterial />
      </mesh>
    );
  }

function Ground() {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }))
  
    return (
      <mesh ref={ref}>
        <planeBufferGeometry args={[100, 100, 100, 100]} />
        <meshBasicMaterial color='grey' wireframe />
      </mesh>
    )
  }
  
  export default function FpvExample() {
    return (
      <>
      <Canvas camera={{ position: [0, 5, 10] }} className='bg-black'>
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
  
        <Suspense fallback={null}>
            <Physics gravity={[0, -30, 0]}>
            <Ground />
            <Banana position={[1, 10, 0]} rotation={[0.4, 0.1, 0.1]} />
            <Banana position={[2, 8, 0]} rotation={[1, 0.1, 0.1]} />
            <Banana position={[1, 15, 0]} rotation={[1, 0.1, 0.1]} />
            <Banana position={[1, 20, 0]} rotation={[1, 0.1, 0.1]} />
            </Physics>
        </Suspense>
        <Stats />
      </Canvas>
      <Loader />
      </>
    )
  }