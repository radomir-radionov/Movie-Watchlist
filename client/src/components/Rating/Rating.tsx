import {useState} from 'react'
import Star from './Star.tsx'
import movieReqService from 'services/movieReqService.ts'
import {TMovie} from 'types/movie.ts'

type TProps = {
  movieId: number
  maxRating: number
  initialRating: number
  data: TMovie
}

const Rating = ({movieId, maxRating, initialRating, data}: TProps) => {
  const [rating, setRating] = useState(initialRating)

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating)

    movieReqService.updateMovie({movieId, data: {...data, rating: selectedRating}})
  }

  return (
    <div>
      {Array.from({length: maxRating}, (_, index) => (
        <Star key={index} selected={index < rating} onClick={() => handleStarClick(index + 1)} />
      ))}
    </div>
  )
}

export default Rating
