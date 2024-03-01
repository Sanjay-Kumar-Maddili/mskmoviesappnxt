import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieData} = props
  const {id, title, posterPath} = movieData

  return (
    <li className="movie-itemab">
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="movie-item-imageab" />
      </Link>
    </li>
  )
}

export default MovieItem
