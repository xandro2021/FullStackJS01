import Paciente from '../models/Paciente.js';

const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;

  try {
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find()
    .where('veterinario')
    .equals(req.veterinario);

  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    res.status(404).json({ msg: 'No Encontrado' });
  }

  // Cuando se comparan los _id de mongodb se deben convertir a String
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: 'Accion no valida' });
  }

  res.json(paciente);
}

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    res.status(404).json({ msg: 'No Encontrado' });
  }

  // La persona que lo va editar es la que lo ha creado
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: 'Accion no valida' });
  }

  // Actualizar Paciente || Si no esta el valor en el request entonces se asigna el mismo valor
  paciente.nombre = req.body.nombre || paciente.nombre;

  try {
    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);

  } catch (err) {
    console.log(err);
  }
}

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    res.status(404).json({ msg: 'No Encontrado' });
  }

  // La persona que lo va editar es la que lo ha creado
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: 'Accion no valida' });
  }

  try {
    await paciente.deleteOne();
    res.json({ msg: 'Paciente Eliminado' });

  } catch (error) {
    console.log(error);
  }

}

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
