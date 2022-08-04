// @ts-nocheck
import { Stats } from '@react-three/drei'
import React, { Suspense, useMemo } from "react";
import { Canvas } from '@react-three/fiber'
import { Sky, Loader, useGLTF, OrbitControls } from '@react-three/drei'
import { Physics, usePlane, useConvexPolyhedron, Debug } from '@react-three/cannon'
import { Geometry } from "three-stdlib";

 function toConvexProps(bufferGeometry) {
    const geo = new Geometry().fromBufferGeometry(bufferGeometry);
    geo.mergeVertices();
    return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []];
  }

  function Diamond(props) {
    const diamond = useGLTF("/diamond.glb")
    console.log(diamond)
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
  
  export default function ConvexPolyhedronTest() {
    return (
      <>
      <Canvas camera={{ position: [0, 5, 10] }} className='bg-black'>
        <OrbitControls />
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
  
        <Suspense fallback={null}>
            <Physics gravity={[0, -30, 0]}>
                <Ground />
                <Debug color="black">
                    <Diamond position={[1, 10, 0]} rotation={[0.4, 0.1, 0.1]} />
                    <Diamond position={[2, 8, 0]} rotation={[1, 0.1, 0.1]} />
                    <Diamond position={[1, 15, 0]} rotation={[1, 0.1, 0.1]} />
                    <Diamond position={[1, 20, 0]} rotation={[1, 0.1, 0.1]} />
                </Debug>
            </Physics>
        </Suspense>
        <Stats />
      </Canvas>
      <Loader />
      </>
    )
  }