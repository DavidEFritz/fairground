// @ts-nocheck

import Loader from '../Loader';
import CylinderCalculator from '../collisionMeshCalculator/CylinderCalculator';
import CubeCalculator from '../collisionMeshCalculator/CubeCalculator';
import SphereCalculator from '../collisionMeshCalculator/SphereCalculator';

export default function Compound(props) {
    const nodes = Loader(props)

    let object = null
    const mesh = []
    const collisionMeshesArray = []
    const data = {
        mesh: mesh,
        collisionMeshes: collisionMeshesArray
    }
    

    if (Object.keys(nodes.GLTF).length != 0) {
        object = nodes.GLTF.scene.children.map((i) => {
            if (i.name.search('Physics') != -1) {
                if (i.name.search('Cylinder') != -1) {
                    const cylinder = CylinderCalculator(i)
                    collisionMeshesArray.push(cylinder)
                } else if (i.name.search('Cube') != -1) {
                    const cube = CubeCalculator(i)
                    collisionMeshesArray.push(cube)
                } else if (i.name.search('Sphere') != -1) {
                    const sphere = SphereCalculator(i)
                    collisionMeshesArray.push(sphere)
                }
            } else {
                mesh.push(i)
            }
        })

        return(data)


    } else if (Object.keys(nodes.FBX).length != 0) {
        object = nodes.FBX.children.map((i) => {
            if (i.name.search('Physics') != -1) {
                if (i.name.search('Cylinder') != -1) {
                    const cylinder = CylinderCalculator(i)
                    collisionMeshesArray.push(cylinder)
                } else if (i.name.search('Cube') != -1) {
                    const cube = CubeCalculator(i)
                    collisionMeshesArray.push(cube)
                } else if (i.name.search('Sphere') != -1) {
                    const sphere = SphereCalculator(i)
                    collisionMeshesArray.push(sphere)
                }
            } else {
                mesh.push(i)
            }
        })

        return(data)

    }
    console.log(object)
    return object
}