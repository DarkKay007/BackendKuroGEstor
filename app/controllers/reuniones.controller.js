import { pool } from '../config/bd-mysql.js';
import { getCurrentDateTime } from '../util/dateHelper.js';

export const showReuniones = async (req, res) => {
  const { nombre } = req.query;

  try {
    let resultado;

    if (nombre) {
      resultado = await pool.query('SELECT * FROM reuniones WHERE nombre = ?', [nombre]);
    } else {
      resultado = await pool.query('SELECT * FROM reuniones');
    }

    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error en la consulta Get de reuniones' });
  }
};
export const postReunion = async (req, res) => {
  const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;

  try {
    const resultado = await pool.query(
      'INSERT INTO reuniones (nombre, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, fecha_inicio, fecha_fin] // Aquí hay un error, debería ser solo cuatro signos de interrogación ya que son cuatro los datos en inserción
    );

    if (resultado.affectedRows > 0) { // Aquí no es [0].affectedRows sino que es resultado.affectedRows
      res.json({ resultado: 'Reunión creada exitosamente' });
    } else {
      res.json({ resultado: 'Reunión no creada' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error al crear reunión' });
  }
};
export const putReunion = async (req, res) => {
  const { reunion_id } = req.params;
  const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;

  try {
    const resultado = await pool.query(
      `UPDATE reuniones SET 
      nombre = ?, 
      descripcion = ?, 
      fecha_inicio = ?, 
      fecha_fin = ?, 
      WHERE reunion_id = ?`,
      [nombre, descripcion, fecha_inicio, fecha_fin, date_update, reunion_id]
    );

    if (resultado.affectedRows > 0) { // Aquí también no es resultado[0].affectedRows sino que es resultado.affectedRows
      res.json({ resultado: 'Reunión actualizada exitosamente' });
    } else {
      res.json({ resultado: 'Reunión no actualizada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error al actualizar reunión' });
  }
};

export const delReunion = async (req, res) => {
  const { reunion_id } = req.params;

  try {
    const resultado = await pool.query('DELETE FROM reuniones WHERE reunion_id = ?', [reunion_id]);

    if (resultado[0].affectedRows > 0) {
      res.json({ resultado: 'Reunión eliminada exitosamente' });
    } else {
      res.json({ resultado: 'Reunión no eliminada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, resultado: 'Error al eliminar reunión' });
  }
};
