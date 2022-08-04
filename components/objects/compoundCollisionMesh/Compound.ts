// @ts-nocheck

import Loader from '../Loader';
import CylinderCalculator from '../collisionMeshCalculator/CylinderCalculator';
import CubeCalculator from '../collisionMeshCalculator/CubeCalculator';
import SphereCalculator from '../collisionMeshCalculator/SphereCalculator';

export default function Compound(props) {
    const nodes = Loader(props)

    let object = null
    // array to hold the data of the loaded 3D-Object
    const mesh = []
    // array to hold the data for the collisionmeshes to be used with Cannon compound
    const collisionMeshesArray = []
    // object to hold both arrays
    const data = {
        mesh: mesh,
        collisionMeshes: collisionMeshesArray
    }
    

    if (Object.keys(nodes.GLTF).length != 0) {
        object = nodes.GLTF.scene.children.map((i) => {
            // check if the current object has a name containing physics
            if (i.name.search('Physics') != -1) {
                // check whether the name also contains cylinder
                if (i.name.search('Cylinder') != -1) {
                    // let the module calculate the params for the cannon cylinder body
                    const cylinder = CylinderCalculator(i)
                    // create object to hold the params
                    let cylinderCollisionData = {
                        args: cylinder.args,
                        position: cylinder.position,
                        rotation: cylinder.rotation,
                        type: cylinder.type
                    }
                    // push the object to the collisionmeshes array
                    collisionMeshesArray.push(cylinderCollisionData)
                // check wheter the name also contains cube
                } else if (i.name.search('Cube') != -1) {
                    // let the module calculate the params for the cannon cube body
                    const cube = CubeCalculator(i)
                    // create object to hold the params
                    let cubeCollisionData = {
                        args: cube.args,
                        position: cube.position,
                        rotation: cube.rotation,
                        type: cube.type
                    }
                    // push the object to the collisionmeshes array
                    collisionMeshesArray.push(cubeCollisionData)
                // check if the name also contains sphere
                } else if (i.name.search('Sphere') != -1) {
                    // let the module calculate the params for the cannon sphere body
                    const sphere = SphereCalculator(i)
                    // create object to hold the params
                    let sphereCollisionData = {
                        args: sphere.args,
                        position: sphere.position,
                        rotation: sphere.rotation,
                        type: sphere.type
                    }
                    // push the object to the collisionmeshes array
                    collisionMeshesArray.push(sphereCollisionData)
                }
            } else {
                // if the name does not contain physics this will be the 3D-Model
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