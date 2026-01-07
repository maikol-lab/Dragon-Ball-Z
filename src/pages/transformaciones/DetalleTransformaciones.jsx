import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

const API = "https://dragonball-api.com/api/transformations/";

const DetalleTransformaciones = () => {
    const [datos, setDatos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = useParams();
    const id = params.id;
    const URI = API + id;

    const getDatos = async () => {
        try {
            const response = await fetch(URI);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Datos de transformación:", data); // Para depuración
            setDatos(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatos();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-dark dark:text-light">Cargando Transformación...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5">
                <h4 className="text-danger">Error al cargar la transformación</h4>
                <p className="text-dark dark:text-light">{error}</p>
            </div>
        );
    }

    if (!datos) {
        return (
            <div className="text-center py-5">
                <h4 className="text-dark dark:text-light">Transformación no encontrada</h4>
            </div>
        );
    }

    return (
        <div className="container pt-5 mt-5">
            <div className="text-end py-5">
                <Link to={"/transformaciones"} className="btn btn-secondary">
                    <FaBackward /> Regresar
                </Link>
            </div>

            <h4 className="text-center py-4 fw-bold fs-4 text-dark dark:text-light">
                Detalle de {datos.name}
            </h4>

            <div className="row">
                <div className="col-md-4">
                    <img
                        src={datos.image}
                        className="img-fluid rounded shadow"
                        alt={datos.name}
                        style={{
                            maxHeight: "400px",
                            objectFit: "contain",
                            width: "100%",
                            backgroundColor: "#f8f9fa",
                            padding: "15px"
                        }}
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x500/333/fff?text=Imagen+no+disponible";
                            e.target.style.objectFit = "contain";
                        }}
                    />
                </div>

                <div className="col-md-8">
                    <h5 className="py-4 fw-bold fs-4 text-dark dark:text-light">{datos.name}</h5>

                    <div className="mb-4">
                        <p className="text-dark dark:text-light">
                            <b className="text-dark dark:text-light">Energía (Ki):</b>{" "}
                            <span className="badge rounded-pill text-bg-danger p-2 fs-6">
                                {datos.ki || "Desconocida"}
                            </span>
                            <br />
                            <b className="text-dark dark:text-light">Energía Máxima:</b>{" "}
                            <span className="badge rounded-pill text-bg-warning p-2 fs-6">
                                {datos.maxKi || "Desconocida"}
                            </span>
                            <br />
                            <b className="text-dark dark:text-light">Tipo de Transformación:</b> <span className="text-dark dark:text-light">{datos.type || "Desconocido"}</span><br />
                            <b className="text-dark dark:text-light">Raza:</b> <span className="text-dark dark:text-light">{datos.race || "Desconocida"}</span><br />
                            <b className="text-dark dark:text-light">Género:</b> <span className="text-dark dark:text-light">{datos.gender || "Desconocido"}</span><br />
                            <b className="text-dark dark:text-light">Afiliación:</b> <span className="text-dark dark:text-light">{datos.affiliation || "Desconocida"}</span>
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold text-dark dark:text-light">Descripción:</h6>
                        <p className="lead text-dark dark:text-light">
                            {datos.description || "No hay descripción disponible para esta transformación."}
                        </p>
                    </div>

                    {/* Información del personaje base si está disponible */}
                    {datos.character && (
                        <div className="mb-4">
                            <div className="card border-0 shadow-sm">
                                <div className="card-header bg-primary text-white">
                                    <h6 className="mb-0">
                                        <i className="bi bi-person-badge me-2"></i>
                                        Personaje Base
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        {/* Imagen del personaje */}
                                        <div className="col-md-3 text-center mb-3 mb-md-0">
                                            <div className="position-relative" style={{ width: "140px", margin: "0 auto" }}>
                                                <img
                                                    src={datos.character.image}
                                                    alt={datos.character.name}
                                                    className="img-fluid rounded shadow"
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        maxHeight: "180px",
                                                        objectFit: "contain",
                                                        backgroundColor: "#f8f9fa",
                                                        padding: "8px"
                                                    }}
                                                    onError={(e) => {
                                                        e.target.src = "https://via.placeholder.com/140x180/333/fff?text=Personaje";
                                                        e.target.style.objectFit = "contain";
                                                        e.target.style.padding = "15px";
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Información del personaje */}
                                        <div className="col-md-9">
                                            <h5 className="fw-bold mb-3 text-dark dark:text-light">{datos.character.name || "Personaje Desconocido"}</h5>

                                            <div className="row mb-3">
                                                <div className="col-sm-6 col-md-4 mb-2">
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-danger me-2">KI</span>
                                                        <span className="fw-semibold text-dark dark:text-light">{datos.character.ki || "Desconocido"}</span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-md-4 mb-2">
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-info me-2">RAZA</span>
                                                        <span className="text-dark dark:text-light">{datos.character.race || "Desconocida"}</span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-md-4 mb-2">
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-success me-2">GÉNERO</span>
                                                        <span className="text-dark dark:text-light">{datos.character.gender || "Desconocido"}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {datos.character.description && (
                                                <div className="mb-3">
                                                    <p className="text-muted small dark:text-gray-400">
                                                        <i>{datos.character.description.substring(0, 150)}...</i>
                                                    </p>
                                                </div>
                                            )}

                                            {datos.character.id && (
                                                <div className="d-flex flex-wrap gap-2">
                                                    <Link
                                                        to={`/detallepersonajes/${datos.character.id}`}
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        <i className="bi bi-eye me-1"></i>
                                                        Ver Detalles Completos
                                                    </Link>
                                                    {datos.character.originPlanet && (
                                                        <button className="btn btn-outline-secondary btn-sm">
                                                            <i className="bi bi-globe me-1"></i>
                                                            Planeta: {datos.character.originPlanet.name || "Desconocido"}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Otras transformaciones relacionadas si existen */}
                    {datos.otherTransformations && datos.otherTransformations.length > 0 && (
                        <div className="mt-4">
                            <h6 className="fw-bold mb-3 text-dark dark:text-light">Otras Transformaciones Relacionadas:</h6>
                            <div className="row row-cols-1 row-cols-md-2 g-3">
                                {datos.otherTransformations.slice(0, 4).map((trans) => (
                                    <div className="col" key={trans.id}>
                                        <div className="d-flex align-items-center bg-light p-2 rounded">
                                            <img
                                                src={trans.image}
                                                alt={trans.name}
                                                className="rounded me-2"
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover"
                                                }}
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/60x60/333/fff?text=T";
                                                    e.target.style.objectFit = "contain";
                                                }}
                                            />
                                            <div>
                                                <h6 className="mb-0 small text-dark dark:text-light">{trans.name}</h6>
                                                <small className="text-muted dark:text-gray-400">
                                                    Ki: {trans.ki || "N/A"}
                                                </small>
                                                <br />
                                                <Link
                                                    to={`/detalletransformaciones/${trans.id}`}
                                                    className="btn btn-sm btn-outline-info mt-1"
                                                    style={{ fontSize: "0.7rem" }}
                                                >
                                                    Ver
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetalleTransformaciones;