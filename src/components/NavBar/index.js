import './index.css'

import {Link, withRouter} from 'react-router-dom'

import {useState} from 'react'

import MovieContext from '../../context/MovieContext'

const NavBar = props => {
  const [input, setInput] = useState('')

  const renderForm = () => {
    return (
      <MovieContext.Consumer>
        {value => {
          const {changeMovieData, changeInput} = value
          const onChangeInput = event => {
            setInput(event.target.value)
            changeInput(event.target.value)
          }
          const handleForm = e => {
            e.preventDefault()
            const {history} = props
            history.push('/search')
            changeMovieData()
            setInput('')
          }
          return (
            <form className="form-container" onSubmit={handleForm}>
              <input
                type="seach"
                placeholder="Search a Movie..."
                className="search-input"
                value={input}
                onChange={onChangeInput}
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          )
        }}
      </MovieContext.Consumer>
    )
  }
  return (
    <nav className="nav-container">
      <div className="main-heading">
        <h1>movieDB</h1>
      </div>
      <div>
        <ul className="main-buttob-un-orderd-container">
          <Link to="/">
            <li>Popular</li>
          </Link>
          <Link to="/top-rated">
            <li>TopRated</li>
          </Link>
          <Link to="/upcoming">
            <li>UpComing</li>
          </Link>
        </ul>
      </div>
      {renderForm()}
    </nav>
  )
}
export default withRouter(NavBar)
