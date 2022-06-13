// @ts-nocheck
import React, { Suspense } from "react";
import { useCylinder } from '@react-three/cannon'
import Loader from '../Loader';

export default function Cylinder(props) {
    // Load the GLFT or FBX
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
                const boundingVectors = {
                    xNegative: null,
                    xPositive: null,
                    yNegative: null,
                    yPositive: null,
                    zNegative: null,
                    zPositive: null
                }
            
                // Declare array where the sorted vectors will be pushed to
                const vectorsArraySorted = []
            
                // Iterate the vectors array and push the corresponding vectors as an object
                for (let i = 0; i < vectorsArray.length; i += 3) {
                    let vectorGroup = {
                    x: vectorsArray[i],
                    y: vectorsArray[i+1],
                    z: vectorsArray[i+2]
                    }
                    vectorsArraySorted.push(vectorGroup)
                }
                    
                // Iterate the sorted vector array and set the minimum and maximum values for x, y and z
                for (let boundingVector of vectorsArraySorted) {
                    if (boundingVector.x < boundingVectors.xNegative) {
                    boundingVectors.xNegative = boundingVector.x
                    }
                    if (boundingVector.x > boundingVectors.xPositive) {
                    boundingVectors.xPositive = boundingVector.x
                    }
                    if (boundingVector.y < boundingVectors.yNegative) {
                    boundingVectors.yNegative = boundingVector.y
                    }
                    if (boundingVector.y > boundingVectors.yPositive) {
                    boundingVectors.yPositive = boundingVector.y
                    }
                    if (boundingVector.z < boundingVectors.zNegative) {
                    boundingVectors.zNegative = boundingVector.z
                    }
                    if (boundingVector.z > boundingVectors.zPositive) {
                    boundingVectors.zPositive = boundingVector.z
                    }
                }
                   
                // Declare arrays for all vectors belonging to the top and bottom
                const vectorsBottom = []
                const vectorsTop = []
                // Declare objects for the minimum and maximum x values of the vectors at the top/bottom
                const boundingVectorsTop = {
                    xNegative: null,
                    xPositive: null
                }
                const boundingVectorsBottom = {
                    xNegative: null,
                    xPositive: null
                }
            
                // Iterate the sorted vectors array and push the vectors that are equal or bigger than the minimum on the y-axis of the bounding box
                // Iterate the sorted vectors array and push the vectors that are equal or smaller than the maximum on the y-axis of the bounding box
                for (let vectors of vectorsArraySorted) {
                    if (boundingVectors.yNegative <= vectors.y && vectors.y <= boundingVectors.yNegative + 0.1) {
                    vectorsBottom.push(vectors)
                    }
                    if (boundingVectors.yPositive -0.1 <= vectors.y && vectors.y <= boundingVectors.yPositive) {
                    vectorsTop.push(vectors)
                    }
                }            
            
                // Iterate the vectors at the bottom and set the minimum and maximum value for x
                for (let vectors of vectorsBottom) {
                    if (vectors.x < boundingVectorsBottom.xNegative ) {
                    boundingVectorsBottom.xNegative = vectors.x
                    }
                    if (vectors.x > boundingVectorsBottom.xPositive) {
                    boundingVectorsBottom.xPositive = vectors.x
                    }
                }
  
                // Iterate the vectors at the top and set the minimum and maximum value for x
                for (let vectors of vectorsTop) {
                    if (vectors.x < boundingVectorsTop.xNegative ) {
                    boundingVectorsTop.xNegative = vectors.x
                    }
                    if (vectors.x > boundingVectorsTop.xPositive) {
                    boundingVectorsTop.xPositive = vectors.x
                    }
                }
                        
                // Declare variables for the radius at the top and bottom
                let radiusTop = 0
                let radiusBottom = 0
            
                // Calculate the radius at the top and bottom and if not bounding vectors are null set a minimum value
                if (boundingVectorsBottom.xNegative == null || boundingVectorsBottom.xPositive == null) {
                    radiusBottom = 0.001
                } else {
                    radiusBottom = (boundingVectorsBottom.xPositive - boundingVectorsBottom.xNegative) / 2
                }
            
                if (boundingVectorsTop.xNegative == null || boundingVectorsTop.xPositive == null) {
                    radiusTop = 0.001
                } else {
                    radiusTop = (boundingVectorsTop.xPositive - boundingVectorsTop.xNegative) / 2
                }
            
                // Declare and calculate variable for the height
                const h = boundingVectors.yPositive - boundingVectors.yNegative

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
            
                // Declare a variable for the segments
                let segments = 8
            
                // Check if there are props data for the segments
                if (props.segments == undefined) {
                    // If there are no props data for the segments check whether there are more vectors at the bottom or the top
                    if (vectorsBottom.length > vectorsTop.length) {
                        // If there are more than 20 vectors set the segments to 20
                        if (vectorsBottom.length > 20) {î
                            segments = 20
                        } else {
                            segments = vectorsBottom.length
                        }
                    } else {
                        if (vectorsTop.length > 20) {
                            segments = 20
                        } else {
                            segments = vectorsTop.length
                        }
                    }
                } else {
                    // If there are props data for segments set segments accordingly
                    segments = props.segments
                }
            
                // Create reference object for the collision mesh
                const [ref] = useCylinder(() => ({
                    position: [positionX, positionY, positionZ],
                    rotation: [rotationX, rotationY, rotationZ],
                    mass: props.mass,
                    args: [radiusTop, radiusBottom, h, segments],
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
            
                const boundingVectors = {
                    xNegative: null,
                    xPositive: null,
                    yNegative: null,
                    yPositive: null,
                    zNegative: null,
                    zPositive: null
                }
            
                const vectorsArraySorted = []
            
                for (let i = 0; i < vectorsArray.length; i += 3) {
                    let vectorGroup = {
                    x: vectorsArray[i],
                    y: vectorsArray[i+1],
                    z: vectorsArray[i+2]
                    }
                    vectorsArraySorted.push(vectorGroup)
                }
                    
                for (let boundingVector of vectorsArraySorted) {
                    if (boundingVector.x < boundingVectors.xNegative) {
                    boundingVectors.xNegative = boundingVector.x
                    }
                    if (boundingVector.x > boundingVectors.xPositive) {
                    boundingVectors.xPositive = boundingVector.x
                    }
                    if (boundingVector.y < boundingVectors.yNegative) {
                    boundingVectors.yNegative = boundingVector.y
                    }
                    if (boundingVector.y > boundingVectors.yPositive) {
                    boundingVectors.yPositive = boundingVector.y
                    }
                    if (boundingVector.z < boundingVectors.zNegative) {
                    boundingVectors.zNegative = boundingVector.z
                    }
                    if (boundingVector.z > boundingVectors.zPositive) {
                    boundingVectors.zPositive = boundingVector.z
                    }
                }
                        
                const vectorsBottom = []
                const vectorsTop = []
                const boundingVectorsTop = {
                    xNegative: null,
                    xPositive: null
                }
                const boundingVectorsBottom = {
                    xNegative: null,
                    xPositive: null
                }
            
                for (let vectors of vectorsArraySorted) {
                    if (boundingVectors.yNegative <= vectors.y && vectors.y <= boundingVectors.yNegative + 0.1) {
                    vectorsBottom.push(vectors)
                    }
                    if (boundingVectors.yPositive -0.1 <= vectors.y && vectors.y <= boundingVectors.yPositive) {
                    vectorsTop.push(vectors)
                    }
                }            
            
                for (let vectors of vectorsBottom) {
                    if (vectors.x < boundingVectorsBottom.xNegative ) {
                    boundingVectorsBottom.xNegative = vectors.x
                    }
                    if (vectors.x > boundingVectorsBottom.xPositive) {
                    boundingVectorsBottom.xPositive = vectors.x
                    }
                }
            
                for (let vectors of vectorsTop) {
                    if (vectors.x < boundingVectorsTop.xNegative ) {
                    boundingVectorsTop.xNegative = vectors.x
                    }
                    if (vectors.x > boundingVectorsTop.xPositive) {
                    boundingVectorsTop.xPositive = vectors.x
                    }
                }
                        
                let radiusTop = 0
                let radiusBottom = 0
            
                if (boundingVectorsBottom.xNegative == null || boundingVectorsBottom.xPositive == null) {
                    radiusBottom = 0.001
                } else {
                    radiusBottom = (boundingVectorsBottom.xPositive - boundingVectorsBottom.xNegative) / 2
                }
            
                if (boundingVectorsTop.xNegative == null || boundingVectorsTop.xPositive == null) {
                    radiusTop = 0.001
                } else {
                    radiusTop = (boundingVectorsTop.xPositive - boundingVectorsTop.xNegative) / 2
                }
            
                const h = boundingVectors.yPositive - boundingVectors.yNegative
            
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
                    if (vectorsBottom.length > vectorsTop.length) {
                        if (vectorsBottom.length > 20) {
                            segments = 20
                        } else {
                            segments = vectorsBottom.length
                        }
                    } else {
                        if (vectorsTop.length > 20) {
                            segments = 20
                        } else {
                            segments = vectorsTop.length
                        }
                    }
                } else {
                    segments = props.segments
                }
            
                const [ref] = useCylinder(() => ({
                    position: [positionX, positionY, positionZ],
                    rotation: [rotationX, rotationY, rotationZ],
                    mass: props.mass,
                    args: [radiusTop, radiusBottom, h, segments],
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