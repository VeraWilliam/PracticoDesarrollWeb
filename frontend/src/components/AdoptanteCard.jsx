const AdoptanteCard = ({ adoptante, onViewDetails }) => {
  const getTipoMascotaColor = (tipo) => {
    switch(tipo) {
      case 'perro': return 'is-primary';
      case 'gato': return 'is-info';
      default: return 'is-warning';
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <span className="icon is-large">
              <i className="fas fa-user fa-3x"></i>
            </span>
          </div>
          <div className="media-content">
            <p className="title is-4">{adoptante.nombreCompleto}</p>
            <p className="subtitle is-6">
              <span className={`tag ${getTipoMascotaColor(adoptante.tipoMascota)}`}>
                {adoptante.tipoMascota}
              </span>
            </p>
          </div>
        </div>

        <div className="content">
          <p><strong>Contacto:</strong> {adoptante.correo}</p>
          <p><strong>Cédula:</strong> {adoptante.cedula}</p>
          <p className="mt-3">
            <strong>Descripción de Mascota y Ofrece:</strong> {adoptante.descripcion.substring(0, 80)}...
          </p>
          <br />
          <time dateTime={adoptante.fechaRegistro}>
            Registrado el: {new Date(adoptante.fechaRegistro).toLocaleDateString()}
          </time>
        </div>
      </div>

    </div>
  );
};

export default AdoptanteCard;