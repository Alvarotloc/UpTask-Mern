import Proyecto from '../models/Proyecto.js'

const obtenerProyectos = async (req, res) => {
  const { _id } = req.usuario
  try {
    const proyectos = await Proyecto.find({ creador: _id })
    return res.json(proyectos)
  } catch (error) {
    console.log(error)
    res.status(404).json({ msg: 'Hubo un error' })
  }
}
const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body)
  proyecto.creador = req.usuario._id

  try {
    const proyectoAlmacenado = await proyecto.save()
    return res.json(proyectoAlmacenado)
  } catch (error) {
    console.log(error)
    res.status(404).json({ msg: 'Hubo un error' })
  }
}
const obtenerProyecto = async (req, res) => {
  const { id } = req.params
  const { _id } = req.usuario

  const proyecto = await Proyecto.findById(id)

  if (!proyecto) {
    const error = new Error('Proyecto no encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (proyecto.creador.toString() !== _id.toString()) {
    const error = new Error('Acción No Válida')
    return res.status(403).json({ msg: error.message })
  }

  res.json(proyecto)
//   try {
//     const proyectoPorId = await Proyecto.find({ creador: _id, _id: id })
//     res.json(proyectoPorId)
//   } catch (error) {
//     console.log(error)
//     res.status(404).json({ msg: 'Hubo un error' })
//   }
}
const editarProyecto = async (req, res) => {
  const { id } = req.params
  const { _id } = req.usuario

  const proyecto = await Proyecto.findById(id)

  if (!proyecto) {
    const error = new Error('Proyecto no encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (proyecto.creador.toString() !== _id.toString()) {
    const error = new Error('Acción No Válida')
    return res.status(403).json({ msg: error.message })
  }
  proyecto.nombre = req.body.nombre || proyecto.nombre
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
  proyecto.cliente = req.body.cliente || proyecto.cliente

  try {
    const proyectoAlmacenado = await proyecto.save()
    return res.json(proyectoAlmacenado)
  } catch (error) {
    console.log(error)
  }
}
const eliminarProyecto = async (req, res) => {
  const { id } = req.params
  const { _id } = req.usuario

  const proyecto = await Proyecto.findById(id)

  if (!proyecto) {
    const error = new Error('Proyecto no encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (proyecto.creador.toString() !== _id.toString()) {
    const error = new Error('Acción No Válida')
    return res.status(403).json({ msg: error.message })
  }

  try {
    await proyecto.deleteOne(_id)
    return res.json({ msg: 'Proyecto Eliminado' })
  } catch (error) {
    console.log(error)
  }
}
const agregarColaborador = async (req, res) => {

}
const eliminarColaborador = async (req, res) => {

}
const obtenerTareas = async (req, res) => {

}

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  obtenerTareas
}
