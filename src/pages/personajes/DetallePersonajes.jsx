import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

const API = "https://dragonball-api.com/api/characters/";

const DetallePersonajes = () => {
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
        <p>Cargando Personaje...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al cargar el personaje</h4>
        <p>{error}</p>
        <Link to="/personajes" className="btn btn-outline-danger">Regresar al listado</Link>
      </div>
    );
  }

  if (!datos) {
    return (
      <div className="text-center py-5">
        <h4>Personaje no encontrado</h4>
      </div>
    );
  }

  return (
    <div className="container pt-5 mt-5">
      <div className="text-end py-5">
        <Link to="/personajes" className="btn btn-secondary">
          <FaBackward /> Regresar
        </Link>
      </div>

      <h4 className="text-center py-4 fw-bold fs-4">
        Detalle de {datos.name}
      </h4>

      <div className="row">
        <div className="col-md-4">
          <img
            src={datos.image}
            className="img-fluid rounded"
            alt={datos.name}
            style={{
              maxHeight: "400px",
              objectFit: "contain",
              width: "100%",
            }}
          />
        </div>

        <div className="col-md-8">
          <h5 className="py-4 fw-bold fs-4">{datos.name}</h5>

          <p>
            <b>Energía espiritual o energía vital:</b>{" "}
            <span className="badge rounded-pill text-bg-danger p-2">
              {datos.ki || "Desconocida"}
            </span>
            <br />
            <b>Cantidad máxima de energía:</b> {datos.maxKi || "Desconocida"}{" "}
            <br />
            <b>Raza:</b> {datos.race || "Desconocida"} <br />
            <b>Género:</b> {datos.gender || "Desconocido"} <br />
            <b>Afiliación:</b> {datos.affiliation || "Desconocida"}
          </p>

          <p>
            <b>Descripción:</b> {datos.description || "No disponible"}
          </p>

          <p>
            <b>Planeta Origen:</b>{" "}
            {datos.originPlanet
              ? datos.originPlanet.name // Cambiado a .name para que sea más legible, o usa .description
              : "Desconocido"}
          </p>
        </div>
      </div>

      {/* Transformaciones */}
      {datos.transformations && datos.transformations.length > 0 && (
        <>
          <h5 className="mt-4">
            <b>Transformaciones</b>
          </h5>
          <div className="row">
            {datos.transformations.map((trans) => (
              <div className="col-md-6 col-lg-4 mb-3" key={trans.id}>
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-header p-0 d-flex align-items-center justify-content-center"
                    style={{ height: "300px", overflow: "hidden" }}
                  >
                    <img
                      src={trans.image || "https://via.placeholder.com/300"}
                      alt={trans.name}
                      className="img-fluid"
                      style={{
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h6 className="card-title fw-bold">{trans.name}</h6>
                    {/* Añadido Link para navegar al detalle de la transformación desde aquí si lo deseas */}
                    <Link to={`/detalletransformaciones/${trans.id}`} className="btn btn-sm btn-outline-danger mt-2">
                      Ver Detalles
                    </Link>
                  </div>
                  <div className="card-footer text-center">
                    <p className="card-text mb-0">
                      <b>Energía:</b>{" "}
                      <span className="badge rounded-pill text-bg-danger p-2">
                        {trans.ki || "Desconocida"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DetallePersonajes;