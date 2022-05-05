import dynamic from 'next/dynamic'

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
        Cube test
    </h1>
    <div className='h-screen'>
        <GameScene />
    </div>
    </>
)
}