import { useGLTF, useFBX } from '@react-three/drei'

// Loader to load either a GLTF or a FBX file

export default function Loader(props) {
    // Object to be returned containing the loaded file
    const nodes = {
        GLTF: {},
        FBX: {}
    }

    // Check if the URL provided is a GLTF or a FBX file and load it
    if (props.search('glb') != -1 || props.search('gltf') != -1 ) {
        nodes.GLTF = useGLTF(props)
    } else if (props.search('fbx') != -1) {
        nodes.FBX = useFBX(props)
    } else {
        console.error('File provided is not supported!')
    }
    // Return the object containing the loaded file
    return (nodes)
}