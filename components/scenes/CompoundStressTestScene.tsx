// @ts-nocheck
import { Stats, useFBX } from '@react-three/drei'
import React, { Suspense, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { Sky, Loader, useGLTF, OrbitControls, PointerLockControls } from '@react-three/drei'
import { Physics, usePlane, useCompoundBody, Debug, useBox, useCylinder, useConvexPolyhedron, useSphere } from '@react-three/cannon'
import * as THREE from 'three'
import { Geometry, XRHandModel } from "three-stdlib";
// import Cylinder from '../objects/simpleCollisionMesh/Cylinder'
import Cylinder from '../objects/simpleCollisionMesh/Cylinder'
import CylinderBoundingBox from '../objects/simpleCollisionMesh/CylinderBoundingBox'
import Sphere from '../objects/simpleCollisionMesh/Sphere'
import Cube from '../objects/simpleCollisionMesh/Cube'
import Compound from '../objects/compoundCollisionMesh/Compound'
import {Player} from '../objects/game/Player'

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
    console.time('test')
    const objectNumber = 20
    const objectsArray = []
    for (let i = 0; i < objectNumber; i++) {
      objectsArray.push({position: [Math.random() * 5 - 5, Math.random() * 5 + 5, Math.random() * 5 - 5], rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI], url: '/monkey.glb'})
    }
    const objects = objectsArray.map((object, index) => {
      let data = Compound('/column.glb')
      console.log(data)
  
      const [ref] = useCompoundBody(() => ({
        mass: 1,
        allowSleep: true,
        sleepSpeedLimit: 0.1,
        sleepTimeLimit: 1,
        material: {
            friction: 1,
            restitution: 0,
        },
        shapes: data.collisionMeshes,
        position: object.position,
      }))
  
      return (
        <group ref={ref}>
          <mesh
  
            key={(data.mesh[0].children[0].name)}
            castShadow
            receiveShadow
            geometry={data.mesh[0].children[0].geometry}
            material={data.mesh[0].children[0].material}
            position={[data.mesh[0].position.x, data.mesh[0].position.y, data.mesh[0].position.z]}
          >
  
          </mesh>
          <mesh
  
            key={(data.mesh[0].children[1].name)}
            castShadow
            receiveShadow
            geometry={data.mesh[0].children[1].geometry}
            material={data.mesh[0].children[1].material}
            position={[data.mesh[0].position.x, data.mesh[0].position.y, data.mesh[0].position.z]}
          >
          </mesh>
        </group>
      )
    })
    console.timeEnd('test')
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
  
        <Suspense fallback={null}>
            <Physics gravity={[0, -9, 0]} allowSleep={true}>
                <Ground />
                <Debug color="black" >
                  <StressTest />
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