import { useState } from 'react';

const MascotaForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    descripcion: '',
    fecha: '',
    categoria: 'perro',
    imagen: null
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    descripcion: '',
    fecha: '',
    imagen: ''
  });

  const [preview, setPreview] = useState(null);

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'nombre':
        if (!value.trim()) error = 'El nombre es requerido';
        else if (value.length < 2) error = 'Mínimo 2 caracteres';
        break;
      case 'email':
        if (!value.trim()) error = 'El email es requerido';
        else if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Email no válido';
        break;
      case 'descripcion':
        if (!value.trim()) error = 'La descripción es requerida';
        else if (value.length < 10) error = 'Mínimo 10 caracteres';
        break;
      case 'fecha':
        if (!value) error = 'La fecha es requerida';
        break;
      case 'imagen':
        if (!value) error = 'La imagen es requerida';
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validación en tiempo real al cambiar
    setErrors({
      ...errors,
      [name]: validateField(name, value)
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.match('image.*')) {
        setErrors({
          ...errors,
          imagen: 'Solo se permiten imágenes (JPEG, PNG)'
        });
        return;
      }
      
      // Validar tamaño (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors({
          ...errors,
          imagen: 'La imagen no debe superar 2MB'
        });
        return;
      }
      
      setFormData({
        ...formData,
        imagen: file
      });
      
      setErrors({
        ...errors,
        imagen: ''
      });
      
      // Mostrar vista previa
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {
      nombre: validateField('nombre', formData.nombre),
      email: validateField('email', formData.email),
      descripcion: validateField('descripcion', formData.descripcion),
      fecha: validateField('fecha', formData.fecha),
      imagen: validateField('imagen', formData.imagen)
    };
    
    setErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('fecha', formData.fecha);
      formDataToSend.append('categoria', formData.categoria);
      formDataToSend.append('imagen', formData.imagen);
      
      onSubmit(formDataToSend);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campo Nombre */}
      <div className="field">
        <label className="label">Nombre de la mascota *</label>
        <div className="control">
          <input
            className={`input ${errors.nombre ? 'is-danger' : ''}`}
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Firulais"
          />
        </div>
        {errors.nombre && (
          <p className="help is-danger">{errors.nombre}</p>
        )}
      </div>

      {/* Campo Email */}
      <div className="field">
        <label className="label">Email de contacto *</label>
        <div className="control">
          <input
            className={`input ${errors.email ? 'is-danger' : ''}`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@email.com"
          />
        </div>
        {errors.email && (
          <p className="help is-danger">{errors.email}</p>
        )}
      </div>

      {/* Campo Descripción */}
      <div className="field">
        <label className="label">Descripción *</label>
        <div className="control">
          <textarea
            className={`textarea ${errors.descripcion ? 'is-danger' : ''}`}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe a la mascota (edad, carácter, etc.)"
          />
        </div>
        {errors.descripcion && (
          <p className="help is-danger">{errors.descripcion}</p>
        )}
      </div>

      {/* Campo Fecha */}
      <div className="field">
        <label className="label">Fecha de nacimiento/rescate *</label>
        <div className="control">
          <input
            className={`input ${errors.fecha ? 'is-danger' : ''}`}
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
        </div>
        {errors.fecha && (
          <p className="help is-danger">{errors.fecha}</p>
        )}
      </div>

      {/* Campo Categoría */}
      <div className="field">
        <label className="label">Tipo de mascota *</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campo Imagen */}
      <div className="field">
        <label className="label">Imagen de la mascota *</label>
        <div className="file has-name is-fullwidth">
          <label className="file-label">
            <input
              className={`file-input ${errors.imagen ? 'is-danger' : ''}`}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Seleccionar archivo...</span>
            </span>
            <span className="file-name">
              {formData.imagen ? formData.imagen.name : 'Ningún archivo seleccionado'}
            </span>
          </label>
        </div>
        {errors.imagen && (
          <p className="help is-danger">{errors.imagen}</p>
        )}
        {preview && (
          <div className="mt-3">
            <figure className="image is-128x128">
              <img src={preview} alt="Vista previa" className="is-rounded" />
            </figure>
          </div>
        )}
      </div>

      {/* Botón de envío */}
      <div className="field">
        <div className="control">
          <button type="submit" className="button is-primary is-fullwidth">
            Registrar Mascota
          </button>
        </div>
      </div>
    </form>
  );
};

export default MascotaForm;