export default (x: number, y: number, tick = 0.1): (() => number) => {
  const minDelay = Math.min(x, y)
  const maxDelay = Math.max(x, y)
  const delays: number[] = [minDelay]

  while (delays[delays.length - 1] <= maxDelay) {
    delays.push(+(delays[delays.length - 1] + tick).toFixed(1))
  }

  let filterableDelays: number[] = [...delays]

  return () => {
    if (!filterableDelays.length) {
      filterableDelays = [...delays]
    }

    const randomIndex = Math.floor(Math.random() * filterableDelays.length)
    const randomDelay = filterableDelays[randomIndex]

    filterableDelays = filterableDelays.filter(
      (filterableDelay) => filterableDelay !== randomDelay
    )

    return randomDelay
  }
}
