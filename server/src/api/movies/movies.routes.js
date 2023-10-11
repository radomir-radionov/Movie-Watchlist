import paths from '../../constants/paths.js'
import moviesHandlers from './movies.handlers.js'

const {
  moviesPaths: {movies, moviesFavortites, movieId},
} = paths

const routes = [
  {
    path: movies,
    method: 'get',
    action: moviesHandlers.readMovies,
  },
  {
    path: moviesFavortites,
    method: 'get',
    action: moviesHandlers.readFavoriteMovies,
  },
  {
    path: movies,
    method: 'post',
    action: moviesHandlers.createMovie,
  },
  {
    path: movieId,
    method: 'put',
    action: moviesHandlers.updateMovie,
  },
  {
    path: movieId,
    method: 'delete',
    action: moviesHandlers.deleteMovie,
  },
]

export default routes
