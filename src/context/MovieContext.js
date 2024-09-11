import React from 'react'
const MovieContext = React.createContext({
  movieData: [],
  changeMovieData: () => {},
  eInput: '',
  changeInput: () => {},
  fetchData: '',
  changeFetchData: () => {},
})

export default MovieContext
