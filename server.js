const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const dbConfig = {
  user: "tu_usuario",
  password: "tu_contraseña",
  connectString: "tu_cadena_de_conexion"
};

// Función para ejecutar consultas
async function ejecutarConsulta(sql, binds = [], opciones = {}) {
  let conexion;

  try {
    conexion = await oracledb.getConnection(dbConfig);
    const resultado = await conexion.execute(sql, binds, opciones);
    return resultado.rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (conexion) {
      try {
        await conexion.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
}

// Rutas para USUARIOS
app.post('/api/usuarios', async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    await ejecutarConsulta(
      'INSERT INTO USUARIOS (nombre, email, contrasena) VALUES (:1, :2, :3)',
      [nombre, email, hashedPassword]
    );
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/usuarios/login', async (req, res) => {
  const { nombre, contrasena } = req.body;
  try {
    const usuarios = await ejecutarConsulta(
      'SELECT * FROM USUARIOS WHERE nombre = :1',
      [nombre]
    );
    if (usuarios.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    const usuario = usuarios[0];
    const contrasenaValida = await bcrypt.compare(contrasena, usuario[3]); // Asumiendo que la contraseña está en el índice 3
    if (!contrasenaValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    res.json({ mensaje: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ... (resto del código del servidor)

app.listen(port, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${port}`);
});