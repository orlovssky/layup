import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useEffect } from 'react'

import './App.scss'

const App = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const indexImages: string[] = []

    for (let i = 1; i <= 370; i++) {
      indexImages.push(i.toString())
    }

    const loadImages = () => {
      return Promise.all(
        indexImages.map((i) => import(`./assets/images/rocket/rocket_${i}.jpg`))
      )
    }

    loadImages().then((loadedImages) => {
      const canvas = document.querySelector('canvas')
      const top = document.querySelector('.canvas')
      const context = canvas?.getContext('2d')

      if (canvas && context) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const images: HTMLImageElement[] = []
        const airpods = {
          frame: 0,
        }

        for (const image of loadedImages) {
          const img = new Image()
          img.src = image.default
          images.push(img)
        }

        const render = () => {
          context.clearRect(0, 0, canvas.width, canvas.height)
          context.drawImage(
            images[airpods.frame],
            0,
            0,
            canvas.width,
            canvas.height
          )
        }

        gsap
          .timeline({
            onUpdate: render,
            scrollTrigger: {
              trigger: top,
              scrub: 0.5,
              end: '+=400',
            },
          })
          .to(
            airpods,
            {
              frame: 370 - 1,
              snap: 'frame',
              ease: 'none',
              duration: 1,
            },
            0
          )

        ScrollTrigger.create({ trigger: 'canvas', end: '+=400' })
        images[images.length - 1].onload = render
      }
    })
  }, [])

  return (
    <>
      <div className="vh-100" />
      <canvas />
      <div className="canvas" />
      <div className="height-400" />
    </>
  )
}

export default App
