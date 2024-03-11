import axios from 'axios'

export const axiosApiInstance = axios.create({
  baseURL: 'https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})
