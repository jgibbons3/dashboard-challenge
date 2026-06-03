import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LearningJourneyDashboard from './LearningJourneyDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LearningJourneyDashboard />
  </StrictMode>,
)
