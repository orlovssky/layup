import BlinkingAnchor from 'features/blinkingAnchor'
import { LogoIcon } from 'shared/assets'

import headerClasses from '../assets/styles/header.module.css'

const Header = () => {
  return (
    <header className={headerClasses.header}>
      <BlinkingAnchor text="NBA" link="https://www.nba.com/" />
      <LogoIcon className={headerClasses.logo} />
      <BlinkingAnchor text="FIBA" link="https://www.fiba.basketball/" />
    </header>
  )
}

export default Header
