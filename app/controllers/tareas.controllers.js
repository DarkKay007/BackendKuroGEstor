import { pool } from '../config/bd-mysql.js';
import { getCurrentDateTime } from '../util/dateHelper.js';

export const showTasks = async (req, res) => {
  const { proyecto_nombre } = req.query;

  try {
    let resultado;

    if (proyecto_nombre) {
      resultado = await pool.query('SELECT * FROM tareas WHERE proyecto_nombre = ?', [proyecto_nombre]);
    } else {
      resultado = await pool.query('SELECT * FROM tareas');
    }

    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error en la consulta Get de tareas' });
  }
};

export const getTask = async (req, res) => {
  const { nombre } = req.params;

  try {
    const resultado = await pool.query('SELECT * FROM tareas WHERE nombre = ?', [nombre]);
    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error en la consulta Get de tarea' });
  }
};

export const postTask = async (req, res) => {
  const { nombre, descripcion, estado, fecha_limite, proyecto_nombre } = req.body;

  if (!nombre || !descripcion || !estado || !fecha_limite || !proyecto_nombre) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const resultado = await pool.query(
      'INSERT INTO tareas (nombre, descripcion, estado, fecha_limite, proyecto_nombre) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, estado, fecha_limite, proyecto_nombre]
    );

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: 'Tarea creada exitosamente' });
    } else {
      res.status(500).json({ resultado: 'Tarea no creada' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error al crear tarea' });
  }
};

export const putTask = async (req, res) => {
  const { nombre, descripcion, estado, fecha_limite, proyecto_nombre, nombreAntiguo } = req.body;
  const date_update = getCurrentDateTime();

  if (!nombre || !descripcion || !estado || !fecha_limite || !proyecto_nombre || !nombreAntiguo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const resultado = await pool.query(
      `UPDATE tareas SET 
      nombre = ?, 
      descripcion = ?, 
      estado = ?, 
      fecha_limite = ?, 
      proyecto_nombre = ?, 
      fecha_actualizacion = ?
      WHERE nombre = ?`,
      [nombre, descripcion, estado, fecha_limite, proyecto_nombre, date_update, nombreAntiguo]
    );

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: 'Tarea actualizada exitosamente' });
    } else {
      res.status(500).json({ resultado: 'Tarea no actualizada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error al actualizar tarea' });
  }
};

export const delTask = async (req, res) => {
  const { nombre } = req.params;

  try {
    const resultado = await pool.query('DELETE FROM tareas WHERE nombre = ?', [nombre]);

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: 'Tarea eliminada exitosamente' });
    } else {
      res.status(500).json({ resultado: 'Tarea no eliminada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error al eliminar tarea' });
  }
};
