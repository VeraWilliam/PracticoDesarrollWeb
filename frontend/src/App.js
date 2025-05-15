import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistroMascota from './pages/RegistroMascota';
import ListaMascotas from './pages/ListaMascotas';
import Adoptantes from './pages/Adoptantes';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <section className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<RegistroMascota />} />
            <Route path="/lista" element={<ListaMascotas />} />
            <Route path="/adoptantes" element={<Adoptantes />} />
          </Routes>
        </div>
      </section>
    </Router>
  );
}

export default App;