import BlinkingAnchor from 'features/blinkingAnchor'
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { deviceType } from 'shared/lib'

import topBarClasses from '../assets/styles/topBar.module.css'
import anchors from '../lib/static/anchors'

const blinkOnHover = deviceType === 'desktop'
const blinkOnMount = deviceType === 'mobile'

const TopBar = () => {
  const { t } = useTranslation()

  return (
    <div className={topBarClasses.bar}>
      {anchors.map((anchor, anchorIndex) => (
        <BlinkingAnchor
          key={`${nanoid()}-${anchorIndex}`}
          text={t(anchor.translationNode)}
          link={anchor.link}
          blinkOnHover={blinkOnHover}
          blinkOnMount={blinkOnMount}
        />
      ))}
    </div>
  )
}

export default TopBar
