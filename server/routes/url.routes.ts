import { Router } from 'express'
import urlController from '../controllers/url.controller'

const route = Router()

route.get('/:slug', urlController)

export default route
