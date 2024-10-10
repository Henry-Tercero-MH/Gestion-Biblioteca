import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';

interface PropiedadesInicioSesion {
  alIniciarSesion: (nombreUsuario: string, contrasena: string) => void;
  alRegistrar: (nombreUsuario: string, email: string, contrasena: string) => void;
}

const InicioSesion: React.FC<PropiedadesInicioSesion> = ({ alIniciarSesion, alRegistrar }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [email, setEmail] = useState('');
  const [modoRegistro, setModoRegistro] = useState(false);

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (modoRegistro) {
      alRegistrar(nombreUsuario, email, contrasena);
    } else {
      alIniciarSesion(nombreUsuario, contrasena);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {modoRegistro ? 'Registrarse' : 'Iniciar Sesión'}
      </h2>
      <form onSubmit={manejarEnvio}>
        <div className="mb-4">
          <label htmlFor="nombreUsuario" className="block text-gray-700 text-sm font-bold mb-2">
            <User className="inline mr-2" size={18} />
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="nombreUsuario"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        {modoRegistro && (
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              <Mail className="inline mr-2" size={18} />
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        <div className="mb-6">
          <label htmlFor="contrasena" className="block text-gray-700 text-sm font-bold mb-2">
            <Lock className="inline mr-2" size={18} />
            Contraseña
          </label>
          <input
            type="password"
            id="contrasena"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {modoRegistro ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
          <button
            type="button"
            onClick={() => setModoRegistro(!modoRegistro)}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            {modoRegistro ? 'Ya tengo una cuenta' : 'Crear una cuenta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InicioSesion;