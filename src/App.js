import './App.css'

import {Route, Switch} from 'react-router-dom'

import Popular from './components/Popular'

import TopRated from './components/TopRated'

import UpComing from './components/UpComing'

import MovieContext from './context/MovieContext'

import Cookies from 'js-cookie'

import SearchQuery from './components/SearchQuery'

import {useState} from 'react'
// write your code here
const App = () => {
  const [eInput, setInput] = useState('')
  const [movieData, setMovieData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  let apiKey = 'c59a415bc0973e155774d4c7482a51bf'
  Cookies.set('key', apiKey)
  const changeInput = e => setInput(e)

  const updatedData = data =>
    data.results.map(each => ({
      backdropPath: each.backdrop_path,
      title: each.title,
      posterPath: each.poster_path,
      overview: each.overview,
      voteAverage: each.vote_average,
      releaseDate: each.release_date,
      id: each.id,
    }))
  const changeMovieData = async (num = 1) => {
    const apiKey = Cookies.get('key')
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${eInput}&page=${num}`,
    )
    const data = await response.json()
    setMovieData(updatedData(data))
    setIsLoading(false)
  }
  return (
    <MovieContext.Provider
      value={{movieData, changeMovieData, eInput, changeInput}}
    >
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={UpComing} />
        <Route exact path="/search" component={SearchQuery} />
      </Switch>
    </MovieContext.Provider>
  )
}
export default App
