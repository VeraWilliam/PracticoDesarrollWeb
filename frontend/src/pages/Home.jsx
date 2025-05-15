import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <section className="hero is-fullheight-with-navbar hero-background">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="box transparent-box">
            <h1 className="title is-1 mb-6 has-text-white">
              ¡Encuentra un hogar para mascotas!
            </h1>
            <h2 className="subtitle is-4 mb-6 has-text-white">
              Registra mascotas en adopción o encuentra tu compañero ideal.
            </h2>
            <div className="buttons is-centered">
              <Link to="/registro" className="button is-primary is-large">
                <span className="icon">
                  <i className="fas fa-plus"></i>
                </span>
                <span>Registrar Mascota</span>
              </Link>
              <Link to="/lista" className="button is-info is-large">
                <span className="icon">
                  <i className="fas fa-search"></i>
                </span>
                <span>Ver Mascotas</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;