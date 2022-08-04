export type CardProps = {
  title: string
  description: string
  link?: string
}

export default function Card(props: CardProps) {
  return (
    <a
      className='bg-white flex flex-col self-center justify-center min-h-60 min-w-full p-8 border rounded-md justify-self-center border-grey-600 hover:border-blue-600 hover:text-blue-600'
      href={props.link}
    >
      <h2 className='text-xl font-bold'>{props.title}</h2>
      <p className='text-gray-800'>{props.description}</p>
    </a>
  )
}
