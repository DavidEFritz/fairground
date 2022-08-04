// @ts-nocheck
import { Stats } from '@react-three/drei'
import React, { Suspense } from "react";
import { Canvas } from '@react-three/fiber'
import { Sky, Loader, PointerLockControls } from '@react-three/drei'
import { Physics, usePlane, useCompoundBody, Debug } from '@react-three/cannon'
import {Player} from '../objects/game/Player'
import Compound from '../objects/compoundCollisionMesh/Compound'


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
    let data = Compound('/pin.glb')
    console.log(data)

    const positions = [
      [0, 0, 0],
      [1.5, 0, -1.5],
      [3, 0, -3],
      [4.5, 0, -4.5],
      [-1.5, 0, -1.5],
      [-3, 0, -3],
      [-4.5, 0, -4.5],
      [0, 0, -3],
      [1.5, 0, -4.5],
      [-1.5, 0, -4.5] 

    ]
    let object = null

    object = positions.map((i) => {
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
        position: i
      }))

      return (
        <group key={i} ref={ref}>
          <mesh
  
            key={(data.mesh[0].children[0].name)}
            castShadow
            receiveShadow
            geometry={data.mesh[0].children[0].geometry}
            material={data.mesh[0].children[0].material}
            position={[0, 2, 0]}
          >
  
          </mesh>
          <mesh
  
            key={(data.mesh[0].children[1].name)}
            castShadow
            receiveShadow
            geometry={data.mesh[0].children[1].geometry}
            material={data.mesh[0].children[1].material}
            position={[0, 2, 0]}
          >
          </mesh>
        </group>
  
      )
    })
    console.log(object)
    return object
  }

  export default function CubeTest() {
    return (
      <>
      <Canvas shadows={true} camera={{ position: [0, 5, 30] }} className='bg-black'>
        <PointerLockControls />
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight shadow-mapSize-height={1028} shadow-mapSize-width={1028} castShadow intensity={1} position={[10, 10, 0]} />
  
        <Suspense fallback={null}>
            <Physics gravity={[0, -9, 0]} allowSleep={true}>
                <Ground />
                <Debug color="black" >
                  <Column />
                </Debug>
                <Player ballSize={1} velocity={50} mass={100} />
            </Physics>
        </Suspense>
        <Stats />
      </Canvas>
      <Loader />
      </>
    )
  }