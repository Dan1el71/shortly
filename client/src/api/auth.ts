import axios from '../libs/axios'

export const guestLogin = async () => {
  return axios.post('/auth/guest')
}

export const registerEmail = async (
  username: string,
  email: string,
  password: string
) => {
  return axios.post('/auth/register', {
    username,
    email,
    password,
  })
}

export const loginEmail = async (email: string, password: string) => {
  return axios.post('/auth/login', {
    email,
    password,
  })
}

export const logout = async () => {
  return axios.get('/auth/logout')
}

export const getProfile = async () => {
  return axios.get('/auth/profile')
}
