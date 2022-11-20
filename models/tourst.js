const { DateTime } = require('luxon')
const { Schema, model } = require('mongoose')

const TourSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'La descripccion es requeridad'],
  },
  ruta: {
    type: String,
    required: [true, 'La ruta es obligatoria'],
  },
  imageUrl:{
    type:String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  puntoEncuentro: {
    type: String,
    required: [true, 'El punto de encuentro es requerido'],
  },
  fecha: {
    type: DateTime,
    required: [true, 'La fecha es requerida'],
  },
  actividades: {
    type: String,
    required:false,
  }
})

module.exports = model('Tour', TourSchema)
