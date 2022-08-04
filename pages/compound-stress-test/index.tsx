import dynamic from 'next/dynamic'
import BackHomeButton from '../../components/molecules/BackHomeButton'


const CompoundStressTestScene = dynamic(
    () => import('../../components/scenes/CompoundStressTestScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Compound stress test
    </h1>
    <div className='h-screen'>
        <CompoundStressTestScene />
        <BackHomeButton />
    </div>
    </>
)
}