import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import customTheme from './utils/pageTheme'
import RouterApp from './routes/RouterApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <RouterApp />
    </ThemeProvider>
  </StrictMode>,
)
