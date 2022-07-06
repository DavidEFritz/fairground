
export default function CylinderCalculator(props) {
                const vectorsArray = props.geometry.attributes.position.array
            
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

                // const vectorsBottomSorted = Array.from(
                //     new Set(vectorsBottom.map(v => JSON.stringify(v))),
                //     json => JSON.parse(json)
                // )

                //   const vectorsTopSorted = Array.from(
                //     new Set(vectorsTop.map(v => JSON.stringify(v))),
                //     json => JSON.parse(json)
                // )
                
                const vectorsBottomSorted = vectorsBottom.reduce((unique, o) => {
                    if(!unique.some(obj => obj.x === o.x && obj.y === o.y && obj.z === o.z)) {
                      unique.push(o);
                    }
                    return unique;
                },[]);

                const vectorsTopSorted = vectorsTop.reduce((unique, o) => {
                    if(!unique.some(obj => obj.x === o.x && obj.y === o.y && obj.z === o.z)) {
                      unique.push(o);
                    }
                    return unique;
                },[]);

            
                // Iterate the vectors at the bottom and set the minimum and maximum value for x
                for (let vectors of vectorsBottomSorted) {
                    if (vectors.x < boundingVectorsBottom.xNegative ) {
                    boundingVectorsBottom.xNegative = vectors.x
                    }
                    if (vectors.x > boundingVectorsBottom.xPositive) {
                    boundingVectorsBottom.xPositive = vectors.x
                    }
                }
  
                // Iterate the vectors at the top and set the minimum and maximum value for x
                for (let vectors of vectorsTopSorted) {
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
            
                // Declare a variable for the segments
                let segments = 8
            
                // Check if there are props data for the segments
                if (props.segments == undefined) {
                    // If there are no props data for the segments check whether there are more vectors at the bottom or the top
                    if (vectorsBottom.length > vectorsTop.length) {
                        // If there are more than 20 vectors set the segments to 20
                        if (vectorsBottomSorted.length > 20) {
                            segments = 20
                        } else {
                            segments = vectorsBottomSorted.length
                        }
                    } else {
                        if (vectorsTop.length > 20) {
                            segments = 20
                        } else {
                            segments = vectorsTopSorted.length
                        }
                    }
                } else {
                    // If there are props data for segments set segments accordingly
                    segments = props.segments
                }
            
                const collisionData = {
                    type: 'Cylinder',
                    args: [radiusTop, radiusBottom, h, segments],
                    position: [props.position.x, props.position.y, props.position.z],
                    rotation: [props.rotation.x, props.rotation.y, props.rotation.z]
                }

                return(collisionData)
}