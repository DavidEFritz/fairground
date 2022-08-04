import dynamic from 'next/dynamic'
import BackHomeButton from '../../components/molecules/BackHomeButton'


const CylinderTestScene = dynamic(
    () => import('../../components/scenes/CylinderTestScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Cylinder test
    </h1>
    <div className='h-screen'>
        <CylinderTestScene />
        <BackHomeButton />
    </div>
    </>
)
}