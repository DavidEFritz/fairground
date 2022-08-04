import dynamic from 'next/dynamic'
import BackHomeButton from '../../components/molecules/BackHomeButton'


const CompoundTestScene = dynamic(
    () => import('../../components/scenes/CompoundTestScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Compound test
    </h1>
    <div className='h-screen'>
        <CompoundTestScene />
        <BackHomeButton />
    </div>
    </>
)
}