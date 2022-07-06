
export default function SphereCalculator(props) {
                // Create an array with all vectors of the 3D object
                const vectorsArray = props.geometry.attributes.position.array
            
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

                const collisionData = {
                    type: 'Sphere',
                    args: [r],
                    position: [props.position.x, props.position.y, props.position.z],
                    rotation: [props.rotation.x, props.rotation.y, props.rotation.z]
                }

                return(collisionData)

}