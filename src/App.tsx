import React, { useState } from 'react';
import { Book, User, Library } from 'lucide-react';
import InicioSesion from './components/InicioSesion';
import PanelControl from './components/PanelControl';

function App() {
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [esAdmin, setEsAdmin] = useState(false);

  const manejarInicioSesion = async (usuario: string, contrasena: string) => {
    try {
      const respuesta = await fetch('http://localhost:5000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: usuario, contrasena }),
      });

      if (!respuesta.ok) {
        throw new Error('Error en el inicio de sesión');
      }

      const datos = await respuesta.json();
      setSesionIniciada(true);
      setNombreUsuario(usuario);
      setEsAdmin(datos.esAdmin);
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el inicio de sesión. Por favor, intente de nuevo.');
    }
  };

  const manejarRegistro = async (usuario: string, email: string, contrasena: string) => {
    try {
      const respuesta = await fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: usuario, email, contrasena }),
      });

      if (!respuesta.ok) {
        throw new Error('Error en el registro');
      }

      alert('Usuario registrado exitosamente. Por favor, inicie sesión.');
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el registro. Por favor, intente de nuevo.');
    }
  };

  const manejarCierreSesion = () => {
    setSesionIniciada(false);
    setNombreUsuario('');
    setEsAdmin(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Library className="mr-2" /> Sistema de Gestión de Biblioteca
          </h1>
          {sesionIniciada && (
            <button
              onClick={manejarCierreSesion}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </header>
      <main className="container mx-auto mt-8 p-4">
        {sesionIniciada ? (
          <PanelControl nombreUsuario={nombreUsuario} esAdmin={esAdmin} />
        ) : (
          <InicioSesion alIniciarSesion={manejarInicioSesion} alRegistrar={manejarRegistro} />
        )}
      </main>
      <footer className="bg-gray-200 text-center p-4 mt-8">
        <p>&copy; 2024 Sistema de Gestión de Biblioteca. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;