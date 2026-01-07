import { useEffect, useState } from "react";
import CardPersonajes from "../../components/CardPersonajes";

const API = 'https://dragonball-api.com/api/characters?page=1&limit=100';
const Personajes = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDatos = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setDatos(data.items || []);
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
        <p>Cargando Personajes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al cargar los Personajes</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container pt-5 mt-5">
      <h4 className="text-center py-5">Personajes ({datos.length})</h4>
      <div className="row">
        {datos.map((item) => (
          <CardPersonajes key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Personajes;