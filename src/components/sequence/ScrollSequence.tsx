import { ScrollTrigger } from 'gsap-trial/ScrollTrigger'
import { gsap } from 'gsap-trial'
import { useEffect, useRef } from 'react'

import './ScrollSequence.scss'

const sequencesCount = 44
gsap.registerPlugin(ScrollTrigger)

const ScrollSequence = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    Promise.all(
      Array.from(Array(sequencesCount)).map(
        (_, index) =>
          import(`../../assets/images/sequences/sequence_${index}.png`)
      )
    ).then((importedSequences) => {
      const canvasContext = canvasRef.current?.getContext('2d')

      if (canvasContext && canvasRef.current) {
        canvasRef.current.width = document.body.clientWidth
        canvasRef.current.height = document.body.clientHeight
        const sequenceImages: HTMLImageElement[] = importedSequences.map(
          (importedSequence) => {
            const image = new Image()
            image.src = importedSequence.default

            return image
          }
        )
        const frames = { frame: 0 }

        gsap.to(frames, {
          frame: sequencesCount - 1,
          snap: 'frame',
          ease: 'none',
          scrollTrigger: {
            trigger: '.start',
            end: '.end',
            scrub: 0.5,
          },
          onUpdate: () => {
            if (canvasRef.current) {
              console.log(frames.frame)
              const { width, height } = canvasRef.current
              canvasContext.clearRect(0, 0, width, height)
              canvasContext.drawImage(sequenceImages[frames.frame], 0, 0)
            }
          },
        })
      }
    })
  }, [])

  return (
    <>
      <canvas ref={canvasRef} />
      <div className="start" />
      <div className="end" />
    </>
  )
}

export default ScrollSequence
