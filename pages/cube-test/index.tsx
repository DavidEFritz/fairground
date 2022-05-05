import dynamic from 'next/dynamic'

const CubeTestScene = dynamic(
    () => import('../../components/scenes/CubeTestScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Cube test
    </h1>
    <div className='h-screen'>
        <CubeTestScene />
    </div>
    </>
)
}