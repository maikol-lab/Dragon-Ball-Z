import { Link, useLocation } from "react-router-dom";

const Error404 = () => {
    const location = useLocation();
    const searchTerm = location.state?.searchTerm || '';

    return (
        <div className="container pt-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <div className="mb-4">
                        <h1 className="display-1 fw-bold text-primary py-4">404</h1>
                        <h2 className="h4 text-muted">
                            {searchTerm ? 'Búsqueda sin resultados' : 'Página no encontrada'}
                        </h2>
                    </div>

                    <div className="card border-0 bg-light mb-4">
                        <div className="card-body">
                            <p className="fs-5 mb-3">
                                {searchTerm
                                    ? `No se encontraron resultados para: "${searchTerm}"`
                                    : "La página que buscas no existe."
                                }
                            </p>

                            {searchTerm && (
                                <>
                                    <p className="text-muted mb-3">
                                        Sugerencias para tu búsqueda:
                                    </p>
                                    <div className="d-flex flex-wrap justify-content-center gap-2">
                                        {['Goku', 'Vegeta', 'Tierra', 'Namek', 'Ssj', 'Freezer', 'Celula'].map((term, index) => (
                                            <Link
                                                key={index}
                                                to="/busquedas"
                                                state={term}
                                                className="btn btn-outline-primary btn-sm"
                                            >
                                                {term}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/" className="btn btn-primary">
                            <i className="bi bi-house me-2"></i>
                            Ir al inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error404;