import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/Navbar.css'
import './components/ListaOggetti.css'


import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App.jsx'
import Navbar from './components/Navbar'
import ListaOggetti from './components/ListaOggetti'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <ListaOggetti />
  </StrictMode>,
)
