import express from "express";
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// AREA PUBLICA
router.post('/', registrar);
// Confirmar token de usuario
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
// Validar el Email del Usuario
router.post('/olvide-password', olvidePassword);

/*
 * ESTO ES UNA ALTERNATIVA QUE PUEDE SER REDUCIA EN LA SIGUIENTE INSTRUCCION
 * // Leer el Token
 * router.get('/olvide-password/:token', comprobarToken);
 * // Almacenar un nuevo Password
 * router.post('/olvide-password/:token', nuevoPassword);
 */
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

// AREA PRIVADA
router.get('/perfil', checkAuth, perfil);

export default router;
