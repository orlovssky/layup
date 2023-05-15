import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useEffect } from 'react'

import './App.scss'

const App = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const canvas = document.querySelector('canvas')
    const top = document.querySelector('div:nth-child(2)')
    const context = canvas?.getContext('2d')

    if (canvas && context) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const images: HTMLImageElement[] = []
      const airpods = {
        frame: 0,
      }

      for (let i = 0; i < 75; i++) {
        if (i >= 25 && i <= 63) {
          continue
        }

        const img = new Image()
        img.src = `/src/assets/images/mountain/mountain_${i}.webp`
        images.push(img)
      }

      console.log(images.length)

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

      const remove = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(images[0], 0, 0)
      }

      gsap
        .timeline({
          onUpdate: render,
          onComplete: remove,
          scrollTrigger: {
            trigger: top,
            scrub: 0.5,
          },
        })
        .to(
          airpods,
          {
            frame: 36 - 1,
            snap: 'frame',
            ease: 'none',
            duration: 0.1,
          },
          0
        )

      images[0].onload = render

      ScrollTrigger.create({ trigger: 'canvas' })
    }
  }, [])

  return (
    <>
      <div className="vh-100" />
      <div className="vh-100" />
      <canvas />
      <div className="vh-100">Лох</div>
      {/*<div className="vh-100 bg-aquamarine">100vh</div>*/}
    </>
  )
}

export default App
