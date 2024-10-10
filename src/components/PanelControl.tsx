import React, { useState, useEffect } from 'react';
import { Book, User, PlusCircle, Tag } from 'lucide-react';
import GestionLibros from './GestionLibros';
import GestionUsuarios from './GestionUsuarios';
import GestionCategorias from './GestionCategorias';
import GestionPrestamos from './GestionPrestamos';

interface PropiedadesPanelControl {
  nombreUsuario: string;
  esAdmin: boolean;
}

const PanelControl: React.FC<PropiedadesPanelControl> = ({ nombreUsuario, esAdmin }) => {
  const [pestanaActiva, setPestanaActiva] = useState('libros');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Bienvenido, {nombreUsuario}!</h2>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            pestanaActiva === 'libros' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setPestanaActiva('libros')}
        >
          <Book className="inline mr-2" size={18} /> Libros
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${
            pestanaActiva === 'prestamos' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setPestanaActiva('prestamos')}
        >
          <PlusCircle className="inline mr-2" size={18} /> Préstamos
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${
            pestanaActiva === 'categorias' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setPestanaActiva('categorias')}
        >
          <Tag className="inline mr-2" size={18} /> Categorías
        </button>
        {esAdmin && (
          <button
            className={`px-4 py-2 rounded ${
              pestanaActiva === 'usuarios' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setPestanaActiva('usuarios')}
          >
            <User className="inline mr-2" size={18} /> Usuarios
          </button>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        {pestanaActiva === 'libros' && <GestionLibros />}
        {pestanaActiva === 'prestamos' && <GestionPrestamos />}
        {pestanaActiva === 'categorias' && <GestionCategorias />}
        {esAdmin && pestanaActiva === 'usuarios' && <GestionUsuarios />}
      </div>
    </div>
  );
};

export default PanelControl;