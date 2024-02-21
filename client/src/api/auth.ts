import axios from '../libs/axios'

export const guestLogin = async () => {
  return axios.post('/auth/guest')
}

export const logout = async () => {
  return axios.get('/auth/logout')
}

export const getProfile = async () => {
  return axios.get('/auth/profile')
}
