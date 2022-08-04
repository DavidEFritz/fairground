import dynamic from 'next/dynamic'
import BackHomeButton from '../../components/molecules/BackHomeButton'


const AccuracyTestScene = dynamic(
    () => import('../../components/scenes/AccuracyTestScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Simple shapes test
    </h1>
    <div className='h-screen'>
        <AccuracyTestScene />
        <BackHomeButton />
    </div>
    </>
)
}