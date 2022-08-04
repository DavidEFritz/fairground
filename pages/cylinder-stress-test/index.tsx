import dynamic from 'next/dynamic'
import BackHomeButton from '../../components/molecules/BackHomeButton'


const CylinderStressTestScene = dynamic(
    () => import('../../components/scenes/CylinderStressTestScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Cylinder stress test
    </h1>
    <div className='h-screen'>
        <CylinderStressTestScene />
        <BackHomeButton />
    </div>
    </>
)
}