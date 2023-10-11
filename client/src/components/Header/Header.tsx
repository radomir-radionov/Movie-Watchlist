import {useContext} from 'react'
import AppContext from 'context/AppContext.tsx'

const Header = () => {
  const {mainItems, setMainItems, favoritesMovies} = useContext(AppContext)

  const isFavitesActive = mainItems === 'favorites'

  const handleLiClick = () => {
    setMainItems(mainItems === 'favorites' ? 'all' : 'favorites')
  }

  return (
    <header className='flex justify-between border-b border-slate-200 px-10 py-8 sm:flex-col sm:px-4'>
      <div className='flex items-center gap-4'>
        <div>
          <h2 className='font-bold text-xl uppercase'>Movie Watchlist</h2>
          <p className='text-slate-400'>The best choice for movie app</p>
        </div>
      </div>
      <ul className='flex items-center gap-10'>
        <li onClick={handleLiClick} className='flex items-center gap-3 cursor-pointer'>
          <img src={isFavitesActive ? '/like-1.svg' : '/like-2.svg'} alt='Favorite' />
          <span>Favorites {favoritesMovies.length}</span>
        </li>
      </ul>
    </header>
  )
}

export default Header
