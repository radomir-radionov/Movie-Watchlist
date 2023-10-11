import responseMessage from '../../constants/responseMessage.js'
import movieService from '../../dataStore.js'

const {ADD_FAVORITE_MOVIE_SUCCESS, ADD_FAVORITE_MOVIE_FAILURE, UPDATE_MOVIE_FAILURE, DELETE_FAVORITE_MOVIE_SUCCESS, DELETE_FAVORITE_MOVIE_FAILURE, MOVIE_NOT_FOUND, EXISTED_DATA} = responseMessage

const readMovies = async (ctx, next) => {
  ctx.body = movieService.getMovies()

  await next()
}

const readFavoriteMovies = async (ctx, next) => {
  ctx.body = movieService.getFavoriteMovies()

  await next()
}

const createMovie = async (ctx, next) => {
  const data = ctx.request.body
  const favoriteMovies = movieService.getFavoriteMovies()
  const isExisted = favoriteMovies.some((item) => item.id === data.id)

  ctx.assert(!isExisted, 409, EXISTED_DATA)

  const isDataAdded = movieService.addData(data)

  movieService.updateMovie(ctx, data.id, data)

  if (isDataAdded) {
    ctx.status = 201
    ctx.body = {message: ADD_FAVORITE_MOVIE_SUCCESS}
  } else {
    ctx.body = {message: ADD_FAVORITE_MOVIE_FAILURE}
  }

  await next()
}

const updateMovie = async (ctx, next) => {
  try {
    const {id} = ctx.request.params
    const updateMovie = ctx.request.body
    console.log(id, updateMovie)
    const result = movieService.updateMovie(ctx, +id, updateMovie)

    ctx.body = result
  } catch (error) {
    ctx.body = {message: UPDATE_MOVIE_FAILURE}
  }

  await next()
}

const updateFavoriteMovie = async (ctx, next) => {
  try {
    const {id} = ctx.request.params
    const updatedFavoriteMovie = ctx.request.body

    const result = movieService.updateFavoriteMovie(ctx, +id, updatedFavoriteMovie)

    ctx.body = result
  } catch (error) {
    ctx.body = {message: UPDATE_MOVIE_FAILURE}
  }

  await next()
}

const deleteMovie = async (ctx, next) => {
  const {id} = ctx.request.params

  const movies = movieService.getFavoriteMovies()

  const isExisted = movies.some((item) => item.id === +id)
  ctx.assert(isExisted, 404, MOVIE_NOT_FOUND)

  const isMovieDeleted = movieService.deleteData(+id)
  ctx.assert(isMovieDeleted, 500, DELETE_FAVORITE_MOVIE_FAILURE)

  const movie = movieService.getMovieById(+id)

  movieService.updateMovie(ctx, id, {...movie, isLiked: false})

  ctx.body = {message: DELETE_FAVORITE_MOVIE_SUCCESS}

  await next()
}

const moviesHandlers = {
  readMovies,
  readFavoriteMovies,
  createMovie,
  updateMovie,
  updateFavoriteMovie,
  deleteMovie,
}

export default moviesHandlers
