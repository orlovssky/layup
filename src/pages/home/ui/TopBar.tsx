import BlinkingAnchor from 'features/blinkingAnchor'
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { deviceType } from 'shared/lib'

import topBarClasses from '../assets/styles/topBar.module.css'
import blinkingAnchors from '../lib/static/blinkingAnchors'

const blinkOnHover = deviceType === 'desktop'
const blinkOnMount = deviceType === 'mobile'

const TopBar = () => {
  const { t } = useTranslation()

  return (
    <div className={topBarClasses.bar}>
      {blinkingAnchors.map(({ translationNode, link }, index) => (
        <BlinkingAnchor
          key={`${nanoid()}-${index}`}
          text={t(translationNode)}
          link={link}
          blinkOnHover={blinkOnHover}
          blinkOnMount={blinkOnMount}
        />
      ))}
    </div>
  )
}

export default TopBar
