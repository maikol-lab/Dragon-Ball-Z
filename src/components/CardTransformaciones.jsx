import { Link } from 'react-router-dom';
import { useState } from 'react';

const CardTransformaciones = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div
                className="card h-100 shadow-sm card-transformacion animate__animated animate__zoomIn"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    transition: 'all 0.4s ease-in-out',
                    transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: isHovered
                        ? '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(220, 53, 69, 0.5)'
                        : '0 5px 15px rgba(0, 0, 0, 0.1)',
                    border: isHovered ? '2px solid #dc3545' : '1px solid rgba(0,0,0,.125)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                }}
            >
                <div className="card-header p-0 overflow-hidden position-relative">
                    <img
                        src={item.image}
                        className={`card-img-top ${isHovered ? 'animate__animated animate__pulse' : ''}`}
                        alt={item.name}
                        style={{
                            height: "400px",
                            objectFit: "contain",
                            width: "100%",
                            backgroundColor: "#f8f9fa",
                            padding: "10px",
                            transition: 'all 0.5s ease',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                            filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)'
                        }}
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300x400/333/fff?text=No+Image";
                            e.target.style.objectFit = "contain";
                        }}
                    />
                    <div className={`hover-overlay ${isHovered ? 'show' : ''}`}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(to bottom, rgba(220, 53, 69, 0.2), rgba(13, 110, 253, 0.2))',
                            opacity: isHovered ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                            pointerEvents: 'none'
                        }}
                    />
                </div>
                <div className="card-body text-center bg-dark text-white"
                    style={{ borderTop: '2px solid #dc3545', background: 'linear-gradient(135deg, #1a1a1a 0%, #2d0a0a 100%)' }}>
                    <p className="card-title fw-bold fs-4 animate__animated animate__fadeInDown animate__faster text-transform"
                        style={{
                            color: isHovered ? '#ff4d4d' : '#ffffff',
                            transition: 'color 0.3s ease, transform 0.3s ease',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                            textShadow: isHovered ? '0 0 10px rgba(220, 53, 69, 0.6)' : 'none'
                        }}>
                        {item.name}
                    </p>
                    <div className="animate__animated animate__fadeIn animate__delay-1s info-details">
                        <p className="mb-1">
                            <b className="text-danger">Ki:</b> <span className="fw-bold">
                                {item.ki && item.ki !== "unknown" ? item.ki : "No disponible"}
                            </span>
                        </p>
                        <p className="mb-1 small"><b>Personaje:</b> {item.character || "Desconocido"}</p>
                        <span className="badge bg-danger mt-1">{item.type || "No especificado"}</span>
                    </div>
                </div>
                <div className="card-footer text-center bg-dark border-0 pb-3">
                    <a href="#"
                        className={`btn btn-outline-info btn-sm mx-2 ${isHovered ? 'animate__animated animate__bounce' : ''}`}
                        data-bs-toggle="modal"
                        data-bs-target={`#modal-${item.id}`}
                        style={{
                            transition: 'all 0.3s ease',
                            fontWeight: 'bold'
                        }}>
                        👁️ Vista Rápida
                    </a>
                    <Link to={`/detalletransformaciones/${item.id}`}
                        className={`btn btn-outline-danger btn-sm ${isHovered ? 'animate__animated animate__rubberBand' : ''}`}
                        style={{
                            transition: 'all 0.3s ease',
                            fontWeight: 'bold'
                        }}>
                        🔍 Detalle
                    </Link>
                </div>
            </div>

            {/* Modal Optimizado al Estilo CardPersonajes */}
            <div className="modal fade animate__animated" id={`modal-${item.id}`} tabIndex={-1}
                aria-labelledby={`modalLabel-${item.id}`} aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" style={{ maxWidth: '850px' }}>
                    <div className="modal-content animate__animated animate__zoomIn"
                        style={{
                            maxHeight: '90vh',
                            border: '3px solid #dc3545',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            background: '#1a1a1a'
                        }}>
                        <div className="modal-header bg-danger text-white py-2 px-3">
                            <h1 className="modal-title fs-5 fw-bold" id={`modalLabel-${item.id}`}>
                                🐉 {item.name}
                            </h1>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
                        </div>

                        <div className="modal-body p-4">
                            <div className="row g-4 align-items-center">
                                {/* Imagen Lado Izquierdo */}
                                <div className="col-md-5 text-center">
                                    <div className="p-2 rounded shadow-sm">
                                        <img
                                            src={item.image}
                                            className="img-fluid animate__animated animate__rotateIn"
                                            alt={item.name}
                                            style={{ maxHeight: '350px', objectFit: 'contain' }}
                                            onError={(e) => e.target.src = "https://via.placeholder.com/300x400/333/fff?text=No+Image"}
                                        />
                                    </div>
                                </div>

                                {/* Info Lado Derecho */}
                                <div className="col-md-7 text-white">
                                    <div className="animate__animated animate__fadeInRight">
                                        {/* Estadísticas de la Transformación */}
                                        <div className="row g-2 mb-4">
                                            <div className="col-6">
                                                <div className="p-2 border border-danger rounded bg-black bg-opacity-50 text-center">
                                                    <small className="text-danger d-block fw-bold">PODER KI</small>
                                                    <span className="fw-bold text-warning">{item.ki || "N/A"}</span>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-2 border border-danger rounded bg-black bg-opacity-50 text-center">
                                                    <small className="text-danger d-block fw-bold">KI MÁXIMO</small>
                                                    <span className="fw-bold text-danger">{item.maxKi || "N/A"}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <div className="p-2 border border-secondary rounded bg-black bg-opacity-50">
                                                    <div className="d-flex justify-content-between small">
                                                        <span>👤 <b>Personaje:</b> {item.character}</span>
                                                        <span>🧬 <b>Base:</b> {item.baseCharacter}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Descripción con scroll controlado */}
                                        {item.description && (
                                            <div>
                                                <h6 className="text-warning fw-bold small mb-2">📖 SOBRE ESTA FORMA:</h6>
                                                <div className="p-3"
                                                    style={{
                                                        background: 'rgba(0, 0, 0, 0.5)',
                                                        borderRadius: '8px',
                                                        borderLeft: '4px solid #dc3545',
                                                        maxHeight: '180px',
                                                        overflowY: 'auto',
                                                        scrollbarWidth: 'thin'
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

                        <div className="modal-footer py-2 px-3 bg-dark border-top border-danger">
                            <button type="button" className="btn btn-outline-secondary btn-sm px-4 text-white" data-bs-dismiss="modal">
                                ❌ Cerrar
                            </button>
                            <Link
                                to={`/detalletransformaciones/${item.id}`}
                                className="btn btn-danger btn-sm px-4 fw-bold text-white shadow animate__animated animate__pulse animate__infinite"
                                onClick={() => {
                                    const modal = document.getElementById(`modal-${item.id}`);
                                    if (modal) {
                                        const bsModal = window.bootstrap.Modal.getInstance(modal);
                                        if (bsModal) bsModal.hide();
                                    }
                                }}
                                style={{ background: 'linear-gradient(45deg, #dc3545, #ff6b6b)', border: 'none' }}>
                                🚀 Ver Detalle Completo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardTransformaciones;