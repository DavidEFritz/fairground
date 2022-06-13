// @ts-nocheck
import { Stats, useFBX } from '@react-three/drei'
import React, { Suspense, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { Sky, Loader, useGLTF, OrbitControls } from '@react-three/drei'
import { Physics, usePlane, Debug, useBox, useCylinder, useConvexPolyhedron, useSphere } from '@react-three/cannon'
import * as THREE from 'three'
import { Geometry, XRHandModel } from "three-stdlib";
// import Cylinder from '../objects/simpleCollisionMesh/Cylinder'
import Cylinder from '../objects/collisionMeshCalculator/CylinderCalculator'
import CylinderBoundingBox from '../objects/simpleCollisionMesh/CylinderBoundingBox'
import Sphere from '../objects/simpleCollisionMesh/Sphere'
import Cube from '../objects/simpleCollisionMesh/Cube'

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

  function MeshCalculatorTest() {
    const propsToPass = {
      url: '/cylinderShaped.glb'
    }

    const collisionMesh = Cylinder(propsToPass)
    console.log(collisionMesh)

    const [ref] = useCylinder(() => ({
      position: [collisionMesh[1].position[0], collisionMesh[1].position[1], collisionMesh[1].position[2]],
      rotation: [collisionMesh[1].rotation[0], collisionMesh[1].rotation[1], collisionMesh[1].rotation[2]],
      mass: 0.1,
      args: [collisionMesh[1].radiusTop, collisionMesh[1].radiusBottom, collisionMesh[1].height, collisionMesh[1].segments],
      allowSleep: true,
      sleepSpeedLimit: 1,
      sleepTimeLimit: 1,
      material: {
      friction: 1,
      restitution: 0,
      }
  }))

    return(
      <mesh
        key={collisionMesh[1].model.name}
        castShadow
        receiveShadow
        geometry={collisionMesh[1].model.geometry}
        rotation={[collisionMesh[1].rotation.x, collisionMesh[1].rotation.y, collisionMesh[1].rotation.z]}
        material={collisionMesh[1].model.material}
        ref={ref}
      >
      </mesh>    )
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
      <Canvas shadows={true} camera={{ position: [0, 20, 50] }} className='bg-black'>
        <OrbitControls />
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight shadow-mapSize-height={1028} shadow-mapSize-width={1028} castShadow intensity={1} position={[10, 10, 0]} />
  
        <primitive object={new THREE.AxesHelper(10)} />
        <Suspense fallback={null}>
            <Physics allowSleep={true}>
                <Ground />
                <Debug color="black" >
                  {/* <StressTest /> */}
                  <MeshCalculatorTest />
                </Debug>
            </Physics>
        </Suspense>
        <Stats />
      </Canvas>
      <Loader />
      </>
    )
  }