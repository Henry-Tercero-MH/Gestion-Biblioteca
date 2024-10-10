import React, { useState, useEffect } from 'react';
import { Book, Edit, Trash2 } from 'lucide-react';

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  categoria_id: number;
  fecha_publicacion: string;
}

const GestionLibros: React.FC = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [nuevoLibro, setNuevoLibro] = useState<Omit<Libro, 'id'>>({
    titulo: '',
    autor: '',
    isbn: '',
    categoria_id: 0,
    fecha_publicacion: '',
  });
  const [editandoLibro, setEditandoLibro] = useState<Libro | null>(null);

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    try {
      const respuesta = await fetch('http://localhost:5000/api/libros');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los libros');
      }
      const datos = await respuesta.json();
      setLibros(datos);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const agregarLibro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:5000/api/libros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoLibro),
      });
      if (!respuesta.ok) {
        throw new Error('Error al agregar el libro');
      }
      setNuevoLibro({
        titulo: '',
        autor: '',
        isbn: '',
        categoria_id: 0,
        fecha_publicacion: '',
      });
      cargarLibros();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const editarLibro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editandoLibro) return;
    try {
      const respuesta = await fetch(`http://localhost:5000/api/libros/${editandoLibro.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editandoLibro),
      });
      if (!respuesta.ok) {
        throw new Error('Error al editar el libro');
      }
      setEditandoLibro(null);
      cargarLibros();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const eliminarLibro = async (id: number) => {
    try {
      const respuesta = await fetch(`http://localhost:5000/api/libros/${id}`, {
        method: 'DELETE',
      });
      if (!respuesta.ok) {
        throw new Error('Error al eliminar el libro');
      }
      cargarLibros();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Gestión de Libros</h3>
      <form onSubmit={editandoLibro ? editarLibro : agregarLibro} className="mb-4">
        <input
          type="text"
          placeholder="Título"
          value={editandoLibro ? editandoLibro.titulo : nuevoLibro.titulo}
          onChange={(e) =>
            editandoLibro
              ? setEditandoLibro({ ...editandoLibro, titulo: e.target.value })
              : setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })
          }
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={editandoLibro ? editandoLibro.autor : nuevoLibro.autor}
          onChange={(e) =>
            editandoLibro
              ? setEditandoLibro({ ...editandoLibro, autor: e.target.value })
              : setNuevoLibro({ ...nuevoLibro, autor: e.target.value })
          }
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="ISBN"
          value={editandoLibro ? editandoLibro.isbn : nuevoLibro.isbn}
          onChange={(e) =>
            editandoLibro
              ? setEditandoLibro({ ...editandoLibro, isbn: e.target.value })
              : setNuevoLibro({ ...nuevoLibro, isbn: e.target.value })
          }
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Categoría ID"
          value={editandoLibro ? editandoLibro.categoria_id : nuevoLibro.categoria_id}
          onChange={(e) =>
            editandoLibro
              ? setEditandoLibro({ ...editandoLibro, categoria_id: parseInt(e.target.value) })
              : setNuevoLibro({ ...nuevoLibro, categoria_id: parseInt(e.target.value) })
          }
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="date"
          placeholder="Fecha de Publicación"
          value={editandoLibro ? editandoLibro.fecha_publicacion : nuevoLibro.fecha_publicacion}
          onChange={(e) =>
            editandoLibro
              ? setEditandoLibro({ ...editandoLibro, fecha_publicacion: e.target.value })
              : setNuevoLibro({ ...nuevoLibro, fecha_publicacion: e.target.value })
          }
          className="mr-2 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          {editandoLibro ? 'Actualizar Libro' : 'Agregar Libro'}
        </button>
        {editandoLibro && (
          <button
            type="button"
            onClick={() => setEditandoLibro(null)}
            className="ml-2 bg-gray-500 text-white p-2 rounded"
          >
            Cancelar
          </button>
        )}
      </form>
      <ul>
        {libros.map((libro) => (
          <li key={libro.id} className="mb-2 flex items-center">
            <Book className="mr-2" size={18} />
            <span>
              <strong>{libro.titulo}</strong> por {libro.autor} - ISBN: {libro.isbn}, Categoría: {libro.categoria_id}, Publicado: {libro.fecha_publicacion}
            </span>
            <button
              onClick={() => setEditandoLibro(libro)}
              className="ml-2 text-blue-500"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => eliminarLibro(libro.id)}
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

export default GestionLibros;