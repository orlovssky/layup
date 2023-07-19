import { RepeatTick } from '../typings/blinkingAnchor'

export default (repeats: number[], tick: RepeatTick): (() => number) => {
  const minRepeat = Math.min(...repeats)
  const maxRepeat = Math.max(...repeats)
  const repeatsList: number[] = [minRepeat]

  while (repeatsList[repeatsList.length - 1] < maxRepeat) {
    repeatsList.push(repeatsList[repeatsList.length - 1] + tick)
  }

  let filterableRepeats: number[] = [...repeatsList]

  return () => {
    if (!filterableRepeats.length) {
      filterableRepeats = [...repeatsList]
    }

    const randomIndex = Math.floor(Math.random() * filterableRepeats.length)
    const randomRepeat = filterableRepeats[randomIndex]

    filterableRepeats = filterableRepeats.filter(
      (filterableRepeat) => filterableRepeat !== randomRepeat
    )

    return randomRepeat
  }
}
