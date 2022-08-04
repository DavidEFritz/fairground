import dynamic from 'next/dynamic'
import BackHomeButton from '../../components/molecules/BackHomeButton'


const BoundingSphereTestScene = dynamic(
    () => import('../../components/scenes/BoundingSphereTestScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Bounding sphere test
    </h1>
    <div className='h-screen'>
        <BoundingSphereTestScene />
        <BackHomeButton />
    </div>
    </>
)
}