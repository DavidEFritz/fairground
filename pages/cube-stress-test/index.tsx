import dynamic from 'next/dynamic'
import BackHomeButton from '../../components/molecules/BackHomeButton'


const CubeStressTestScene = dynamic(
    () => import('../../components/scenes/CubeStressTestScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Cube stress test
    </h1>
    <div className='h-screen'>
        <CubeStressTestScene />
        <BackHomeButton />
    </div>
    </>
)
}