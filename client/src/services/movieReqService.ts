import httpService from 'http/index'
import {TUpdateMovieReq} from './types'
import serverApiEndpoints from 'constants/serverApiEndpoints'
import {TMovie} from 'types/movie.ts'

const {HOST_API_MOVIES, HOST_API_FAVORITE_MOVIES} = serverApiEndpoints

const movieReqService = {
  readMovies: async () => {
    const {data} = await httpService.get(HOST_API_MOVIES)
    return data
  },
  readFavoritesMovies: async () => {
    const {data} = await httpService.get(HOST_API_FAVORITE_MOVIES)
    return data
  },
  createMovie: async (payload: TMovie) => {
    const {
      data: {message},
    } = await httpService.post(HOST_API_MOVIES, payload)

    return message
  },
  updateMovie: async (payload: TUpdateMovieReq) => {
    const {movieId, data} = payload
    const res = await httpService.put(`${HOST_API_MOVIES}/${movieId}`, data)

    return res
  },
  deleteMovie: async (id: number) => {
    const {
      data: {message},
    } = await httpService.delete(`${HOST_API_MOVIES}/${id}`)

    return message
  },
}

export default movieReqService
