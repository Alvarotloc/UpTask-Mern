import express from 'express'

import { registrarUsuario } from '../controllers/usuarioController.js'

const router = express.Router()

// Autenticación, Registro y Confirmación de Usuarios

router.post('/', registrarUsuario)

export default router
