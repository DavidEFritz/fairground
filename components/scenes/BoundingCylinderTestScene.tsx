// @ts-nocheck
import { Stats, useFBX } from '@react-three/drei'
import React, { Suspense, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { Sky, Loader, useGLTF, OrbitControls, PointerLockControls } from '@react-three/drei'
import { Physics, usePlane, useCompoundBody, Debug, useBox, useCylinder, useConvexPolyhedron, useSphere } from '@react-three/cannon'
import * as THREE from 'three'
import { Geometry, XRHandModel } from "three-stdlib";
import Cylinder from '../objects/simpleCollisionMesh/Cylinder'
import CylinderBoundingBox from '../objects/simpleCollisionMesh/CylinderBoundingBox'
import Sphere from '../objects/simpleCollisionMesh/Sphere'
import Cube from '../objects/simpleCollisionMesh/Cube'
import Compound from '../objects/compoundCollisionMesh/Compound'
import {Player} from '../objects/game/Player'
import CubeBoundingBox from '../objects/simpleCollisionMesh/CubeBoundingBox';

function Ground() {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }))
  
    return (
      <mesh 
        ref={ref}
        receiveShadow
      >
        <planeGeometry args={[100, 100, 100, 100]} />
        <meshStandardMaterial color='grey' />
      </mesh>
    )
  }

  function StressTest() {
    const objectNumber = 20
    const objectsArray = []
    for (let i = 0; i < objectNumber; i++) {
      objectsArray.push({position: [Math.random() * 20 - 10, Math.random() * 20 + 5, Math.random() * 20 - 10], rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI], url: '/cylinderShaped.fbx'})
    }
    const objects = objectsArray.map((object, index) => {
      return(
      <Cylinder key={index} mass={0.1} position={object.position} rotation={object.rotation} url={object.url} />
      )
    })
    return(objects)
  }

  export default function CubeTest() {
    return (
      <>
      <Canvas shadows={true} camera={{ position: [0, 2, 20] }} className='bg-black'>
        <OrbitControls />
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight shadow-mapSize-height={1028} shadow-mapSize-width={1028} castShadow intensity={1} position={[10, 10, 0]} />
        <axesHelper />
  
        <Suspense fallback={null}>
            <Physics gravity={[0, -9, 0]} allowSleep={true}>
                <Ground />
                <Debug color="black" >
                  {/* <StressTest /> */}
                <CylinderBoundingBox mass={1} segments={20} url={'/cylinder.glb'}/>
                {/* <CylinderBoundingBox mass={1} segments={20} url={'/cylinderShaped.glb'}/> */}
                </Debug>
                <Player />
            </Physics>
        </Suspense>
        <Stats />
      </Canvas>
      <Loader />
      </>
    )
  }