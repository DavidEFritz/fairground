// @ts-nocheck

import Loader from '../Loader';
import CylinderCalculator from '../collisionMeshCalculator/CylinderCalculator';

export default function Cylinder(props) {
    const nodes = Loader(props)
    let object = null
    const mesh = []
    const collisionMeshesArray = []
    const data = {
        collisionMeshes: collisionMeshesArray
    }
    

    if (Object.keys(nodes.GLTF).length != 0) {
        object = nodes.GLTF.scene.children.map((i) => {
            // console.log(nodes)
            if (i.geometry != null) {
                const cube = CylinderCalculator(i)
                collisionMeshesArray.push(cube)
            }
        })

        return(data)


    } else if (Object.keys(nodes.FBX).length != 0) {
        object = nodes.FBX.children.map((i) => {
            if (i.geometry != null) {
                const cube = CylinderCalculator(i)
                collisionMeshesArray.push(cube)
            }
        })

        return(data)
    }
    return object
}