import { useEffect, useState } from "react";
import CardPlanetas from "../../components/CardPlanetas";

const API = 'https://dragonball-api.com/api/planets?page=1&limit=100';

const Planetas = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            setDatos(data.items);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div><p>Cargando...</p></div>;
    if (error) return <div className="text-center py-5 text-danger"><h4>{error}</h4></div>;

    return (
        <div className="container pt-5 mt-5">
            <h4 className="text-center py-5">Planetas ({datos.length})</h4>
            <div className="row">
                {datos.map((item) => (
                    <CardPlanetas key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Planetas;