import { useState } from 'react';

const FormularioAdoptante = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    cedula: '',
    correo: '',
    tipoMascota: 'perro',
    descripcion: ''
  });

  const [errors, setErrors] = useState({
    nombreCompleto: '',
    cedula: '',
    correo: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
      // Nombre Completo
    if (!formData.nombreCompleto.trim()) {
        newErrors.nombreCompleto = 'Nombre completo es requerido';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{10,}$/.test(formData.nombreCompleto)) {
        newErrors.nombreCompleto = 'Solo letras y espacios (mín. 10 caracteres)';
    }
    
    // Cédula
    if (!formData.cedula.trim()) {
        newErrors.cedula = 'Cédula es requerida';
    } else if (!/^\d{8,10}$/.test(formData.cedula)) {
        newErrors.cedula = 'Cédula inválida (solo números, 8-10 dígitos)';
    }
    
    // Correo
    if (!formData.correo.trim()) {
        newErrors.correo = 'Correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
        newErrors.correo = 'Correo no es válido';
    }

      // Descripción
    if (!formData.descripcion.trim()) {
        newErrors.descripcion = 'Descripción es requerida';
    } else if (formData.descripcion.length < 20) {
        newErrors.descripcion = 'Mínimo 20 caracteres';
    } else if (formData.descripcion.length > 500) {
        newErrors.descripcion = 'Máximo 500 caracteres';
    }
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Nombre Completo *</label>
          <div className="control">
            <input
              className={`input ${errors.nombreCompleto ? 'is-danger' : ''}`}
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
            />
          </div>
          {errors.nombreCompleto && <p className="help is-danger">{errors.nombreCompleto}</p>}
        </div>

        <div className="field">
          <label className="label">Número de Cédula *</label>
          <div className="control">
            <input
              className={`input ${errors.cedula ? 'is-danger' : ''}`}
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              placeholder="Ej: 1234567890"
            />
          </div>
          {errors.cedula && <p className="help is-danger">{errors.cedula}</p>}
        </div>

        <div className="field">
          <label className="label">Correo Electrónico *</label>
          <div className="control">
            <input
              className={`input ${errors.correo ? 'is-danger' : ''}`}
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ej: correo@ejemplo.com"
            />
          </div>
          {errors.correo && <p className="help is-danger">{errors.correo}</p>}
        </div>

        <div className="field">
          <label className="label">Tipo de Mascota *</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                name="tipoMascota"
                value={formData.tipoMascota}
                onChange={handleChange}
              >
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Describa la mascota y ¿Qué puedes ofrecerle a esta mascota? *</label>
          <div className="control">
            <textarea
              className={`textarea ${errors.descripcion ? 'is-danger' : ''}`}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe el hogar, cuidados y atención que puedes brindar"
              rows={5}
            />
          </div>
          {errors.descripcion && <p className="help is-danger">{errors.descripcion}</p>}
        </div>

        <div className="field">
          <div className="control">
            <button type="submit" className="button is-primary is-fullwidth">
              Registrar Adoptante
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioAdoptante;