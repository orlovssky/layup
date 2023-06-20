export default (...values: number[]): (() => number) => {
  const max = Math.max(...values)
  let tick = Math.min(...values)
  const idle: number[] = [tick]

  while (idle[idle.length - 1] < max) {
    tick = +(tick + 0.1).toFixed(1)
    idle.push(tick)
  }

  let usable: number[] = [...idle]

  return () => {
    if (!usable.length) {
      usable = [...usable]
    }

    const delay = usable[Math.floor(Math.random() * usable.length)]
    usable = usable.filter((delayUsable) => delayUsable !== delay)

    return delay
  }
}
