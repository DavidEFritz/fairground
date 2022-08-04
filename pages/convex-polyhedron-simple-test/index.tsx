import dynamic from 'next/dynamic'
import BackHomeButton from '../../components/molecules/BackHomeButton'


const ConvexPolyhedronSimpleTestScene = dynamic(
    () => import('../../components/scenes/ConvexPolyhedronTestSceneSimple'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Convex Polyhedron simple shape FPS test
    </h1>
    <div className='h-screen'>
        <ConvexPolyhedronSimpleTestScene />
        <BackHomeButton />
    </div>
    </>
)
}