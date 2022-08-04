// @ts-nocheck
import { Stats } from '@react-three/drei'
import React, { Suspense } from "react";
import { Canvas } from '@react-three/fiber'
import { Sky, Loader, OrbitControls } from '@react-three/drei'
import { Physics, usePlane, Debug, useSphere } from '@react-three/cannon'
import Sphere from '../objects/simpleCollisionMesh/Sphere'
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

  function Ball() {
    let data = Sphere('/sphere.glb')
    console.log(data)



    const [ref] = useSphere(() => ({
      args: data.collisionMeshes[0].args,
      mass: 0.2,
      allowSleep: true,
      sleepSpeedLimit: 0.1,
      sleepTimeLimit: 1,
      material: {
          friction: 1,
          restitution: 0,
      },
      position: [0, 4, 0]
    }))

    return (
        <mesh
          ref={ref}
          key={(data.collisionMeshes[0].mesh.name)}
          castShadow
          receiveShadow
          geometry={data.collisionMeshes[0].mesh.geometry}
          material={data.collisionMeshes[0].mesh.material}
        >

        </mesh>
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
                  <Ball />
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