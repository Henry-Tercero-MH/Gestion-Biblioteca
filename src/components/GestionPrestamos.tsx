import React, { useState, useEffect } from 'react';
import { Calendar, Book, User, Check, X } from 'lucide-react';

interface Prestamo {
  id: number;
  usuario_id: number;
  libro_id: number;
  fecha_prestamo: string;
  fecha_devolucion: string;
  devuelto: boolean;
}

const GestionPrestamos: React.FC = () => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [nuevoPrestamo, setNuevoPrestamo] = useState<Omit<Prestamo, 'id' | 'devuelto'>>({
    usuario_id: 0,
    libro_id: 0,
    fecha_prestamo: '',
    fecha_devolucion: '',
  });

  useEffect(() => {
    cargarPrestamos();
  }, []);

  const cargarPrestamos = async () => {
    try {
      const respuesta = await fetch('http://localhost:5000/api/prestamos');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los préstamos');
      }
      const datos = await respuesta.json();
      setPrestamos(datos);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const agregarPrestamo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:5000/api/prestamos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPrestamo),
      });
      if (!respuesta.ok) {
        throw new Error('Error al agregar el préstamo');
      }
      setNuevoPrestamo({
        usuario_id: 0,
        libro_id: 0,
        fecha_prestamo: '',
        fecha_devolucion: '',
      });
      cargarPrestamos();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const marcarDevuelto = async (id: number) => {
    try {
      const respuesta = await fetch(`http://localhost:5000/api/prestamos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ devuelto: true }),
      });
      if (!respuesta.ok) {
        throw new Error('Error al marcar como devuelto');
      }
      cargarPrestamos();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Gestión de Préstamos</h3>
      <form onSubmit={agregarPrestamo} className="mb-4">
        <input
          type="number"
          placeholder="ID del Usuario"
          value={nuevoPrestamo.usuario_id || ''}
          onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, usuario_id: parseInt(e.target.value) })}
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="ID del Libro"
          value={nuevoPrestamo.libro_id || ''}
          onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, libro_id: parseInt(e.target.value) })}
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="date"
          placeholder="Fecha de Préstamo"
          value={nuevoPrestamo.fecha_prestamo}
          onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, fecha_prestamo: e.target.value })}
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="date"
          placeholder="Fecha de Devolución"
          value={nuevoPrestamo.fecha_devolucion}
          onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, fecha_devolucion: e.target.value })}
          className="mr-2 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-500-500 text-white p-2 rounded">
          Agregar Préstamo
        </button>
      </form>
      <ul>
        {prestamos.map((prestamo) => (
          <li key={prestamo.id} className="mb-2 flex items-center">
            <Calendar className="mr-2" size={18} />
            <span>
              <strong>Usuario ID: {prestamo.usuario_id}</strong> - Libro ID: {prestamo.libro_id}
            </span>
            <span className="ml-2">
              Préstamo: {prestamo.fecha_prestamo} | Devolución: {prestamo.fecha_devolucion}
            </span>
            {prestamo.devuelto ? (
              <Check className="ml-2 text-green-500" size={18} />
            ) : (
              <button
                onClick={() => marcarDevuelto(prestamo.id)}
                className="ml-2 text-blue-500"
              >
                Marcar como devuelto
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionPrestamos;