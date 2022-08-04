import Head from 'next/head'
import Header from '../components/organisms/Header'
import Cards from '../components/organisms/Cards'
import pageContent from '../pages/api/rooms/roomData.json'
import { url } from 'inspector'

export async function getStaticProps() {
  return {
    props: {
      pageContent
    }
  }
}

export default function Home(props) {
  return (
    <>

      <Head>
        <title>Fairground Games – Playground</title>
      </Head>
      <section className='flex flex-col w-full min-h-screen bg-no-repeat bg-left-top' style={{backgroundImage: 'url(/diamonds2.PNG)'}}>
        <main className='flex flex-col justify-center min-h-screen py-20'>
          <Header
            title='Fairground Games'
            subTitle='Tests for procedurally created Cannon bodies in a React environment'
            linkText='Link to the GitHub repository'
            linkUrl='https://github.com/davidefritz/fairground'
          />
          <Cards cards={props.pageContent} />
        </main>
      </section>

    </>
  )
}
