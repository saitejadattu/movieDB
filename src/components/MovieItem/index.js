import './index.css'
const MovieItem = props => {
  const {movie} = props
  const {
    backdropPath,
    title,
    posterPath,
    overview,
    voteAverage,
    releaseDate,
    id,
  } = movie
  const onClickViewDetails = () => {
    console.log('onClickViewDetails')
  }
  return (
    <li className="list-item-container">
      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
      />

      <div className="contet-container">
        <p> {title}</p>
        <p> {voteAverage}</p>
      </div>
      <button className="view-details-button" onClick={onClickViewDetails}>
        View Details
      </button>
    </li>
  )
}
export default MovieItem
