import dynamic from 'next/dynamic'
import BackHomeButton from '../../components/molecules/BackHomeButton'


const MonkeyTestScene = dynamic(
    () => import('../../components/scenes/MonkeyTestScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Monkey test
    </h1>
    <div className='h-screen'>
        <MonkeyTestScene />
        <BackHomeButton />
    </div>
    </>
)
}