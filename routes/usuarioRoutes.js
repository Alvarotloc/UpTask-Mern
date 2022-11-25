import express from 'express'

import {
  registrarUsuario,
  autenticarUsuario,
  confirmarUsuario,
  recuperarPassword,
  comprobarToken,
  nuevoPassword
} from '../controllers/usuarioController.js'

const router = express.Router()

// Autenticación, Registro y Confirmación de Usuarios

router.post('/', registrarUsuario)
router.post('/login', autenticarUsuario)

router.get('/confirmar/:token', confirmarUsuario)

router.post('/recuperar-password', recuperarPassword)

router.route('/recuperar-password/:token')
  .get(comprobarToken)
  .post(nuevoPassword)

export default router
