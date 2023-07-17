export interface Letter {
  id: string
  value: string
  idle: string
  stretched: string
  tween: GSAPTween | null
}

export interface LettersRef {
  map: Map<string, SVGPathElement>
  list: Letter[]
}
