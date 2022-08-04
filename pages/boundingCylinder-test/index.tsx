import dynamic from 'next/dynamic'
import BackHomeButton from '../../components/molecules/BackHomeButton'


const BoundingCylinderTestScene = dynamic(
    () => import('../../components/scenes/BoundingCylinderTestScene'),
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
        <BoundingCylinderTestScene />
        <BackHomeButton />
    </div>
    </>
)
}