export default (...values: number[]): (() => number) => {
  const min = Math.min(...values)
  const max = Math.max(...values)
  let tick = min % 2 === 0 ? min - 1 : min
  const idle: number[] = [tick]

  while (idle[idle.length - 1] < max) {
    tick += 2
    idle.push(tick)
  }

  let usable: number[] = [...idle]

  return () => {
    if (!usable.length) {
      usable = [...idle]
    }

    const repeat = usable[Math.floor(Math.random() * usable.length)]
    usable = usable.filter((repeatUsable) => repeatUsable !== repeat)

    return repeat
  }
}
