import './index.css'

import {useEffect, useState} from 'react'

import NavBar from '../NavBar'

import Cookies from 'js-cookie'

import MovieItem from '../MovieItem'

import Loader from 'react-loader-spinner'

const Popular = () => {
  const [popular, setPopular] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageNo, setPageNo] = useState(1)
  const fetchData = async (num = 1) => {
    const apiKey = Cookies.get('key')
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${num}`,
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
    setPopular(updatedData)
    setIsLoading(false)
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
        {popular.map(movie => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    )
  }
  return (
    <div className="container">
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
export default Popular
