import axios from 'axios'

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_COWRYWISE_UNSPLASH_ACCESS_KEY}`
  }
})

export const getAfricanPhotos = () => {
  return unsplashApi.get('/photos/random', {
    params: {
      query: 'African',
      count: 8,
      orientation: 'landscape'
    }
  })
}

export const searchPhotos = (query, page = 1, perPage = 8) => {
  return unsplashApi.get('/search/photos', {
    params: {
      query,
      page,
      per_page: perPage
    }
  })
}

export default unsplashApi
