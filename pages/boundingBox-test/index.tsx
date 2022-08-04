import dynamic from 'next/dynamic'
import BackHomeButton from '../../components/molecules/BackHomeButton'


const BoundingBoxTestScene = dynamic(
    () => import('../../components/scenes/BoundingBoxTestScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Bounding box test
    </h1>
    <div className='h-screen'>
        <BoundingBoxTestScene />
        <BackHomeButton />
    </div>
    </>
)
}