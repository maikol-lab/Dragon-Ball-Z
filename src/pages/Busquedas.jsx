import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const API_CHARACTERS = 'https://dragonball-api.com/api/characters?page=1&limit=100';
const API_PLANETS = 'https://dragonball-api.com/api/planets?page=1&limit=100';
const API_TRANSFORMATIONS = 'https://dragonball-api.com/api/transformations?page=1&limit=100';

const Busquedas = () => {
    const [resultados, setResultados] = useState({
        personajes: [],
        planetas: [],
        transformaciones: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate(); // Agregado para redirección
    const txtBuscar = location.state?.toLowerCase() || '';

    const buscarEnDatos = async () => {
        try {
            setLoading(true);

            // Si no hay término de búsqueda, redirigir a error404
            if (!txtBuscar.trim()) {
                navigate('/error404');
                return;
            }

            const [resPersonajes, resPlanetas, resTransformaciones] = await Promise.all([
                fetch(API_CHARACTERS).then(r => r.json()),
                fetch(API_PLANETS).then(r => r.json()),
                fetch(API_TRANSFORMATIONS).then(r => r.json())
            ]);

            // Filtrar personajes
            const personajesFiltrados = (resPersonajes.items || [])
                .filter(item =>
                    item.name?.toLowerCase().includes(txtBuscar) ||
                    item.race?.toLowerCase().includes(txtBuscar) ||
                    item.affiliation?.toLowerCase().includes(txtBuscar)
                );

            // Filtrar planetas
            const planetasFiltrados = (resPlanetas.items || [])
                .filter(item =>
                    item.name?.toLowerCase().includes(txtBuscar) ||
                    item.description?.toLowerCase().includes(txtBuscar)
                );

            // Filtrar transformaciones
            const transformacionesFiltradas = (resTransformaciones.items || resTransformaciones || [])
                .filter(item =>
                    item.name?.toLowerCase().includes(txtBuscar) ||
                    item.type?.toLowerCase().includes(txtBuscar)
                );

            setResultados({
                personajes: personajesFiltrados.slice(0, 20),
                planetas: planetasFiltrados.slice(0, 20),
                transformaciones: Array.isArray(transformacionesFiltradas) ?
                    transformacionesFiltradas.slice(0, 20) : []
            });

            setLoading(false);

            // Verificar si no hay resultados después de cargar
            const totalResultados =
                personajesFiltrados.length +
                planetasFiltrados.length +
                transformacionesFiltradas.length;

            if (totalResultados === 0) {
                navigate('/error404', { state: { searchTerm: txtBuscar } });
            }

        } catch (err) {
            console.error("Error en búsqueda:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarEnDatos();
    }, [txtBuscar]);

    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Buscando "{txtBuscar}"...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="text-center text-danger">
                    <h4>Error en la búsqueda</h4>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-primary mt-3"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    const totalResultados =
        resultados.personajes.length +
        resultados.planetas.length +
        resultados.transformaciones.length;

    // Si no hay resultados (aunque debería haberse redirigido ya), redirigir a 404
    if (totalResultados === 0) {
        navigate('/error404', { state: { searchTerm: txtBuscar } });
        return null;
    }

    return (
        <div className="container py-4">
            <h4 className="text-center mb-4">
                Resultados de búsqueda para: "{txtBuscar}"
                <small className="d-block text-muted fs-6 mt-1">
                    {totalResultados} resultado{totalResultados !== 1 ? 's' : ''} encontrado{totalResultados !== 1 ? 's' : ''}
                </small>
            </h4>

            {/* Personajes - IMÁGENES CORREGIDAS */}
            {resultados.personajes.length > 0 && (
                <div className="mb-5">
                    <h5 className="border-bottom pb-2 mb-4 py-5">
                        <i className="bi bi-people-fill me-2 text-primary"></i>
                        Personajes ({resultados.personajes.length})
                    </h5>
                    <div className="row">
                        {resultados.personajes.map((item) => (
                            <div key={`personaje-${item.id}`} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                <div className="card h-100 shadow-sm border-0">
                                    {/* Contenedor de imagen mejorado */}
                                    <div className="card-img-container position-relative"
                                        style={{
                                            height: "350px",
                                            overflow: "hidden",
                                            backgroundColor: "#f8f9fa"
                                        }}>
                                        <img
                                            src={item.image}
                                            className="position-absolute top-50 start-50 translate-middle"
                                            alt={item.name}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                                objectPosition: "center",
                                                padding: "15px",
                                                maxWidth: "100%",
                                                maxHeight: "100%"
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/300x280/333/fff?text=Imagen+no+disponible";
                                                e.target.style.objectFit = "cover";
                                                e.target.style.padding = "0";
                                            }}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-title fw-bold text-truncate">{item.name}</h6>
                                        <p className="card-text small">
                                            <b>Raza:</b> {item.race || "Desconocida"}<br />
                                            <b>Ki:</b> {item.ki || "N/A"}<br />
                                            <b>Género:</b> {item.gender || "Desconocido"}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white border-top-0">
                                        <Link
                                            to={`/detallepersonajes/${item.id}`}
                                            className="btn btn-primary btn-sm w-100"
                                        >
                                            Ver Detalles
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Planetas - IMÁGENES CORREGIDAS */}
            {resultados.planetas.length > 0 && (
                <div className="mb-5">
                    <h5 className="border-bottom pb-2 mb-4 py-5">
                        <i className="bi bi-globe-americas me-2 text-success"></i>
                        Planetas ({resultados.planetas.length})
                    </h5>
                    <div className="row">
                        {resultados.planetas.map((item) => (
                            <div key={`planeta-${item.id}`} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="card-img-container position-relative"
                                        style={{
                                            height: "220px",
                                            overflow: "hidden",
                                            backgroundColor: "#0a1e2e"
                                        }}>
                                        <img
                                            src={item.image}
                                            className="position-absolute top-50 start-50 translate-middle"
                                            alt={item.name}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                objectPosition: "center"
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/300x220/0a1e2e/fff?text=Planeta";
                                                e.target.style.objectFit = "contain";
                                                e.target.style.padding = "20px";
                                            }}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-title fw-bold">{item.name}</h6>
                                        <p className="card-text small">
                                            <b>Estado:</b>{' '}
                                            <span className={`badge ${item.isDestroyed ? 'bg-danger' : 'bg-success'}`}>
                                                {item.isDestroyed ? "Destruido" : "Activo"}
                                            </span>
                                            <br />
                                            {item.description?.substring(0, 80)}...
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white border-top-0">
                                        <Link
                                            to={`/detalleplanetas/${item.id}`}
                                            className="btn btn-success btn-sm w-100"
                                        >
                                            Ver Planeta
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Transformaciones - IMÁGENES CORREGIDAS */}
            {resultados.transformaciones.length > 0 && (
                <div className="mb-5">
                    <h5 className="border-bottom pb-2 mb-4 py-5">
                        <i className="bi bi-lightning-charge-fill me-2 text-warning"></i>
                        Transformaciones ({resultados.transformaciones.length})
                    </h5>
                    <div className="row">
                        {resultados.transformaciones.map((item) => (
                            <div key={`transformacion-${item.id}`} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="card-img-container position-relative"
                                        style={{
                                            height: "250px",
                                            overflow: "hidden",
                                            backgroundColor: "#1a1a2e"
                                        }}>
                                        <img
                                            src={item.image}
                                            className="position-absolute top-50 start-50 translate-middle"
                                            alt={item.name}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                                objectPosition: "center",
                                                padding: "10px"
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/300x250/1a1a2e/fff?text=Transformación";
                                                e.target.style.objectFit = "contain";
                                                e.target.style.padding = "25px";
                                            }}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-title fw-bold">{item.name}</h6>
                                        <p className="card-text small">
                                            <b>Tipo:</b> {item.type || "Desconocido"}<br />
                                            <b>Ki:</b> {item.ki || "N/A"}<br />
                                            <b>Personaje:</b> {item.character || "Desconocido"}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white border-top-0">
                                        <Link
                                            to={`/detalletransformaciones/${item.id}`}
                                            className="btn btn-warning btn-sm w-100"
                                        >
                                            Ver Transformación
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Resumen */}
            <div className="card bg-light border-0 mt-4">
                <div className="card-body text-center">
                    <h6>Resumen de búsqueda</h6>
                    <div className="d-flex justify-content-center gap-4 mt-3">
                        <div className="text-center">
                            <span className="badge bg-primary fs-5">{resultados.personajes.length}</span>
                            <p className="small mt-1 mb-0">Personajes</p>
                        </div>
                        <div className="text-center">
                            <span className="badge bg-success fs-5">{resultados.planetas.length}</span>
                            <p className="small mt-1 mb-0">Planetas</p>
                        </div>
                        <div className="text-center">
                            <span className="badge bg-warning fs-5">{resultados.transformaciones.length}</span>
                            <p className="small mt-1 mb-0">Transformaciones</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Busquedas;