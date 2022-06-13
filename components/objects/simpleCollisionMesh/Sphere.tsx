// @ts-nocheck
import React, { Suspense } from "react";
import { useGLTF } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'
import Loader from '../Loader';

export default function Sphere(props) {
    // Load the GLTF or the FBX

    const nodes = Loader(props.url)

    // Map the GLTF or FBX

    let object = null
    let counter = 0

    // Check if the provided file is a GLTF or a FBX
    if (Object.keys(nodes.GLTF).length != 0) {
        object = nodes.GLTF.scene.children.map((i) => {
            // Check if the element has a geometry
            if (i.geometry == null) {
              return null
            } else {
                counter += 1

                // Create an array with all vectors of the 3D object
                const vectorsArray = i.geometry.attributes.position.array
            
                // Declare an object for the minimum and maximim y values
                let boundingVectors = {
                    yNegative: null,
                    yPositive: null,
                }

                // iterate the vectors for the minimum and maximum values of y and set the boundingVectors
                for (let i = 1; i < vectorsArray.length; i += 3) {
                    if (vectorsArray[i] < boundingVectors.yNegative) {
                    boundingVectors.yNegative = vectorsArray[i]
                    }
                    if (vectorsArray[i] > boundingVectors.yPositive) {
                    boundingVectors.yPositive = vectorsArray[i]
                    }
                }
            
                // Calculate the radius of the sphere
                const r = (boundingVectors.yPositive - boundingVectors.yNegative) / 2
            
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
            
                // Return the mesh
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
        // Check if any objects with a geometry were found in the provided file
        if (counter == 0) {
            console.error('No objects containing a geometry were found in the provided file!')
        }
    } else if (Object.keys(nodes.FBX).length != 0) {
        object = nodes.FBX.children.map((i) => {
            if (i.geometry == null) {
              return null
            } else {
                counter += 1
                const vectorsArray = i.geometry.attributes.position.array
            
                let boundingVectors = {
                    yNegative: null,
                    yPositive: null,
                }
            
                for (let i = 1; i < vectorsArray.length; i += 3) {
                    if (vectorsArray[i] < boundingVectors.yNegative) {
                    boundingVectors.yNegative = vectorsArray[i]
                    }
                    if (vectorsArray[i] > boundingVectors.yPositive) {
                    boundingVectors.yPositive = vectorsArray[i]
                    }
                }
            
                const r = (boundingVectors.yPositive - boundingVectors.yNegative) / 2
            
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
        // Check if any objects with a geometry were found in the provided file
        if (counter == 0) {
            console.error('No objects containing a geometry were found in the provided file!')
        }  
    }
    // Return all objects
    return <Suspense fallback={null}>{object}</Suspense>
}
  