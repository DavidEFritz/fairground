// @ts-nocheck
import { Stats } from '@react-three/drei'
import React, { Suspense } from "react";
import { Canvas } from '@react-three/fiber'
import { Sky, Loader, OrbitControls, PointerLockControls } from '@react-three/drei'
import { Physics, usePlane, Debug, useBox, useCylinder } from '@react-three/cannon'
import Cylinder from '../objects/simpleCollisionMesh/Cylinder'
import Cube from '../objects/simpleCollisionMesh/Cube'
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

function TinCans() {
  const data = Cylinder('/cans.glb')
  console.log(data)

  let object = null

  object = data.collisionMeshes.map((i) => {
    const [ref] = useCylinder(() =>({
      args: i.args,
      mass: 0.2,
      allowSleep: true,
      sleepSpeedLimit: 0.5,
      sleepTimeLimit: 1,
      material: {
          friction: 1,
          restitution: 0,
      },
      position: i.position
    }))

    return (
      <mesh
        ref={ref}
        key={(i.mesh.name)}
        castShadow
        receiveShadow
        geometry={i.mesh.geometry}
        material={i.mesh.material}
        position={i.position}
      >

      </mesh>
    )
  })
  return object
}

function Table() {
  const data = Cube('/table.glb')

  let object = null

  object = data.collisionMeshes.map((i) => {
    const [ref] = useBox(() =>({
      args: i.args,
      mass: 0,
      allowSleep: true,
      sleepSpeedLimit: 0.1,
      sleepTimeLimit: 1,
      material: {
          friction: 1,
          restitution: 0,
      },
      position: i.position
    }))

    return (
      <mesh
        ref={ref}
        key={(i.mesh.name)}
        castShadow
        receiveShadow
        geometry={i.mesh.geometry}
        material={i.mesh.material}
        position={i.position}
      >

      </mesh>
    )
  })
  return object
}

export default function CubeTest() {
  return (
    <>
    <Canvas shadows={true} camera={{ position: [0, 3, 10] }} className='bg-black z-0'>
      <PointerLockControls />
      <Sky sunPosition={[100, 10, 100]} />
      <ambientLight intensity={0.3} />
      <pointLight shadow-mapSize-height={1028} shadow-mapSize-width={1028} castShadow intensity={1} position={[10, 10, 0]} />

      <Suspense fallback={null}>
          <Physics gravity={[0, -9, 0]} allowSleep={true}>
              <Ground />
              <Debug color="black" >
                <Table />
                <TinCans />
              </Debug>
              <Player ballSize={0.1} velocity={15} mass={3} />
          </Physics>
      </Suspense>
      <Stats />
    </Canvas>
    <Loader />
    </>
  )
}