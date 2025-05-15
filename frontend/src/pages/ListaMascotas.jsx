import { useEffect, useState } from 'react';
import axios from 'axios';
import MascotaCard from '../components/MascotaCard';

const ListaMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/registros');
        setMascotas(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMascotas();
  }, []);

  if (loading) return (
    <section className="section">
      <div className="container">
        <progress className="progress is-small is-primary" max="100">15%</progress>
      </div>
    </section>
  );

  if (error) return (
    <section className="section">
      <div className="container">
        <div className="notification is-danger">
          Error al cargar las mascotas: {error}
        </div>
      </div>
    </section>
  );

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">Mascotas Disponibles para Adopción</h1>
        
        {mascotas.length === 0 ? (
          <div className="notification is-warning">
            No hay mascotas registradas aún.
          </div>
        ) : (
          <div className="columns is-multiline">
            {mascotas.map(mascota => (
              <div key={mascota.id} className="column is-one-third">
                <MascotaCard mascota={mascota} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ListaMascotas;