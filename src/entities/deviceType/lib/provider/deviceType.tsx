import { ReactElement, useState, useEffect } from 'react'
import { throttle } from 'shared/lib'

import DeviceTypeContext from '../context/deviceType'
import { DeviceType } from '../typings/deviceType'
import hasTouchScreen from '../utils/hasTouchScreen'

const DeviceTypeProvider = ({ children }: { children: ReactElement }) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')

  useEffect(() => {
    const handleResize = throttle(() => {
      console.log('handleResize')
      setDeviceType(hasTouchScreen() ? 'mobile' : 'desktop')
    })

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <DeviceTypeContext.Provider value={deviceType}>
      <div>{deviceType}</div>
      {children}
    </DeviceTypeContext.Provider>
  )
}

export default DeviceTypeProvider
