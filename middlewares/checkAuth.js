import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers
  let token
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY)
      req.usuario = await Usuario.findById(decoded.id).select('-password -confirmado -token -createdAt -updatedAt -__v')
      return next()
    } catch (error) {
      return res.status(404).json({ msg: 'Hubo un error' })
    }
  }
  if (!token) {
    const error = new Error('Token no válido')
    return res.status(401).json({ msg: error.message })
  }
}

export default checkAuth
