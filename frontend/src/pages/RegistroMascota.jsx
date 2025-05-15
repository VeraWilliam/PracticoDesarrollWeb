import { useNavigate } from 'react-router-dom';
import MascotaForm from '../components/MascotaForm';

const RegistroMascota = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:3001/registros', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Error al registrar');
      
      const data = await response.json();
      console.log('Registro exitoso:', data);
      navigate('/lista');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar la mascota');
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Registrar Nueva Mascota</h1>
        <div className="box">
          <MascotaForm onSubmit={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default RegistroMascota;