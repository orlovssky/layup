import App from 'app'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
