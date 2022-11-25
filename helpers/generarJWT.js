import jwt from 'jsonwebtoken'

export const generarJWT = (id) => jwt.sign({ id }, process.env.JWT_SECRETKEY, {
  expiresIn: '30d'
})
