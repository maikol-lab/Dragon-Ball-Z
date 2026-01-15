import { Link } from "react-router-dom";
import { useState } from "react";

const CardPlanetas = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div
                className="card h-100 shadow-lg card-planeta animate__animated animate__flipInY"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: isHovered ? 'rotateY(10deg) translateY(-15px)' : 'rotateY(0) translateY(0)',
                    boxShadow: isHovered
                        ? '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 30px rgba(23, 162, 184, 0.5)'
                        : '0 8px 25px rgba(0, 0, 0, 0.15)',
                    border: 'none',
                    overflow: 'hidden',
                    position: 'relative',
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                }}
            >
                {/* Efecto de borde brillante */}
                <div className="border-glow" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    border: isHovered ? '2px solid transparent' : 'none',
                    background: isHovered
                        ? 'linear-gradient(45deg, transparent, #17a2b8, transparent) border-box'
                        : 'transparent',
                    mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    borderRadius: 'inherit',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s ease'
                }} />

                {/* Imagen con efecto de planeta giratorio */}
                <div className="position-relative overflow-hidden" style={{ height: "250px" }}>
                    <img
                        src={item.image}
                        className={`card-img-top ${isHovered ? 'animate__animated animate__rotateIn' : ''}`}
                        alt={item.name}
                        style={{
                            height: "100%",
                            objectFit: "cover",
                            transition: 'all 0.8s ease',
                            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)',
                            filter: isHovered
                                ? 'brightness(1.2) saturate(1.3) drop-shadow(0 0 10px rgba(23, 162, 184, 0.7))'
                                : 'brightness(1) saturate(1)'
                        }}
                    />

                    {/* Overlay de efecto cósmico */}
                    <div className="cosmic-overlay" style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at center, transparent 30%, rgba(23, 162, 184, 0.1) 70%)',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                        pointerEvents: 'none'
                    }} />

                    {/* Badge de estado */}
                    <div className={`position-absolute top-0 end-0 m-3 ${isHovered ? 'animate__animated animate__bounceIn' : ''}`}>
                        <span className={`badge ${item.isDestroyed ? 'bg-danger' : 'bg-success'} animate__animated animate__pulse animate__slower`}>
                            {item.isDestroyed ? '💥 Destruido' : '🪐 Habitado'}
                        </span>
                    </div>
                </div>

                {/* Contenido de la card */}
                <div className="card-body text-center" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                    <h5 className={`card-title fw-bold mb-3 ${isHovered ? 'animate__animated animate__rubberBand' : ''}`}
                        style={{
                            color: isHovered ? '#17a2b8' : '#ffffff',
                            transition: 'color 0.3s ease',
                            textShadow: isHovered ? '0 0 10px rgba(23, 162, 184, 0.5)' : 'none',
                            fontSize: '1.25rem',
                            letterSpacing: '0.5px'
                        }}>
                        🌌 {item.name}
                    </h5>

                    <div className="descripcion-planeta" style={{
                        height: '90px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <p className="small text-light opacity-75 animate__animated animate__fadeIn"
                            style={{
                                lineHeight: '1.4',
                                margin: 0,
                                transition: 'all 0.3s ease',
                                opacity: isHovered ? 0.9 : 0.75
                            }}>
                            {item.description?.substring(0, 70)}...
                        </p>

                        {/* Efecto de desvanecimiento */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '20px',
                            background: 'linear-gradient(to bottom, transparent, rgba(26, 26, 46, 0.9))',
                            pointerEvents: 'none'
                        }} />
                    </div>

                </div>

                {/* Botones en el footer */}
                <div className="card-footer d-flex justify-content-center"
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                    <button className={`btn btn-outline-info btn-sm mx-1 ${isHovered ? 'animate__animated animate__swing' : ''}`}
                        data-bs-toggle="modal"
                        data-bs-target={`#modal-${item.id}`}
                        style={{
                            transition: 'all 0.3s ease',
                            transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                            boxShadow: isHovered ? '0 5px 15px rgba(23, 162, 184, 0.4)' : 'none',
                            background: isHovered ? 'rgba(23, 162, 184, 0.1)' : 'transparent'
                        }}>
                        🔭 Vista Rápida
                    </button>

                    <Link to={`/detalleplanetas/${item.id}`}
                        className={`btn btn-outline-warning btn-sm mx-1 ${isHovered ? 'animate__animated animate__tada' : ''}`}
                        style={{
                            transition: 'all 0.3s ease',
                            transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                            boxShadow: isHovered ? '0 5px 15px rgba(255, 193, 7, 0.4)' : 'none',
                            background: isHovered ? 'rgba(255, 193, 7, 0.1)' : 'transparent'
                        }}>
                        🚀 Explorar
                    </Link>
                </div>

                {/* Efecto de partículas en hover */}
                <div className="particles" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    opacity: isHovered ? 0.6 : 0,
                    transition: 'opacity 0.5s ease',
                    background: 'radial-gradient(circle at 50% 50%, transparent 10%, rgba(23, 162, 184, 0.05) 20%, transparent 30%)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Modal - Mejorado con animaciones únicas */}
            <div className="modal fade animate__animated"
                id={`modal-${item.id}`}
                tabIndex={-1}
                aria-hidden="true"
                onClick={(e) => {
                    if (e.target.classList.contains('modal')) {
                        const modal = document.getElementById(`modal-${item.id}`);
                        if (modal) modal.classList.add('animate__zoomIn');
                    }
                }}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content cosmic-modal animate__animated animate__fadeInUp">
                        <div className="modal-header bg-dark text-info border-bottom border-info"
                            style={{ borderWidth: '3px' }}>
                            <h5 className="modal-title fw-bold fs-4">
                                🪐 {item.name}
                            </h5>
                            <button type="button"
                                className="btn-close btn-close-white animate__animated animate__rotateIn"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>

                        <div className="modal-body bg-dark text-light">
                            <div className="row align-items-center">
                                <div className="col-md-5 text-center">
                                    <img src={item.image}
                                        className="img-fluid rounded-circle shadow-lg animate__animated animate__rotateIn animate__delay-1s"
                                        alt={item.name}
                                        style={{
                                            border: '4px solid #17a2b8',
                                            boxShadow: '0 0 30px rgba(23, 162, 184, 0.5)',
                                            width: '250px',
                                            height: '250px',
                                            objectFit: 'cover'
                                        }} />

                                    <div className="mt-3 animate__animated animate__fadeIn animate__delay-2s">
                                        <span className={`badge ${item.isDestroyed ? 'bg-danger' : 'bg-success'} fs-6 p-2`}>
                                            {item.isDestroyed ? '💥 PLANETA DESTRUIDO' : '🪐 PLANETA HABITADO'}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-7">
                                    <div className="planet-info animate__animated animate__slideInRight animate__delay-1s">
                                        <h4 className="text-warning mb-4">📖 Descripción del Planeta</h4>
                                        <p className="lead" style={{ lineHeight: '1.6' }}>
                                            {item.description || "Información no disponible sobre este planeta."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer bg-dark border-top border-secondary animate__animated animate__fadeIn animate__delay-2s">
                            <button type="button"
                                className="btn btn-outline-light animate__animated animate__headShake"
                                data-bs-dismiss="modal"
                                onMouseEnter={(e) => e.target.classList.add('animate__wobble')}
                                onMouseLeave={(e) => e.target.classList.remove('animate__wobble')}>
                                ✨ Cerrar Vista
                            </button>

                            <Link to={`/detalleplanetas/${item.id}`}
                                className="btn btn-info animate__animated animate__pulse animate__slower"
                                onClick={() => {
                                    const modal = document.getElementById(`modal-${item.id}`);
                                    if (modal) {
                                        const bsModal = window.bootstrap.Modal.getInstance(modal);
                                        if (bsModal) bsModal.hide();
                                    }
                                }}
                                style={{
                                    background: 'linear-gradient(45deg, #17a2b8, #20c997)',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                                }}>
                                🚀 Explorar Planeta Completo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPlanetas;