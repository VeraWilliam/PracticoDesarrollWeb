import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-paw"></i>
              </span>
              <span className="has-text-weight-bold">AdoptaMascotas</span>
            </span>
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">Inicio</Link>
            <Link to="/lista" className="navbar-item">Mascotas</Link>
            <Link to="/adoptantes" className="navbar-item">Adoptantes</Link>
          </div>

          <div className="navbar-end">
            <Link to="/registro" className="navbar-item button is-light">
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
              <span>Registrar Mascota</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;