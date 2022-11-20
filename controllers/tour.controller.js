const { request, response } = require('express')
const { DateTime } = require('luxon')

const { Tour } = require('../models')

const getTours = async (req = request, res = response) => {
  try {
    let { from = 0, lot = 5 } = req.query
    from = from <= 0 || isNaN(from) ? 0 : from - 1

    const query = { status: true }

    const [tours, total] = await Promise.all([
      Tour.find(query)
        .populate('user')
        .skip(from)
        .limit(lot),
      Tour.countDocuments(query),
    ])

    const quantity = tours.length
    const pagination = {
      from: Number(from + 1),
      lot: Number(lot),
    }

    res.json({
      total,
      quantity,
      pagination,
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}


const createTour = async (req = request, res = response) => {
  try {
    let { name, descripcion, ...body } = req.body

    name = req.body.name.trim().toUpperCase()
    const tourDB = await Tour.findOne({ name })

    if (tourDB) {
      return res.status(400).json({
        msg: `El tour ${tourDB.name} ya existe`,
      })
    }

    const data = {
      ...body,
      name,
      user: req.authenticatedUser.id,
      createdAt: DateTime.now(),
      modifiedAt: DateTime.now(),
    }

    const tour = new Tour(data)
    const { _id } = await tour.save()
    const newTour = await Tour.findOne({ _id })

    res.status(201).json({
      newTour,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}



module.exports = {
  getTours,
  createTour,
}