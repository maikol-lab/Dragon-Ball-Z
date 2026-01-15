import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Personajes from './pages/personajes/Personajes'
import DetallePersonajes from './pages/personajes/DetallePersonajes'
import Transformaciones from './pages/transformaciones/Transformaciones'
import DetalleTransformaciones from './pages/transformaciones/DetalleTransformaciones'
import Planetas from './pages/planetas/Planteas'
import DetallePlanetas from './pages/planetas/DetallePlanetas'
import Busquedas from './pages/Busquedas'
import Error404 from './pages/Error404'

// animaciones
import 'animate.css';
import WOW from 'wow.js';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  // inicializar WOW.js para las animaciones
  useEffect(() => {
    const wow = new WOW({
      live: true // detecta elementos dinámicos
    });
    wow.init();

    // Establecer tema inicial
    updateTheme(darkMode);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    updateTheme(newDarkMode);
  };

  const updateTheme = (isDark) => {
    if (isDark) {
      document.body.setAttribute('data-bs-theme', 'dark');
      document.body.classList.add('bg-dark', 'text-light');
      document.body.classList.remove('bg-light', 'text-dark');
    } else {
      document.body.setAttribute('data-bs-theme', 'light');
      document.body.classList.add('bg-light', 'text-dark');
      document.body.classList.remove('bg-dark', 'text-light');
    }
  };

  return (
    <BrowserRouter>
      <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/personajes' element={<Personajes />} />
          <Route path='/detallepersonajes/:id' element={<DetallePersonajes />} />
          <Route path='/transformaciones' element={<Transformaciones />} />
          <Route path='/detalletransformaciones/:id' element={<DetalleTransformaciones />} />
          <Route path='/planetas' element={<Planetas />} />
          <Route path='/detalleplanetas/:id' element={<DetallePlanetas />} />
          <Route path='/busquedas' element={<Busquedas />} />

          <Route path='/error404' element={<Error404 />} />
          <Route path='*' element={<Inicio />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App