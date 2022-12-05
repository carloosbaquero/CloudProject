import express from 'express'
import { controller } from '../controllers/controllerTest.js'

const routesTest = express()

routesTest.get('/index', controller.index)
routesTest.get('/create', controller.create)

export { routesTest }
