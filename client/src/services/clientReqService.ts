import {Dispatch, SetStateAction} from 'react'
import {movieReqService} from './index.ts'
import errorText from 'constants/errorText.ts'
import {TMovie} from 'types/movie.ts'

export const fetchMovies = async (setMovies: Dispatch<SetStateAction<TMovie[]>>, setFavoritesMovies: Dispatch<SetStateAction<TMovie[]>>) => {
  try {
    const movies = await movieReqService.readMovies()
    setMovies(movies)

    const favoriteMovies = await movieReqService.readFavoritesMovies()
    setFavoritesMovies(favoriteMovies)
  } catch (error) {
    console.error(errorText.ERROR_FETCHING, error)
  }
}

export const toggleLikeReq = async (liked: boolean, data: TMovie, setFavoritesMovies: Dispatch<SetStateAction<TMovie[]>>) => {
  try {
    if (liked) {
      await movieReqService.createMovie({...data, isLiked: liked})
    } else {
      await movieReqService.deleteMovie(data.id)
    }

    const movies = await movieReqService.readFavoritesMovies()
    setFavoritesMovies(movies)
  } catch (error) {
    console.error(`Error ${liked ? 'creating' : 'deleting'} movie:`, error)
  }
}

// export const updateRating = async (liked: boolean, data: TMovie, setFavoritesMovies: Dispatch<SetStateAction<TMovie[]>>) => {
//   try {
//     if (liked) {
//       await movieReqService.createMovie({...data, isLiked: liked})
//     } else {
//       await movieReqService.deleteMovie(data.id)
//     }

//     const movies = await movieReqService.readFavoritesMovies()
//     setFavoritesMovies(movies)
//   } catch (error) {
//     console.error(`Error ${liked ? 'creating' : 'deleting'} movie:`, error)
//   }
// }
