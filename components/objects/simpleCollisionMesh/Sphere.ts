// @ts-nocheck

import Loader from '../Loader';
import SphereCalculator from '../collisionMeshCalculator/SphereCalculator';

export default function Sphere(props) {
    const nodes = Loader(props)
    let object = null
    const mesh = []
    const collisionMeshesArray = []
    const data = {
        collisionMeshes: collisionMeshesArray
    }
    

    if (Object.keys(nodes.GLTF).length != 0) {
        object = nodes.GLTF.scene.children.map((i) => {
            if (i.geometry != null) {
                const cube = SphereCalculator(i)
                collisionMeshesArray.push(cube)
            }
        })

        return(data)


    } else if (Object.keys(nodes.FBX).length != 0) {
        object = nodes.FBX.children.map((i) => {
            if (i.geometry != null) {
                const cube = SphereCalculator(i)
                collisionMeshesArray.push(cube)
            }
        })

        return(data)
    }
    return object
}