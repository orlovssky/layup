type Sequence = HTMLImageElement

export interface Store {
  sequences: Sequence[]
  setSequences: (sequences: Sequence[]) => void
  count: number
  loaded: number
  resetLoaded: () => void
  incrementLoaded: () => void
}
