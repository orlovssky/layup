import { nanoid } from 'nanoid'
import { forwardRef, useRef, useImperativeHandle } from 'react'

import fullScreenLoaderClasses from '../assets/styles/fullScreenLoader.module.css'
import { Ref } from '../lib/typings/fullScreenLoader'

const ids = {
  gradient1: `${nanoid()}-gradient1`,
  gradient2: `${nanoid()}-gradient2`,
}

const FullScreenLoader = forwardRef<Ref>((_, ref) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useImperativeHandle(ref, () => ({
    current: svgRef.current,
  }))

  return (
    <svg
      ref={svgRef}
      className={fullScreenLoaderClasses.loader}
      viewBox="0 0 128 256"
      width="128px"
      height="256px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={ids.gradient1} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--color-primary-light))" />
          <stop offset="100%" stopColor="rgb(var(--color-primary))" />
        </linearGradient>
        <linearGradient id={ids.gradient2} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--color-primary-lighter))" />
          <stop offset="50%" stopColor="rgb(var(--color-primary-light))" />
          <stop offset="100%" stopColor="rgb(var(--color-primary))" />
        </linearGradient>
      </defs>
      <circle
        className={fullScreenLoaderClasses.ring}
        r="56"
        cx="64"
        cy="192"
        fill="none"
        stroke="#ddd"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <circle
        className={fullScreenLoaderClasses.worm1}
        r="56"
        cx="64"
        cy="192"
        fill="none"
        stroke={`url(#${ids.gradient1})`}
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray="87.96 263.89"
      />
      <path
        className={fullScreenLoaderClasses.worm2}
        d="M120,192A56,56,0,0,1,8,192C8,161.07,16,8,64,8S120,161.07,120,192Z"
        fill="none"
        stroke={`url(#${ids.gradient2})`}
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray="87.96 494"
      />
    </svg>
  )
})

FullScreenLoader.displayName = 'FullScreenLoader'

export default FullScreenLoader
