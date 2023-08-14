let deviceType: 'desktop' | 'mobile' = 'desktop'

if (
  ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) ||
  matchMedia('(pointer: coarse)').matches
) {
  deviceType = 'mobile'
}

export default deviceType
