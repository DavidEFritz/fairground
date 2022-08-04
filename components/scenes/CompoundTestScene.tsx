// @ts-nocheck
import { Stats } from '@react-three/drei'
import React, { Suspense } from "react";
import { Canvas } from '@react-three/fiber'
import { Sky, Loader, OrbitControls } from '@react-three/drei'
import { Physics, usePlane, useCompoundBody, Debug } from '@react-three/cannon'
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
  
  function Column() {
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
      position: [data.mesh[0].position.x, data.mesh[0].position.y, data.mesh[0].position.z],
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
          rotation={[data.mesh[0].rotation.x, data.mesh[0].rotation.y, data.mesh[0].rotation.z]}
        >

        </mesh>
        <mesh

          key={(data.mesh[0].children[1].name)}
          castShadow
          receiveShadow
          geometry={data.mesh[0].children[1].geometry}
          material={data.mesh[0].children[1].material}
          position={[data.mesh[0].position.x, data.mesh[0].position.y, data.mesh[0].position.z]}
          rotation={[data.mesh[0].rotation.x, data.mesh[0].rotation.y, data.mesh[0].rotation.z]}
        >
        </mesh>
      </group>
    )
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
                  <Column />
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