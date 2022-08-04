import dynamic from 'next/dynamic'
import Crosshair from '../../components/molecules/Crosshair';
import BackHomeButton from '../../components/molecules/BackHomeButton'


const Game2Scene = dynamic(
    () => import('../../components/scenes/Game2Scene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Can game
    </h1>
    <div className='h-screen'>
        <Crosshair />
        <Game2Scene />
        <BackHomeButton />
    </div>
    </>
)
}