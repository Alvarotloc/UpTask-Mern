import express from 'express'

import {
  registrarUsuario,
  autenticarUsuario,
  confirmarUsuario,
  recuperarPassword,
  comprobarToken,
  nuevoPassword,
  perfil
} from '../controllers/usuarioController.js'
import checkAuth from '../middlewares/checkAuth.js'

const router = express.Router()

// Autenticación, Registro y Confirmación de Usuarios

router.post('/', registrarUsuario)
router.post('/login', autenticarUsuario)

router.get('/confirmar/:token', confirmarUsuario)

router.post('/recuperar-password', recuperarPassword)

router.route('/recuperar-password/:token')
  .get(comprobarToken)
  .post(nuevoPassword)

router.get('/perfil', checkAuth, perfil)

export default router
