import { createContext } from 'react'

import { DeviceType } from '../typings/deviceType'

const DeviceTypeContext = createContext<DeviceType>('desktop')

export default DeviceTypeContext
