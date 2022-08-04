import dynamic from 'next/dynamic'
import BackHomeButton from '../../components/molecules/BackHomeButton'


const SphereTestScene = dynamic(
    () => import('../../components/scenes/SphereTestScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Sphere test
    </h1>
    <div className='h-screen'>
        <SphereTestScene />
        <BackHomeButton />
    </div>
    </>
)
}