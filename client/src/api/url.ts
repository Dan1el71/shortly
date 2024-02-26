import axios from '../libs/axios'

export const getUserUrls = async () => {
  return axios.get('/url')
}
