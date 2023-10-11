import {TMovie} from 'types/movie.ts'

export type TUpdateMovieReq = {
  movieId: number
  data: TMovie
}
