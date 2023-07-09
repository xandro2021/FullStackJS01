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

const confirmar = async (req, res) => {
  // :token (routing) parametro dinamico
  const { token } = req.params;

  const usuarioConfirmar = await Veterinario.findOne({ token });

  if(!usuarioConfirmar) {
    const error = new Error('Token no Valido');
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    res.json({ msg: "Usuario Confirmado Correctamente" });
  } catch (err) {
    console.log(err);
  }
};

export {
  registrar,
  perfil,
  confirmar,
}
