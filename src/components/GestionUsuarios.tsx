import React, { useState, useEffect } from 'react';
import { User, Edit, Trash2 } from 'lucide-react';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  es_admin: boolean;
}

const GestionUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nuevoUsuario, setNuevoUsuario] = useState<Omit<Usuario, 'id'>>({
    nombre: '',
    email: '',
    es_admin: false,
  });
  const [editandoUsuario, setEditandoUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const respuesta = await fetch('http://localhost:5000/api/usuarios');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los usuarios');
      }
      const datos = await respuesta.json();
      setUsuarios(datos);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const agregarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });
      if (!respuesta.ok) {
        throw new Error('Error al agregar el usuario');
      }
      setNuevoUsuario({ nombre: '', email: '', es_admin: false });
      cargarUsuarios();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const editarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editandoUsuario) return;
    try {
      const respuesta = await fetch(`http://localhost:5000/api/usuarios/${editandoUsuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editandoUsuario),
      });
      if (!respuesta.ok) {
        throw new Error('Error al editar el usuario');
      }
      setEditandoUsuario(null);
      cargarUsuarios();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const eliminarUsuario = async (id: number) => {
    try {
      const respuesta = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
        method: 'DELETE',
      });
      if (!respuesta.ok) {
        throw new Error('Error al eliminar el usuario');
      }
      cargarUsuarios();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Gestión de Usuarios</h3>
      <form onSubmit={editandoUsuario ? editarUsuario : agregarUsuario} className="mb-4">
        <input
          type="text"
          placeholder="Nombre"
          value={editandoUsuario ? editandoUsuario.nombre : nuevoUsuario.nombre}
          onChange={(e) =>
            editandoUsuario
              ? setEditandoUsuario({ ...editandoUsuario, nombre: e.target.value })
              : setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
          }
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={editandoUsuario ? editandoUsuario.email : nuevoUsuario.email}
          onChange={(e) =>
            editandoUsuario
              ? setEditandoUsuario({ ...editandoUsuario, email: e.target.value })
              : setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })
          }
          className="mr-2 p-2 border rounded"
          required
        />
        <label className="mr-2">
          <input
            type="checkbox"
            checked={editandoUsuario ? editandoUsuario.es_admin : nuevoUsuario.es_admin}
            onChange={(e) =>
              editandoUsuario
                ? setEditandoUsuario({ ...editandoUsuario, es_admin: e.target.checked })
                : setNuevoUsuario({ ...nuevoUsuario, es_admin: e.target.checked })
            }
            className="mr-1"
          />
          Es Admin
        </label>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          {editandoUsuario ? 'Actualizar Usuario' : 'Agregar Usuario'}
        </button>
        {editandoUsuario && (
          <button
            type="button"
            onClick={() => setEditandoUsuario(null)}
            className="ml-2 bg-gray-500 text-white p-2 rounded"
          >
            Cancelar
          </button>
        )}
      </form>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="mb-2 flex items-center">
            <User className="mr-2" size={18} />
            <span>
              <strong>{usuario.nombre}</strong> - {usuario.email} {usuario.es_admin ? '(Admin)' : ''}
            </span>
            <button
              onClick={() => setEditandoUsuario(usuario)}
              className="ml-2 text-blue-500"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => eliminarUsuario(usuario.id)}
              className="ml-2 text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionUsuarios;