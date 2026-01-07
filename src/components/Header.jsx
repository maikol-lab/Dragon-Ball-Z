import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FiltroPlanetas from './FiltroPlanetas'
import { FaSun, FaMoon } from 'react-icons/fa'

const Header = ({ darkMode, toggleTheme }) => {
    const [busqueda, setBusqueda] = useState('');
    const navigate = useNavigate();

    const handleBuscar = (e) => {
        e.preventDefault();
        if (busqueda.trim()) {
            navigate('/busquedas', { state: busqueda.trim() });
            setBusqueda('');
        }
    };

    return (
        <header id="nav" className="site-header position-fixed text-white bg-dark">
            <nav id="navbar-example2" className="navbar navbar-expand-lg py-2">
                <div className="container">
                    {/* Logo */}
                    <a className="navbar-brand" href="./index.html">
                        <img src="images/Dragon-Ball-Logo.png" alt="Dragon Ball" width={150} />
                    </a>

                    {/* Botón menú móvil */}
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2" aria-label="Toggle navigation">
                        <ion-icon name="menu-outline" style={{ fontSize: 30 }} />
                    </button>

                    {/* Elementos de navegación para desktop - ALINEADOS */}
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'inicio'} className="nav-link active me-3">
                                    Inicio
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'personajes'} className="nav-link me-3">
                                    Personajes
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'transformaciones'} className="nav-link me-3">
                                    Transformaciones
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'planetas'} className="nav-link me-3">
                                    Planetas
                                </Link>
                            </li>

                            {/* Dropdown de Filtro Planetas */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle me-3"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                    role="button"
                                    aria-expanded="false">
                                    Filtro Planetas
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <FiltroPlanetas />
                                </ul>
                            </li>
                        </ul>

                        {/* Buscador y Tema - ALINEADOS A LA DERECHA */}
                        <div className="d-flex align-items-center">
                            {/* Buscador */}
                            <form className="d-flex me-3" onSubmit={handleBuscar} style={{ minWidth: "250px" }}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-white border-secondary"
                                        placeholder="Buscar..."
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                        style={{
                                            borderRight: "none",
                                            fontSize: "0.9rem"
                                        }}
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="submit"
                                        disabled={!busqueda.trim()}
                                        style={{
                                            borderLeft: "none",
                                            borderColor: "#6c757d"
                                        }}
                                    >
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </form>

                            {/* Botón Tema Claro/Oscuro */}
                            <button
                                onClick={toggleTheme}
                                className="btn btn-outline-light d-flex align-items-center"
                                style={{
                                    whiteSpace: "nowrap",
                                    fontSize: "0.9rem",
                                    padding: "6px 12px"
                                }}>
                                {darkMode ? (
                                    <>
                                        <FaSun className="me-1" />
                                        <span>Claro</span>
                                    </>
                                ) : (
                                    <>
                                        <FaMoon className="me-1" />
                                        <span>Oscuro</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Header