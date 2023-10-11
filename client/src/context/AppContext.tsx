import {Dispatch, SetStateAction, createContext} from 'react'
import {TMovie} from 'types/movie.ts'

const AppContext = createContext<{
  mainItems: 'all' | 'favorites'
  setMainItems: Dispatch<SetStateAction<'all' | 'favorites'>>
  favoritesMovies: TMovie[]
  setFavoritesMovies: Dispatch<SetStateAction<TMovie[]>>
}>({
  mainItems: 'all',
  setMainItems: () => {},
  favoritesMovies: [],
  setFavoritesMovies: () => {},
})

export default AppContext
