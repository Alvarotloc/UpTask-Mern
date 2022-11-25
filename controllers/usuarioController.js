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
    const usuarioAlmacenado = await usuario.save()
    res.json(usuarioAlmacenado)
  } catch (error) {
    console.log(error)
  }
  res.json(req.body)
}
export {
  registrarUsuario
}
