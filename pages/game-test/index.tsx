import dynamic from 'next/dynamic'
import Crosshair from '../../components/molecules/Crosshair';
import BackHomeButton from '../../components/molecules/BackHomeButton'


const GameScene = dynamic(
    () => import('../../components/scenes/GameScene'),
    {
        ssr: false
    }
)

export default function FpvExample() {
return (
    <>
    <h1 className='absolute top-0 right-0 z-10 pr-2'>
        Bowling game
    </h1>
    <div className='h-screen'>
        <Crosshair />
        <GameScene />
        <BackHomeButton />
    </div>
    </>
)
}