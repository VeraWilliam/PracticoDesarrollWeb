import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormularioAdoptante from '../components/FormularioAdoptante';
import AdoptanteCard from '../components/AdoptanteCard';

const Adoptantes = () => {
  const [showForm, setShowForm] = useState(false);
  const [adoptantes, setAdoptantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdoptantes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/adoptantes');
        setAdoptantes(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdoptantes();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/adoptantes/${id}`);
  };

  if (loading) return (
    <section className="section">
      <div className="container">
        <progress className="progress is-small is-primary" max="100">Cargando...</progress>
      </div>
    </section>
  );

  if (error) return (
    <section className="section">
      <div className="container">
        <div className="notification is-danger">
          Error al cargar adoptantes: {error}
        </div>
      </div>
    </section>
  );

  return (
    <section className="section">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h1 className="title">Personas Interesadas en Adoptar</h1>
          </div>
          <div className="level-right">
            <button 
              className="button is-primary"
              onClick={() => setShowForm(!showForm)}
            >
              <span className="icon">
                <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'}`}></i>
              </span>
              <span>{showForm ? 'Cancelar' : 'Nuevo Adoptante'}</span>
            </button>
          </div>
        </div>

        {showForm && (
          <div className="box mb-6">
            <FormularioAdoptante 
              onSubmit={async (formData) => {
                try {
                  const response = await axios.post('http://localhost:3001/adoptantes', formData);
                  setAdoptantes([...adoptantes, response.data]);
                  setShowForm(false);
                } catch (error) {
                  console.error('Error al registrar adoptante:', error);
                }
              }}
            />
          </div>
        )}

        {adoptantes.length === 0 ? (
          <div className="notification is-warning">
            No hay adoptantes registrados aún.
          </div>
        ) : (
          <div className="columns is-multiline">
            {adoptantes.map(adoptante => (
              <div key={adoptante.id} className="column is-one-third">
                <AdoptanteCard 
                  adoptante={adoptante} 
                  onViewDetails={handleViewDetails} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Adoptantes;