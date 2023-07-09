import Veterinario from '../models/Veterinario.js';

const registrar = async(req, res) => {
  // const { email, password, nombre } = req.body;
  const { email } = req.body;

  // Prevenir Usuarios Duplicados
  const existeUsuario = await Veterinario.findOne({ email });
  if(existeUsuario) {
    const error = new Error('Usuario ya Registrado');
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Guardar nuevo Veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();

    res.json(veterinarioGuardado);
  }
  catch (err) {
    console.log(err);
  }
};

const perfil = (req, res) => {
  res.json({ msg: "Mostrando Perfil" });
};

export {
  registrar,
  perfil,
}
