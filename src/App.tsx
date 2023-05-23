import { MouseEventHandler } from 'react'

import './App.scss'

const App = () => {
  const handleMouseMove: MouseEventHandler = (event) => {
    if (event.target instanceof HTMLSpanElement) {
      const {
        target: { offsetLeft, offsetTop },
        pageX,
        pageY,
      } = event
      const halfWidth = event.target.offsetWidth / 2
      const halfHeight = event.target.offsetHeight / 2
      const positionToCenter = Math.floor(
        Math.sqrt(
          Math.pow(pageX - (offsetLeft + halfWidth), 2) +
            Math.pow(pageY - (offsetTop + halfHeight), 2)
        )
      )

      console.log(Math.floor((100 * positionToCenter) / halfWidth))
    }
  }

  return (
    <>
      <span onMouseMove={handleMouseMove}>basketball</span>
    </>
  )
}

export default App
