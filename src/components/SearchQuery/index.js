import './index.css'

import NavBar from '../NavBar'

import MovieContext from '../../context/MovieContext'

import {useState, useEffect} from 'react'

import MovieItem from '../MovieItem'

import Loader from 'react-loader-spinner'

const SearchQuery = () => {
  const [searchData, setSearchData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pageNo, setPageNo] = useState(1)

  const pagenation = () => {
    return (
      <MovieContext.Consumer>
        {value => {
          const {changeMovieData} = value

          const onClickPrevious = () => {
            if (pageNo > 1) {
              changeMovieData(pageNo - 1)
              setPageNo(prevPageNo => prevPageNo - 1)
            }
          }
          const onClickNext = () => {
            setPageNo(prevPageNo => prevPageNo + 1)
            changeMovieData(pageNo + 1)
          }
          return (
            <div className="pagenation-container">
              <button className="page-button" onClick={onClickPrevious}>
                previous
              </button>
              <p>{pageNo}</p>
              <button className="page-button" onClick={onClickNext}>
                next
              </button>
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }
  const render = () => {
    return (
      <MovieContext.Consumer>
        {value => {
          const {movieData} = value
          setSearchData(movieData)
          return (
            <>
              <ul className="un-ordered-container">
                {searchData.map(movie => (
                  <MovieItem key={movie.id} movie={movie} />
                ))}
              </ul>
              {pagenation()}
            </>
          )
        }}
      </MovieContext.Consumer>
    )
  }

  const renderLoader = () => {
    return (
      <div className="loader-container">
        <Loader type="TailSpin" color="#032541" />
      </div>
    )
  }
  return (
    <div>
      <NavBar />
      {isLoading ? renderLoader() : render()}
    </div>
  )
}
export default SearchQuery
