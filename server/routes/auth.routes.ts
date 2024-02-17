import { Router } from 'express'
import {
  emailLoginHandler,
  guestLogin,
  profileHandler,
  registerEmail,
} from '../controllers/auth.controller'
import { requireAuth } from '../middlewares/requireAuth'

const route = Router()

route.post('/login', emailLoginHandler)
route.post('/register', registerEmail)

route.post('/guest', guestLogin)

route.get('/profile', requireAuth, profileHandler)

export default route
