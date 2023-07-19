export default () => {
  if ('maxTouchPoints' in navigator) {
    return navigator.maxTouchPoints > 0
  } else {
    const { matches } = matchMedia('(pointer: coarse)')

    return matches
  }
}
