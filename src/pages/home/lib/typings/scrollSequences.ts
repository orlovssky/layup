import { ReactElement } from 'react'

type Sequence = ReactElement<HTMLImageElement>

export interface Store {
  sequences: Sequence[]
  setSequences: (sequences: Sequence[]) => void
  count: number
}
