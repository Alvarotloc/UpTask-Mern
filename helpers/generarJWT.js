import jwt from 'jsonwebtoken'

const generarJWT = (id) => jwt.sign({ id }, process.env.JWT_SECRETKEY, {
  expiresIn: '30d'
})

export default generarJWT
