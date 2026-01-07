import { useEffect, useState } from "react";
import CardTransformaciones from "../../components/CardTransformaciones";

// Asumo que la API de transformaciones tiene una estructura similar
const API = 'https://dragonball-api.com/api/transformations?page=1&limit=100';

const Transformaciones = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDatos = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      // Asumo que la respuesta tiene un campo "items" similar a otras APIs
      setDatos(data.items || data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatos();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Cargando Transformaciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al cargar las Transformaciones</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container pt-5 mt-5">
      <h4 className="text-center py-5">Transformaciones ({datos.length})</h4>
      <div className="row">
        {datos.map((item) => (
          <CardTransformaciones key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Transformaciones;