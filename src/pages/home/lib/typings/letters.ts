import { RefObject } from 'react'

export interface Letter {
  ref: RefObject<SVGPathElement>
  id: string
  value: string
  idle: string
  stretched: string
  tween: GSAPTween | null
}
