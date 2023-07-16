export default (x: number, y: number, tick: 2 | 4 | 6 = 2): (() => number) => {
  const minRepeat = Math.min(x, y)
  const maxRepeat = Math.max(x, y)
  const repeats: number[] = [minRepeat]

  while (repeats[repeats.length - 1] < maxRepeat) {
    repeats.push(repeats[repeats.length - 1] + tick)
  }

  let filterableRepeats: number[] = [...repeats]

  return () => {
    if (!filterableRepeats.length) {
      filterableRepeats = [...repeats]
    }

    const randomIndex = Math.floor(Math.random() * filterableRepeats.length)
    const randomRepeat = filterableRepeats[randomIndex]

    filterableRepeats = filterableRepeats.filter(
      (filterableRepeat) => filterableRepeat !== randomRepeat
    )

    return randomRepeat
  }
}
