import Letters from './Letters'
import ScrollSequence from './ScrollSequence'

const Home = () => {
  return (
    <main>
      <Letters />
      <ScrollSequence />
      <div
        style={{
          height: '100vh',
        }}
      />
      <div
        style={{
          height: 6000,
        }}
      />
    </main>
  )
}

export default Home
