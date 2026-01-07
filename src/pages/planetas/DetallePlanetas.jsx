import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

const API = 'https://dragonball-api.com/api/planets/';

const DetallePlanetas = () => {
    const [datos, setDatos] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Extraemos el id de los parámetros de la URL
    const { id } = useParams();

    // Definimos getDatos dentro de un useCallback o simplemente la llamamos en el useEffect
    // para asegurar que siempre use el ID más reciente de la URL.
    const getDatos = useCallback(async () => {
        try {
            setLoading(true); // Iniciamos carga cada vez que cambia el ID
            const response = await fetch(`${API}${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setDatos(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, [id]); // El fetch depende del ID

    // El useEffect ahora "escucha" cuando el ID de la URL cambia
    useEffect(() => {
        getDatos();
    }, [getDatos]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Cargando Planeta...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar el planeta</h4>
                <p>{error}</p>
                <Link to={"/planetas"} className="btn btn-outline-danger">Volver</Link>
            </div>
        );
    }

    return (
        <div className="container pt-5 mt-5">
            <div className="text-end py-5">
                <Link to={"/planetas"} className="btn btn-secondary">
                    <FaBackward className="me-2" /> Regresar
                </Link>
            </div>

            <h4 className="text-center py-4 fw-bold fs-4">Detalle de {datos.name}</h4>

            <div className="row">
                <div className="col-md-4 col-lg-3 mb-4">
                    <img
                        src={datos.image}
                        className="img-fluid rounded shadow"
                        alt={datos.name}
                    />
                </div>

                <div className="col-md-8 col-lg-9">
                    <h5 className="fw-bold fs-3">{datos.name}</h5>

                    <div className="my-3">
                        <p>
                            <b className="me-2">Estado:</b>
                            <span className={`badge rounded-pill p-2 ${datos.isDestroyed ? 'text-bg-danger' : 'text-bg-success'}`}>
                                {datos.isDestroyed ? "Destruido" : "Activo"}
                            </span>
                        </p>
                        <p>
                            <b>Descripción:</b><br />
                            {datos.description || "No hay descripción disponible para este planeta."}
                        </p>
                    </div>

                    {/* Mostrar personajes del planeta si existen */}
                    {datos.characters && datos.characters.length > 0 ? (
                        <div className="mt-5">
                            <h5 className="mb-4 border-bottom pb-2"><b>Personajes originarios de {datos.name}</b></h5>
                            <div className="row">
                                {datos.characters.map((character) => (
                                    <div className="col-md-6 col-lg-4 mb-3" key={character.id}>
                                        <div className="card h-100 shadow-sm border-0">
                                            <div className="card-header p-0 overflow-hidden">
                                                <img
                                                    src={character.image}
                                                    alt={character.name}
                                                    className="img-fluid"
                                                    style={{
                                                        height: "250px",
                                                        width: "100%",
                                                        objectFit: "contain",
                                                        backgroundColor: "#f8f9fa"
                                                    }}
                                                />
                                            </div>
                                            <div className="card-body text-center">
                                                <h6 className="card-title fw-bold">{character.name}</h6>
                                                <p className="card-text small text-muted">
                                                    <b>Raza:</b> {character.race || "N/A"}<br />
                                                    <b>Ki:</b> {character.ki || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-light mt-4">
                            No se encontraron personajes registrados para este planeta.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetallePlanetas;