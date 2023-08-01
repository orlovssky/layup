import { create } from 'zustand'

import { Store } from '../../lib/typings/scrollSequences'

const useTableStore = create<Store>((set) => ({
  sequences: [],
  setSequences: (sequences) => set(() => ({ sequences })),
  count: 71,
  loaded: 0,
  resetLoaded: () => set(() => ({ loaded: 0 })),
  incrementLoaded: () => set(({ loaded }) => ({ loaded: loaded + 1 })),
}))

export default useTableStore
