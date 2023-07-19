export default (delays: number[], tick: number): (() => number) => {
  const minDelay = Math.min(...delays)
  const maxDelay = Math.max(...delays)
  const delaysList: number[] = [minDelay]

  while (delaysList[delaysList.length - 1] <= maxDelay) {
    delaysList.push(+(delaysList[delaysList.length - 1] + tick).toFixed(1))
  }

  let filterableDelays: number[] = [...delaysList]

  return () => {
    if (!filterableDelays.length) {
      filterableDelays = [...delaysList]
    }

    const randomIndex = Math.floor(Math.random() * filterableDelays.length)
    const randomDelay = filterableDelays[randomIndex]

    filterableDelays = filterableDelays.filter(
      (filterableDelay) => filterableDelay !== randomDelay
    )

    return randomDelay
  }
}
