const MascotaCard = ({ mascota }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          {mascota.imagen ? (
            <img 
              src={`http://localhost:3001${mascota.imagen}`} 
              alt={mascota.nombre} 
            />
          ) : (
            <div className="has-background-light has-text-centered py-6">
              <span className="icon is-large">
                <i className="fas fa-paw fa-3x"></i>
              </span>
            </div>
          )}
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{mascota.nombre}</p>
            <p className="subtitle is-6">
              <span className={`tag ${mascota.categoria === 'perro' ? 'is-primary' : mascota.categoria === 'gato' ? 'is-info' : 'is-warning'}`}>
                {mascota.categoria}
              </span>
            </p>
          </div>
        </div>

        <div className="content">
          <p>{mascota.descripcion}</p>
          <p>
            <strong>Fecha:</strong> {new Date(mascota.fecha).toLocaleDateString()}
          </p>
          <p>
            <strong>Contacto:</strong> <a href={`mailto:${mascota.email}`}>{mascota.email}</a>
          </p>
          <br />
          <time dateTime={mascota.fechaRegistro}>
            Registrado el: {new Date(mascota.fechaRegistro).toLocaleDateString()}
          </time>
        </div>
      </div>
      <footer className="card-footer">
        <a href={`mailto:${mascota.email}`} className="card-footer-item">
          <span className="icon">
            <i className="fas fa-envelope"></i>
          </span>
          <span>Contactar</span>
        </a>
      </footer>
    </div>
  );
};

export default MascotaCard;