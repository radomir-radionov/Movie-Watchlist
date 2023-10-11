import responseMessage from './constants/responseMessage.js'
import mockMovies from './mock/movies.js'

const {UPDATE_MOVIE_SUCCESS, MOVIE_NOT_FOUND} = responseMessage

const movies = [...mockMovies]
const favoriteMovies = []

const movieService = {
  getMovies: () => movies,
  getFavoriteMovies: () => favoriteMovies,
  getMovieById: (id) => movies.find((item) => item.id === id),
  getFavoriteMovieId: (id) => favoriteMovies.find((item) => item.id === id),
  addData: (data) => favoriteMovies.push(data),
  updateMovie: (ctx, id, data) => {
    const index = movies.findIndex((movie) => movie.id === +id)

    if (index !== -1) {
      movies[index] = data

      ctx.status = 201
      return {message: UPDATE_MOVIE_SUCCESS}
    }

    ctx.status = 404
    return {message: MOVIE_NOT_FOUND}
  },
  updateFavoriteMovie: (ctx, id, data) => {
    const index = favoriteMovies.findIndex((movie) => movie.id === +id)

    if (index !== -1) {
      favoriteMovies[index] = data

      ctx.status = 201
      return {message: UPDATE_MOVIE_SUCCESS}
    }

    ctx.status = 404
    return {message: MOVIE_NOT_FOUND}
  },
  deleteData: (id) => {
    const index = favoriteMovies.findIndex((item) => item.id === id)

    if (index !== -1) {
      favoriteMovies.splice(index, 1)
      return true
    }
    return false
  },
}

export default movieService
