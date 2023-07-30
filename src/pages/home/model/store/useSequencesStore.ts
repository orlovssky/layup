import { create } from 'zustand'

import { Store } from '../../lib/typings/scrollSequences'

const useTableStore = create<Store>((set) => ({
  sequences: [],
  setSequences: (sequences) => set(() => ({ sequences })),
  count: 78,
}))

export default useTableStore
