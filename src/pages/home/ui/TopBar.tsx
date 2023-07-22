import BlinkingAnchor from 'features/blinkingAnchor'
import { nanoid } from 'nanoid'
import { deviceType } from 'shared/lib'

import topBarClasses from '../assets/styles/topBar.module.css'
import anchors from '../lib/static/anchors'

const blinkOnHover = deviceType === 'desktop'
const blinkOnMount = deviceType === 'mobile'

const TopBar = () => {
  return (
    <div className={topBarClasses.bar}>
      {anchors.map((anchor, anchorIndex) => (
        <BlinkingAnchor
          key={`${nanoid()}-${anchorIndex}`}
          text={anchor.text}
          link={anchor.link}
          blinkOnHover={blinkOnHover}
          blinkOnMount={blinkOnMount}
        />
      ))}
    </div>
  )
}

export default TopBar
