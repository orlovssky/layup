import { ReactElement } from 'react'

export interface Props {
  children: ReactElement
}

export type ContainerRef = {
  current: HTMLDivElement | null
}
