import express from 'express'
import { controller } from '../controllerTest.js'

const routes = express()

routes.get('/index', controller.index)

export { routes }
