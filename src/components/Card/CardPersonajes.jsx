import { useState } from 'react';
import { Link } from 'react-router-dom';

const CardPersonajes = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <article
                className="card h-100 shadow-sm border-0 overflow-hidden position-relative animate__animated animate__fadeInUp"
                style={{
                    opacity: 1,
                    transform: 'none',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '12px'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Contenedor de imagen con tamaño original (400px) */}
                <div className="position-relative overflow-hidden" style={{ height: "400px", backgroundColor: "#f8f9fa" }}>
                    <img
                        src={item.image}
                        className={`w-100 h-100 ${isHovered ? 'animate__animated animate__pulse' : ''}`}
                        alt={item.name}
                        style={{
                            objectFit: "contain",
                            objectPosition: "top center",
                            padding: "10px",
                            transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                        }}
                        onLoad={(e) => {
                            e.target.classList.add('animate__animated', 'animate__fadeIn');
                        }}
                    />
                </div>

                {/* Contenido de la tarjeta CON MARCO */}
                <div className="card-body p-4 bg-dark text-white"
                    style={{
                        border: '2px solid #0dcaf0',
                        borderTop: 'none',
                        borderBottomLeftRadius: '12px',
                        borderBottomRightRadius: '12px',
                        boxShadow: 'inset 0 0 15px rgba(13, 202, 240, 0.2)',
                        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                    }}>
                    <div className="mb-3">
                        <h3 className="card-title fw-bold mb-1 animate__animated animate__slideInDown text-center"
                            style={{
                                fontSize: '1.5rem',
                                color: '#0dcaf0',
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                            }}>
                            {item.name}
                        </h3>
                        <p className="text-light mb-0 animate__animated animate__fadeIn animate__delay-1s text-center">
                            <span className="badge bg-info me-2">{item.race || "Desconocida"}</span>
                            <span className="badge bg-warning">{item.gender || "Desconocido"}</span>
                        </p>
                    </div>

                    <div className="d-flex flex-column gap-3 animate__animated animate__fadeInUp animate__delay-1s">
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 border-secondary">
                            <span className="text-light small">🔥 Energía Base:</span>
                            <span className="fw-bold text-warning fs-5">
                                {item.ki && item.ki !== "unknown" ? item.ki : "N/A"}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 border-secondary">
                            <span className="text-light small">💥 Energía Máxima:</span>
                            <span className="fw-bold text-danger fs-5">
                                {item.maxKi && item.maxKi !== "unknown" ? item.maxKi : "N/A"}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="text-light small">🏛️ Afiliación:</span>
                            <span className="fw-bold text-info">
                                {item.affiliation || "Desconocida"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer con botones animados */}
                <div className="card-footer bg-dark border-top-0 p-3"
                    style={{
                        background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
                        borderBottomLeftRadius: '12px',
                        borderBottomRightRadius: '12px'
                    }}>
                    <div className="d-flex justify-content-center gap-2">
                        <button
                            className="btn btn-outline-info btn-sm px-3 animate__animated animate__bounceIn"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal-${item.id}`}
                            style={{ transition: 'all 200ms ease', fontWeight: 'bold' }}>
                            👁️ Vista Rápida
                        </button>

                        <Link to={`/detallepersonajes/${item.id}`}
                            className="btn btn-outline-danger btn-sm px-3 animate__animated animate__bounceIn animate__delay-1s"
                            style={{ transition: 'all 200ms ease', fontWeight: 'bold' }}>
                            🔍 Detalles
                        </Link>
                    </div>
                </div>

                <div className={`position-absolute top-0 start-0 end-0 bottom-0 border-3 ${isHovered ? 'border-info' : 'border-transparent'}`}
                    style={{
                        borderRadius: '12px',
                        pointerEvents: 'none',
                        transition: 'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}></div>
            </article>

            {/* MODAL OPTIMIZADO */}
            <div className="modal fade animate__animated"
                id={`modal-${item.id}`}
                tabIndex={-1}
                aria-labelledby={`modalLabel-${item.id}`}
                aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" style={{ maxWidth: '850px' }}>
                    <div className="modal-content animate__animated animate__zoomIn"
                        style={{
                            maxHeight: '90vh',
                            border: '3px solid #0dcaf0',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            background: '#1a1a2e'
                        }}>
                        <div className="modal-header bg-info text-white py-2 px-3">
                            <h1 className="modal-title fs-5 fw-bold" id={`modalLabel-${item.id}`}>
                                🐉 {item.name}
                            </h1>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
                        </div>

                        <div className="modal-body p-4">
                            <div className="row g-4 align-items-center">
                                {/* Imagen lado izquierdo */}
                                <div className="col-md-5 text-center">
                                    <div className="p-2 rounded shadow-sm">
                                        <img
                                            src={item.image}
                                            className="img-fluid animate__animated animate__fadeInLeft"
                                            alt={item.name}
                                            style={{ maxHeight: '350px', objectFit: 'contain' }}
                                        />
                                    </div>
                                </div>

                                {/* Info lado derecho */}
                                <div className="col-md-7 text-white">
                                    <div className="animate__animated animate__fadeInRight">
                                        {/* Estadísticas integradas en el modal */}
                                        <div className="row g-2 mb-4">
                                            <div className="col-6">
                                                <div className="p-2 border border-info rounded bg-black bg-opacity-25 text-center">
                                                    <small className="text-info d-block">Energía Base</small>
                                                    <span className="fw-bold text-warning">{item.ki || "N/A"}</span>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-2 border border-info rounded bg-black bg-opacity-25 text-center">
                                                    <small className="text-info d-block">Máximo Ki</small>
                                                    <span className="fw-bold text-danger">{item.maxKi || "N/A"}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <div className="p-2 border border-secondary rounded bg-black bg-opacity-25">
                                                    <small className="text-info me-2">🏛️ Afiliación:</small>
                                                    <span className="small">{item.affiliation}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Descripción con scroll controlado */}
                                        {item.description && (
                                            <div>
                                                <h6 className="text-warning fw-bold small mb-2">📖 HISTORIA:</h6>
                                                <div className="p-3"
                                                    style={{
                                                        background: 'rgba(0, 0, 0, 0.4)',
                                                        borderRadius: '8px',
                                                        borderLeft: '4px solid #0dcaf0',
                                                        maxHeight: '180px',
                                                        overflowY: 'auto'
                                                    }}>
                                                    <p className="small mb-0 text-light" style={{ textAlign: 'justify', lineHeight: '1.5' }}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer py-2 px-3 bg-dark border-top border-info">
                            <button type="button" className="btn btn-outline-info btn-sm px-4" data-bs-dismiss="modal">
                                ✕ Cerrar
                            </button>
                            <Link
                                to={`/detallepersonajes/${item.id}`}
                                className="btn btn-info btn-sm px-4 fw-bold text-white"
                                onClick={() => {
                                    const modal = document.getElementById(`modal-${item.id}`);
                                    if (modal) {
                                        const bsModal = window.bootstrap.Modal.getInstance(modal);
                                        if (bsModal) bsModal.hide();
                                    }
                                }}
                                style={{ background: 'linear-gradient(45deg, #0dcaf0, #20c997)', border: 'none' }}>
                                Ver Detalles Completos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPersonajes;