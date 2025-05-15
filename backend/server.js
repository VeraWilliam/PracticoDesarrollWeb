const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Archivos JSON
const DATA_FILE = path.join(__dirname, 'registros.json');
const ADOPTANTES_FILE = path.join(__dirname, 'adoptantes.json');

// Inicializar archivos
[DATA_FILE, ADOPTANTES_FILE].forEach(file => {
  if (!fs.existsSync(file)) fs.writeFileSync(file, '[]', 'utf8');
});

// Endpoint raíz simple
app.get('/', (req, res) => {
  res.json({ 
    status: 'API funcionando',
    message: 'Bienvenido a la API de Adopción de Mascotas'
  });
});

// Endpoints para mascotas
app.get('/registros', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer registros' });
  }
});

app.post('/registros', upload.single('imagen'), (req, res) => {
  try {
    const { nombre, email, descripcion, fecha, categoria } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;
    
    const nuevoRegistro = {
      id: Date.now(),
      nombre,
      email,
      descripcion,
      fecha,
      categoria,
      imagen,
      fechaRegistro: new Date().toISOString()
    };
    
    const registros = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    registros.push(nuevoRegistro);
    fs.writeFileSync(DATA_FILE, JSON.stringify(registros, null, 2), 'utf8');
    
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar registro' });
  }
});

// Endpoints para adoptantes
app.get('/adoptantes', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(ADOPTANTES_FILE, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer adoptantes' });
  }
});

app.post('/adoptantes', (req, res) => {
  try {
    const { nombreCompleto, cedula, correo, tipoMascota, descripcion } = req.body;
    
    const nuevoAdoptante = {
      id: Date.now(),
      nombreCompleto,
      cedula,
      correo,
      tipoMascota,
      descripcion,
      fechaRegistro: new Date().toISOString()
    };
    
    const adoptantes = JSON.parse(fs.readFileSync(ADOPTANTES_FILE, 'utf8'));
    adoptantes.push(nuevoAdoptante);
    fs.writeFileSync(ADOPTANTES_FILE, JSON.stringify(adoptantes, null, 2), 'utf8');
    
    res.status(201).json(nuevoAdoptante);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar adoptante' });
  }
});

app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));