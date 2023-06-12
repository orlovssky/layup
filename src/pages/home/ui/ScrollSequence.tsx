import { ScrollTrigger } from 'gsap-trial/ScrollTrigger'
import { gsap } from 'gsap-trial'
import { useEffect, useRef } from 'react'

import scrollSequenceClasses from '../assets/styles/scrollSequence.module.css'

const framesCount = 42
gsap.registerPlugin(ScrollTrigger)

const ScrollSequence = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      Promise.all(
        Array.from(Array(framesCount)).map(
          (_, index) => import(`../assets/images/kobe/kobe_${index}.png`)
        )
      ).then((importedImages) => {
        const canvasContext = canvasRef.current?.getContext('2d')

        if (canvasContext && canvasRef.current) {
          const frames = { frame: 0 }
          canvasRef.current.width = window.innerWidth
          canvasRef.current.height = window.innerHeight
          const images: HTMLImageElement[] = importedImages.map(
            (importedImage) => {
              const image = new Image()
              image.src = importedImage.default

              return image
            }
          )

          gsap.to(frames, {
            frame: framesCount - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
              end: 800,
              scrub: 0.5,
            },
            onUpdate: () => {
              if (canvasRef.current) {
                const { width, height } = canvasRef.current

                canvasContext.clearRect(0, 0, width, height)
                canvasContext.drawImage(
                  images[frames.frame],
                  0,
                  0,
                  width,
                  height
                )
              }
            },
          })
        }
      })
    }, canvasRef)

    return () => gsapContext.kill()
  }, [])

  return <canvas ref={canvasRef} className={scrollSequenceClasses.canvas} />
}

export default ScrollSequence
