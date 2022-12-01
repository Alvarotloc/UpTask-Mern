import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'

dotenv.config()

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

const emailConfirmarPassword = async (data) => {
  const { email, nombre, token } = data
  await transport.sendMail({
    from: 'info@uptask.com',
    to: email,
    subject: 'Confirma tu cuenta en UpTask',
    text: 'Confirma tu cuenta en UpTask',
    html: `
            <h1>Hola ${nombre}</h1><br>
            <p>Sigue el siguiente enlace para confirmar tu cuenta en Uptask: <a href='${process.env.FRONTEND_URL}/confirmar/${token}'>Confirmar Cuenta</a></p>
            <p>Si tu no creaste esta cuenta puedes ignorar este email</p>
        `
  })
}

const emailOlvidePassword = async (data) => {
  const { email, nombre, token } = data
  await transport.sendMail({
    from: 'info@uptask.com',
    to: email,
    subject: 'Reestablece tu Contraseña en UpTask',
    text: 'Reestablece tu Contraseña en UpTask',
    html: `
            <h1>Hola ${nombre}</h1><br>
            <p>Has solicitado reestablecer tu contraseña en UpTask</p>
            <p>Sigue el siguiente enlace para generar una nueva contraseña: <a href='http://localhost:4000/api/usuarios/recuperar-password/${token}'>Reestablecer Contraseña</a></p>

            <p>Si tu no creaste esta cuenta puedes ignorar este email</p>
        `
  })
}

export {
  emailConfirmarPassword,
  emailOlvidePassword
}
