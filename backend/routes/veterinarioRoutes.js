import express from "express";
import {
  registrar,
  perfil,
  confirmar,
  autenticar
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registrar);
// Confirmar token de usuario
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);

router.get('/perfil', checkAuth, perfil);

export default router;
