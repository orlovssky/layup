import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import scrollSequencesClasses from '../assets/styles/scrollSequences.module.css'
import useSequencesStore from '../model/store/useSequencesStore'

gsap.registerPlugin(ScrollTrigger)

const height = 5000

const ScrollSequences = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { sequences, count } = useSequencesStore((state) => state)

  return <div ref={containerRef}>{sequences.map((sequence) => sequence)}</div>
}

export default ScrollSequences
