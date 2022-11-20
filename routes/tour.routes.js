const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares')

const router = Router

router.post('/', createTour)

// router.get('/', getTour)
