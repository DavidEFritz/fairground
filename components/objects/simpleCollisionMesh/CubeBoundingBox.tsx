// @ts-nocheck
import React, { Suspense } from "react";
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export default function CubeBoundingBox(props) {
    // Load the GLTF
    const { nodes } = useGLTF(props.url)

    // Map the GLTF Scene
    const object = nodes.Scene.children.map((i) => {
        // Check if the element has a geometry
        if (i.geometry == null) {
            return null
        } else {
            // Get the 3D Objects bounding box and calculate the length of the sides
            const boundingBox = i.geometry.boundingBox
            const x = boundingBox.max.x - boundingBox.min.x
            const y = boundingBox.max.y - boundingBox.min.y
            const z = boundingBox.max.z - boundingBox.min.z

            // Declare variables for the position of the 3D object
            let positionX = 0
            let positionY = 0
            let positionZ = 0

            // Check if there are props data for position
            if (props.position == undefined) {
                // If there are no props data set the position to the value it was created in the 3D Software
                positionX = i.position.x
                positionY = i.position.y
                positionZ = i.position.z
            } else {
                // Set position to props data
                positionX = props.position[0]
                positionY = props.position[1]
                positionZ = props.position[2]
            }

            // Declare variables for the rotation of the 3D object
            let rotationX = 0
            let rotationY = 0
            let rotationZ = 0

            // Check if there are props data for rotation
            if (props.rotation == undefined) {
                // If there are no props data set the rotation to the value it was created in the 3D Software
                rotationX = i.rotation.x
                rotationY = i.rotation.y
                rotationZ = i.rotation.z
            } else {
                // Set rotation to props data
                rotationX = props.rotation[0]
                rotationY = props.rotation[1]
                rotationZ = props.rotation[2]
            }

            // Create reference object for the collision mesh
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

            // Return the mesh
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

    // Return all objects
    return <Suspense fallback={null}>{object}</Suspense>
  }
