import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import './index.css';
import { ProfileProvider } from './components/Home/ProfileContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfileProvider>
       <App />
      </ProfileProvider>
  </StrictMode>
)
