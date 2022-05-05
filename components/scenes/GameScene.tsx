// @ts-nocheck
import { Stats } from '@react-three/drei'
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { Sky, Loader, useGLTF, OrbitControls } from '@react-three/drei'
import { Physics, usePlane, Debug, useBox, useCylinder, useSphere } from '@react-three/cannon'
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { shipPositionState } from "../molecules/GameState";
import { laserPositionState } from "../molecules/GameState";
import * as THREE from 'three'


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

  function ArWing() {
    const [shipPosition, setShipPosition] = useRecoilState(shipPositionState)

  
    const ship = useRef();
    useFrame(({ mouse }) => {
      setShipPosition({
        position: { x: mouse.x * 6, y: mouse.y * 2 },
        rotation: { z: -mouse.x * 0.5, x: -mouse.x * 0.5, y: -mouse.y * 0.2 },
      });
    });
    // Update the ships position from the updated state.
    useFrame(() => {
      ship.current.rotation.z = shipPosition.rotation.z;
      ship.current.rotation.y = shipPosition.rotation.x;
      ship.current.rotation.x = shipPosition.rotation.y;
      ship.current.position.y = 2 + shipPosition.position.y;
      ship.current.position.x = shipPosition.position.x;
      ship.current.position.z = 8.5
    });
    
    const { nodes } = useGLTF('/gun.glb')
    return (
    <mesh
        ref={ship}
        visible
        geometry={nodes.Cylinder010.geometry}
        onClick={() => 
            console.log(shipPosition)
        }
    >
        <meshStandardMaterial color='white' />
    </mesh>
    );
  }

    function Lasers() {
        const lasers = useRecoilValue(laserPositionState);
        // const [ref] = useSphere(() => ({
        //     mass: 0.1,
        //     args: 0.1,
        //     allowSleep: true,
        //     sleepSpeedLimit: 1,
        //     sleepTimeLimit: 1,
        //     material: {
        //       friction: 1,
        //       restitution: 0,
        //     }
        //   }))
        return (
        <group>
            {lasers.map((laser) => (
            <mesh ref={ref} position={[laser.x, laser.y, laser.z]} key={`${laser.id}`}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color={'white'} />
            </mesh>
            ))}
        </group>
        );
    }

    function LaserController() {
        const shipPosition = useRecoilValue(shipPositionState);
        const [lasers, setLasers] = useRecoilState(laserPositionState);
        return (
          <mesh
            position={[0, 0, -8]}
            onClick={() =>
              setLasers([
                ...lasers,
                {
                  id: Math.random(),
                  x: 0,
                  y: 2.5,
                  z: 8,
                  velocity: [
                    shipPosition.rotation.x / 2,
                    shipPosition.rotation.y / 2,
                  ],
                },
              ])
            }
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial
              attach="material"
              color="orange"
              emissive="#ff0860"
              visible={false}
            />
          </mesh>
        );
      }

      function GameTimer() {
        const [lasers, setLaserPositions] = useRecoilState(laserPositionState);
      
        useFrame(({ mouse }) => {

          setLaserPositions(
            lasers
              .map((laser) => ({
                id: laser.id,
                x: laser.x + laser.velocity[0],
                y: laser.y + laser.velocity[1],
                z: laser.z - 0.1,
                velocity: laser.velocity,
              }))
          );
        });
        return null;
      }

  export default function CubeTest() {
    return (
      <>
      <Canvas camera={{ position: [0, 5, 10] }} className='bg-black'>
        <RecoilRoot>
        {/* <OrbitControls /> */}
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={1} position={[10, 10, 0]} />
  
        <primitive object={new THREE.AxesHelper(10)} />
        <Suspense fallback={null}>
            <Physics allowSleep={true}>
                <Ground />
                <Debug color="black" >
                    <Cube url='/table.glb' />
                    <Cylinder mass={0.1} segments={30} url={'/cans.glb'} />
                </Debug>
            </Physics>
            <ArWing />
            <Lasers />
            <LaserController />
            <GameTimer />
        </Suspense>
        <Stats />
        </RecoilRoot>
      </Canvas>
      <Loader />
      </>
    )
  }