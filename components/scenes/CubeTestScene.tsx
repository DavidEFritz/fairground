// @ts-nocheck
import { Stats, useFBX } from '@react-three/drei'
import React, { Suspense, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { Sky, Loader, useGLTF, OrbitControls } from '@react-three/drei'
import { Physics, usePlane, Debug, useBox, useCylinder, useConvexPolyhedron, useSphere } from '@react-three/cannon'
import * as THREE from 'three'
import { Geometry } from "three-stdlib";


  function Cube(props) {
    const { nodes } = useGLTF(props.url)

    const object = nodes.Scene.children.map((i) => {
      if (i.geometry == null) {
        return null
      } else {

        const boundingBox = i.geometry.boundingBox
        const x = boundingBox.max.x - boundingBox.min.x
        const y = boundingBox.max.y - boundingBox.min.y
        const z = boundingBox.max.z - boundingBox.min.z

        let positionX = 0
        let positionY = 0
        let positionZ = 0

        if (props.position == undefined) {
          positionX = i.position.x
          positionY = i.position.y
          positionZ = i.position.z
        } else {
          positionX = props.position[0]
          positionY = props.position[1]
          positionZ = props.position[2]
        }

        let rotationX = 0
        let rotationY = 0
        let rotationZ = 0

        if (props.rotation == undefined) {
          rotationX = i.rotation.x
          rotationY = i.rotation.y
          rotationZ = i.rotation.z
        } else {
          rotationX = props.rotation[0]
          rotationY = props.rotation[1]
          rotationZ = props.rotation[2]
        }

        const [ref] = useBox(() => ({

          position: [positionX, positionY, positionZ],
          rotation: [rotationX, rotationY, rotationZ],
          mass: props.mass,
          args: [x, y, z],
          allowSleep: true,
          sleepSpeedLimit: 0.1,
          sleepTimeLimit: 1,
          material: {
            friction: 1,
            restitution: 0,
          }
        }))

        return (
          <mesh
            key={(i.name)}
            castShadow
            receiveShadow
            geometry={i.geometry}
            position={positionX, positionY, positionZ}
            rotation={[rotationX, rotationY, rotationZ]}
            material={i.material}
            ref={ref}
          >
          </mesh>
        )
      }
    })

    return <Suspense fallback={null}>{object}</Suspense>
  }

function Ground() {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }))
  
    return (
      <mesh ref={ref}>
        <planeBufferGeometry args={[100, 100, 100, 100]} />
        <meshBasicMaterial color='grey' />
      </mesh>
    )
  }

  function Cylinder(props) {
    const nodes = useGLTF(props.url)
    const object = nodes.scene.children.map((i) => {
      if (i.geometry == null) {
        return null
      } else {

        const boundingBox = i.geometry.boundingBox
        const r = (boundingBox.max.x - boundingBox.min.x) / 2
        const h = boundingBox.max.y - boundingBox.min.y

        let positionX = 0
        let positionY = 0
        let positionZ = 0

        if (props.position == undefined) {
          positionX = i.position.x
          positionY = i.position.y
          positionZ = i.position.z
        } else {
          positionX = props.position[0]
          positionY = props.position[1]
          positionZ = props.position[2]
        }

        let rotationX = 0
        let rotationY = 0
        let rotationZ = 0

        if (props.rotation == undefined) {
          rotationX = i.rotation.x
          rotationY = i.rotation.y
          rotationZ = i.rotation.z
        } else {
          rotationX = props.rotation[0]
          rotationY = props.rotation[1]
          rotationZ = props.rotation[2]
        }

        let segments = 8

        if (props.segments == undefined) {
          segments = 8
        } else {
          segments = props.segments
        }

        const [ref] = useCylinder(() => ({
          position: [positionX, positionY, positionZ],
          rotation: [rotationX, rotationY, rotationZ],
          mass: props.mass,
          args: [r, r, h, segments],
          allowSleep: true,
          sleepSpeedLimit: 0.5,
          sleepTimeLimit: 1,
          material: {
            friction: 1,
            restitution: 0,
          }
        }))

        return (
          <mesh
            key={(i.name)}
            castShadow
            receiveShadow
            geometry={i.geometry}
            rotation={[rotationX, rotationY, rotationZ]}
            material={i.material}
            ref={ref}
          >
          </mesh>
        )
      }
    })

    return <Suspense fallback={null}>{object}</Suspense>
  }

  function Sphere(props) {
    const nodes = useGLTF(props.url)
    const object = nodes.scene.children.map((i) => {
      if (i.geometry == null) {
        return null
      } else {

        const boundingBox = i.geometry.boundingBox
        const r = (boundingBox.max.x - boundingBox.min.x) / 2

        let positionX = 0
        let positionY = 0
        let positionZ = 0

        if (props.position == undefined) {
          positionX = i.position.x
          positionY = i.position.y
          positionZ = i.position.z
        } else {
          positionX = props.position[0]
          positionY = props.position[1]
          positionZ = props.position[2]
        }

        let rotationX = 0
        let rotationY = 0
        let rotationZ = 0

        if (props.rotation == undefined) {
          rotationX = i.rotation.x
          rotationY = i.rotation.y
          rotationZ = i.rotation.z
        } else {
          rotationX = props.rotation[0]
          rotationY = props.rotation[1]
          rotationZ = props.rotation[2]
        }

        const [ref] = useSphere(() => ({
          position: [positionX, positionY, positionZ],
          rotation: [rotationX, rotationY, rotationZ],
          mass: props.mass,
          args: [r],
          allowSleep: true,
          sleepSpeedLimit: 1,
          sleepTimeLimit: 1,
          material: {
            friction: 1,
            restitution: 0,
          }
        }))

        return (
          <mesh
            key={(i.name)}
            castShadow
            receiveShadow
            geometry={i.geometry}
            rotation={[rotationX, rotationY, rotationZ]}
            material={i.material}
            ref={ref}
          >
          </mesh>
        )
      }
    })

    return <Suspense fallback={null}>{object}</Suspense>
  }

  export default function CubeTest() {
    return (
      <>
      <Canvas camera={{ position: [0, 5, 15] }} className='bg-black'>
        <OrbitControls />
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={1} position={[10, 10, 0]} />
  
        <primitive object={new THREE.AxesHelper(10)} />
        <Suspense fallback={null}>
            <Physics allowSleep={true}>
                <Ground />
                <Debug color="black" >
                    <Cube rotation={[0, 0.5, 0.5]} position={[0, 10, 0]} mass={0.1} url='/cube.glb' />
                    <Cube rotation={[0.5, 0.5, 0.5]} position={[2, 10, 0]} mass={0.1} url='/cube.glb' />
                    <Cube rotation={[1, 0.5, 0.5]} position={[-2, 10, 0]} mass={0.1} url='/cube.glb' />
                    <Cube rotation={[1.5, 0.5, 0.5]} position={[2, 10, 2]} mass={0.1} url='/cube.glb' />
                    <Cube rotation={[-0.5, 0.5, 0.5]} position={[-2, 10, -2]} mass={0.1} url='/cube.glb' />
                    <Cube rotation={[-1, 0.5, 0.5]} position={[2, 10, -2]} mass={0.1} url='/cube.glb' />
                    <Cylinder rotation={[0, 0.5, 0.5]} position={[0, 6, 0]} mass={0.1} segments={30} url='/cylinder.glb' />
                    <Cylinder rotation={[0, 0, 1]} position={[2, 6, 0]} mass={0.1} segments={30} url='/cylinder.glb' />
                    <Cylinder rotation={[0.5, -0.5, 1]} position={[-2, 6, 0]} mass={0.1} segments={30} url='/cylinder.glb' />
                    <Cylinder rotation={[-1, 0, 1]} position={[2, 6, 2]} mass={0.1} segments={30} url='/cylinder.glb' />
                    <Cylinder rotation={[0, -0.5, 1]} position={[-2, 6, -2]} mass={0.1} segments={30} url='/cylinder.glb' />
                    <Cylinder rotation={[0.5, 0, -1]} position={[2, 6, -2]} mass={0.1} segments={30} url='/cylinder.glb' />
                    <Sphere rotation={[0, 0, 1]} position={[0, 14, 0]} mass={0.1} url='/sphere.glb' />
                    <Sphere rotation={[0, 0, 1]} position={[2, 14, 0]} mass={0.1} url='/sphere.glb' />
                    <Sphere rotation={[0, 0, 1]} position={[-2, 14, 0]} mass={0.1} url='/sphere.glb' />
                    <Sphere rotation={[0, 0, 1]} position={[2, 14, 2]} mass={0.1} url='/sphere.glb' />
                    <Sphere rotation={[0, 0, 1]} position={[-2, 14, -2]} mass={0.1} url='/sphere.glb' />
                    <Sphere rotation={[0, 0, 1]} position={[2, 14, -2]} mass={0.1} url='/sphere.glb' />
                    {/* <Cube url='/table.glb' />
                    <Cylinder mass={0.1} segments={30} url={'/cans.glb'} /> */}
                </Debug>
            </Physics>
        </Suspense>
        <Stats />
      </Canvas>
      <Loader />
      </>
    )
  }