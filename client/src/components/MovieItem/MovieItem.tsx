import {useContext, useEffect, useState} from 'react'
import {Rating} from 'components/index.ts'
import AppContext from 'context/AppContext.tsx'
import {TMovie} from 'types/movie.ts'
import {toggleLikeReq} from 'services/clientReqService.ts'

type TProps = {
  data: TMovie
}

const MovieItem = ({data: {id, title, backdrop_path, rating, isLiked}}: TProps) => {
  const [liked, setLiked] = useState(isLiked)
  const {setFavoritesMovies} = useContext(AppContext)
  const reqData = {id, title, backdrop_path, rating, isLiked}
  const imageUrl = `https://image.tmdb.org/t/p/w300${backdrop_path}`

  const toggleLike = () => {
    setLiked((prevLiked) => {
      const newLiked = !prevLiked

      toggleLikeReq(newLiked, reqData, setFavoritesMovies)

      return newLiked
    })
  }

  useEffect(() => {
    console.log('liked:', liked)
  }, [liked])

  return (
    <div id={`${id}`} className='relative flex flex-col max-w-5 border border-slate-100 rounded-xl p-4 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2'>
      <div onClick={toggleLike} className='absolute top-10 left-10'>
        <img src={liked ? '/like-1.svg' : '/like-2.svg'} alt='Favorite' />
      </div>
      <img src={imageUrl} className='w-full' alt='Movie' />
      <h5>{title}</h5>
      <Rating movieId={id} initialRating={rating} maxRating={5} data={reqData} />
    </div>
  )
}

export default MovieItem
