import { generarId } from '../helpers/generarId.js'
import { generarJWT } from '../helpers/generarJWT.js'
import Usuario from '../models/Usuario.js'

const registrarUsuario = async (req, res) => {
  const { email } = req.body
  const existeUsuario = await Usuario.findOne({ email })
  if (existeUsuario) {
    const error = new Error('Usuario ya registrado')
    return res.status(403).json({ msg: error.message })
  }
  try {
    const usuario = new Usuario(req.body)
    usuario.token = generarId()
    const usuarioAlmacenado = await usuario.save()
    res.json(usuarioAlmacenado)
  } catch (error) {
    console.log({ error })
  }
}

const autenticarUsuario = async (req, res) => {
  const { email, password } = req.body
  // Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email })
  if (!usuario) {
    const error = new Error('No existe ningún usuario con ese email')
    return res.status(404).json({ msg: error.message })
  }
  // Comprobar si está confirmado
  if (!usuario.confirmado) {
    const error = new Error('Primero debes confirmar la cuenta')
    return res.status(403).json({ msg: error.message })
  }
  // Comprobar password
  if (!await usuario.comprobarPassword(password)) {
    const error = new Error('La contraseña es incorrecta')
    return res.status(403).json({ msg: error.message })
  }
  res.json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    token: generarJWT(usuario._id)
  })
}

export {
  registrarUsuario,
  autenticarUsuario
}
