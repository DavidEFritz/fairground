// @ts-nocheck
import React, { Suspense } from "react";
import { useBox } from '@react-three/cannon'
import Loader from '../Loader';

export default function Cube(props) {
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
            
                // Declare an object for the minimum and maximum values for x, y and z
                let boundingVectors = {
                xMin: null,
                xMax: null,
                yMin: null,
                yMax: null,
                zMin: null,
                zMax: null
                }
            
                // iterate the vectors for the minimum and maximum values of x, y and z and set the boundingVectors
                for (let i = 0; i < vectorsArray.length; i += 3) {
                    if (vectorsArray[i] < boundingVectors.xMin) {
                        boundingVectors.xMin = vectorsArray[i]
                    }
                    if (vectorsArray[i] > boundingVectors.xMax) {
                        boundingVectors.xMax = vectorsArray[i]
                    }
                }
        
                for (let i = 1; i < vectorsArray.length; i += 3) {
                    if (vectorsArray[i] < boundingVectors.yMin) {
                        boundingVectors.yMin = vectorsArray[i]
                    }
                    if (vectorsArray[i] > boundingVectors.yMax) {
                        boundingVectors.yMax = vectorsArray[i]
                    }
                }
        
                for (let i = 2; i < vectorsArray.length; i += 3) {
                    if (vectorsArray[i] < boundingVectors.zMin) {
                        boundingVectors.zMin = vectorsArray[i]
                    }
                    if (vectorsArray[i] > boundingVectors.zMax) {
                        boundingVectors.zMax = vectorsArray[i]
                    }
                }
                
                // Calculate the sides
                const x = boundingVectors.xMax - boundingVectors.xMin
                const y = boundingVectors.yMax - boundingVectors.yMin
                const z = boundingVectors.zMax - boundingVectors.zMin
        
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
        // Check if any objects with a geometry were found in the provided file
        if (counter == 0) {
            console.error('No objects containing a geometry were found in the provided file!')
        }

    } else if (Object.keys(nodes.FBX).length != 0) {
        object = nodes.FBX.children.map((i) => {
            // Check if the element has a geometry
            if (i.geometry == null) {
                return null
            } else {
                counter += 1
                // Create an array with all vectors of the 3D object
                const vectorsArray = i.geometry.attributes.position.array
            
                // Declare an object for the minimum and maximum values for x, y and z
                let boundingVectors = {
                xMin: null,
                xMax: null,
                yMin: null,
                yMax: null,
                zMin: null,
                zMax: null
                }
            
                // iterate the vectors for the minimum and maximum values of x, y and z and set the boundingVectors
                for (let i = 0; i < vectorsArray.length; i += 3) {
                    if (vectorsArray[i] < boundingVectors.xMin) {
                        boundingVectors.xMin = vectorsArray[i]
                    }
                    if (vectorsArray[i] > boundingVectors.xMax) {
                        boundingVectors.xMax = vectorsArray[i]
                    }
                }
        
                for (let i = 1; i < vectorsArray.length; i += 3) {
                    if (vectorsArray[i] < boundingVectors.yMin) {
                        boundingVectors.yMin = vectorsArray[i]
                    }
                    if (vectorsArray[i] > boundingVectors.yMax) {
                        boundingVectors.yMax = vectorsArray[i]
                    }
                }
        
                for (let i = 2; i < vectorsArray.length; i += 3) {
                    if (vectorsArray[i] < boundingVectors.zMin) {
                        boundingVectors.zMin = vectorsArray[i]
                    }
                    if (vectorsArray[i] > boundingVectors.zMax) {
                        boundingVectors.zMax = vectorsArray[i]
                    }
                }
                
                // Calculate the sides
                const x = boundingVectors.xMax - boundingVectors.xMin
                const y = boundingVectors.yMax - boundingVectors.yMin
                const z = boundingVectors.zMax - boundingVectors.zMin
        
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
        // Check if any objects with a geometry were found in the provided file
        if (counter == 0) {
            console.error('No objects containing a geometry were found in the provided file!')
        } 
    }
  
    // Return all objects
    return <Suspense fallback={null}>{object}</Suspense>
  }
  