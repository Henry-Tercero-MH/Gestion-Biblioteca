import React, { useState, useEffect } from 'react';
import { Tag, Edit, Trash2 } from 'lucide-react';

interface Categoria {
  id: number;
  nombre: string;
}

const GestionCategorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nuevaCategoria, setNuevaCategoria] = useState<string>('');
  const [editandoCategoria, setEditandoCategoria] = useState<Categoria | null>(null);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const respuesta = await fetch('http://localhost:5000/api/categorias');
      if (!respuesta.ok) {
        throw new Error('Error al cargar las categorías');
      }
      const datos = await respuesta.json();
      setCategorias(datos);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const agregarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:5000/api/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nuevaCategoria }),
      });
      if (!respuesta.ok) {
        throw new Error('Error al agregar la categoría');
      }
      setNuevaCategoria('');
      cargarCategorias();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const editarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editandoCategoria) return;
    try {
      const respuesta = await fetch(`http://localhost:5000/api/categorias/${editandoCategoria.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: editandoCategoria.nombre }),
      });
      if (!respuesta.ok) {
        throw new Error('Error al editar la categoría');
      }
      setEditandoCategoria(null);
      cargarCategorias();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const eliminarCategoria = async (id: number) => {
    try {
      const respuesta = await fetch(`http://localhost:5000/api/categorias/${id}`, {
        method: 'DELETE',
      });
      if (!respuesta.ok) {
        throw new Error('Error al eliminar la categoría');
      }
      cargarCategorias();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Gestión de Categorías</h3>
      <form onSubmit={editandoCategoria ? editarCategoria : agregarCategoria} className="mb-4">
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={editandoCategoria ? editandoCategoria.nombre : nuevaCategoria}
          onChange={(e) =>
            editandoCategoria
              ? setEditandoCategoria({ ...editandoCategoria, nombre: e.target.value })
              : setNuevaCategoria(e.target.value)
          }
          className="mr-2 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          {editandoCategoria ? 'Actualizar Categoría' : 'Agregar Categoría'}
        </button>
        {editandoCategoria && (
          <button
            type="button"
            onClick={() => setEditandoCategoria(null)}
            className="ml-2 bg-gray-500 text-white p-2 rounded"
          >
            Cancelar
          </button>
        )}
      </form>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id} className="mb-2 flex items-center">
            <Tag className="mr-2" size={18} />
            <span>
              <strong>{categoria.nombre}</strong>
            </span>
            <button
              onClick={() => setEditandoCategoria(categoria)}
              className="ml-2 text-blue-500"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => eliminarCategoria(categoria.id)}
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

export default GestionCategorias;