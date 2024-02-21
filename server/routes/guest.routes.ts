import { Router } from 'express'
import { deleteAllGuests, getAllGuests } from '../controllers/guest.controller'

const route = Router()

route.get('/', getAllGuests)
route.delete('/', deleteAllGuests)

export default route
