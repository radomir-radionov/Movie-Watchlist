import {useEffect, useState} from 'react'
import Header from 'components/Header/Header'
import MovieItem from 'components/MovieItem/MovieItem'
import {TMovie} from 'types/movie.ts'
import AppContext from 'context/AppContext.tsx'
import {fetchMovies} from 'services/clientReqService.ts'

const Home = () => {
  const [mainItems, setMainItems] = useState<'all' | 'favorites'>('all')
  const [movies, setMovies] = useState<TMovie[]>([])
  const [favoritesMovies, setFavoritesMovies] = useState<TMovie[]>([])
  const moviesToRender = mainItems === 'all' ? movies : favoritesMovies
  const titleValue = mainItems === 'favorites' ? 'Favorites' : 'All'

  useEffect(() => {
    fetchMovies(setMovies, setFavoritesMovies)
  }, [])

  return (
    <AppContext.Provider value={{mainItems, setMainItems, favoritesMovies, setFavoritesMovies}}>
      <div className='bg-white w-f m-auto rounded-xl shadow-xl shadow-grey-200 mt-20 mb-20 mx-2 '>
        <Header />
        <div className='p-10 sm:px-4'>
          <div className='flex justify-between align-column items-center mb-10'>
            <h1 className='text-3xl font-bold'>{titleValue} movies</h1>
          </div>
          <div className='flex flex-wrap justify-center items-center gap-10 mb-10'>
            <div className='flex flex-wrap justify-center items-center gap-10 mb-10'>
              {moviesToRender.map((movie) => (
                <MovieItem key={movie.id} data={movie} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default Home
