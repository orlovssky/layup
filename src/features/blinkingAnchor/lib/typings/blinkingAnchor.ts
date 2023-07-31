export type RepeatTick = 2 | 4 | 6

export interface Props {
  text: string
  link: string
  delays?: number[]
  delayTick?: number
  repeats?: number[]
  repeatTick?: RepeatTick
  blinkOnMount?: boolean
  blinkOnHover?: boolean
}

export interface Ref {
  current: HTMLAnchorElement | null
}
