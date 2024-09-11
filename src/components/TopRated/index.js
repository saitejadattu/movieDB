import './index.css'

import NavBar from '../NavBar'

import Cookies from 'js-cookie'

import {useState, useEffect} from 'react'

import MovieItem from '../MovieItem'

import Loader from 'react-loader-spinner'

const TopRated = () => {
  const [topRated, setTopRated] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [pageNo, setPageNo] = useState(1)
  const fetchData = async (num = 1) => {
    const apiKey = Cookies.get('key')
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${num}`,
    )
    const data = await response.json()
    const updatedData = data.results.map(each => ({
      backdropPath: each.backdrop_path,
      title: each.title,
      posterPath: each.poster_path,
      overview: each.overview,
      voteAverage: each.vote_average,
      releaseDate: each.release_date,
      id: each.id,
    }))
    setTopRated(updatedData)
    setisLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const onClickPrevious = () => {
    if (pageNo > 1) {
      fetchData(pageNo - 1)
      setPageNo(prevPageNo => prevPageNo - 1)
    }
  }
  const onClickNext = () => {
    setPageNo(prevPageNo => prevPageNo + 1)
    fetchData(pageNo + 1)
  }
  const renderLoader = () => {
    return (
      <div className="loader-container">
        <Loader type="TailSpin" color="#032541" />
      </div>
    )
  }
  const renderMovie = () => {
    return (
      <ul className="un-ordered-container">
        {topRated.map(movie => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    )
  }
  return (
    <div>
      <NavBar />
      {isLoading ? renderLoader() : renderMovie()}
      <div className="pagenation-container">
        <button className="page-button" onClick={onClickPrevious}>
          previous
        </button>
        <p>{pageNo}</p>
        <button className="page-button" onClick={onClickNext}>
          next
        </button>
      </div>
    </div>
  )
}
export default TopRated
