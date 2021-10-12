import dynamic from 'next/dynamic'

const ConvexPolyhedronTestScene = dynamic(
    () => import('../../components/scenes/ConvexPolyhedronTestScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Convex Polyhedron FPS test
    </h1>
    <div className='h-screen'>
        <ConvexPolyhedronTestScene />
    </div>
    </>
)
}