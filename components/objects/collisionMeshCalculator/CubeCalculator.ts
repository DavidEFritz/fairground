
export default function CubeCalculator(props) {
                // Create an array with all vectors of the 3D object
                const vectorsArray = props.geometry.attributes.position.array
            
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
                
                // Calculate the length of the sides
                const x = boundingVectors.xMax - boundingVectors.xMin
                const y = boundingVectors.yMax - boundingVectors.yMin
                const z = boundingVectors.zMax - boundingVectors.zMin

                // Store data in an object to return
                const collisionData = {
                    type: 'Box',
                    args: [x, y, z],
                    position: [props.position.x, props.position.y, props.position.z],
                    rotation: [props.rotation.x, props.rotation.y, props.rotation.z],
                    mesh: props
                }

                return(collisionData)
}