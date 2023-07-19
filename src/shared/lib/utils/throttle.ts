export default (callback: (...args: unknown[]) => void, delay = 250) => {
  let shouldWait = false

  return (...args: unknown[]) => {
    if (shouldWait) {
      return
    }

    callback(...args)
    shouldWait = true
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}
