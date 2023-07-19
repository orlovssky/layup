import { DeviceTypeProvider } from 'entities/deviceType'
import Home from 'pages/home'

import './assets/styles/index.css'

const App = () => (
  <DeviceTypeProvider>
    <Home />
  </DeviceTypeProvider>
)

export default App
