import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {MdMenuOpen} from 'react-icons/md'
import './index.css'

class Header extends Component {
  state = {showMenu: false, currentPath: ''}

  componentDidMount() {
    const path = window.location.pathname
    this.setState({currentPath: path})
  }

  showSearchInput = () => {
    const {currentPath} = this.state
    return currentPath === '/search'
  }

  onShowSearchInput = () => {
    const {getSearchApiData} = this.props
    const showInput = this.showSearchInput()
    if (showInput) {
      getSearchApiData()
    }
  }

  toggleMenuItems = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onChangeSearchInput = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  onKeyDownEnter = event => {
    const {getSearchApiData} = this.props
    if (event.key === 'Enter') {
      getSearchApiData()
    }
  }

  render() {
    const {showMenu, currentPath} = this.state
    const showInput = this.showSearchInput()
    const homeClassName = currentPath === '/' ? 'selectedab' : null
    const popularClassName = currentPath === '/popular' ? 'selectedab' : null
    const accountClassName = currentPath === '/account' ? 'selectedab' : null
    return (
      <nav>
        <div className="navbarab">
          <div className="navbar-logo-link-containerab">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1669787785/Movies%20App/Movies_Logo_nu3gsl.png"
                alt="website logo"
                className="website-logoab"
              />
            </Link>

            <ul className="header-link-containerab">
              <Link to="/" className="route-linkab">
                <li className={`header-linkab ${homeClassName}`}>Home</li>
              </Link>
              <Link to="/popular" className="route-linkab">
                <li className={`header-linkab ${popularClassName}`}>Popular</li>
              </Link>
            </ul>
          </div>
          <div className="search-and-avatarab">
            <div className="search-containerab">
              {showInput && (
                <input
                  type="search"
                  className="search-inputab"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onKeyDownEnter}
                />
              )}
              <Link to="/search">
                <button
                  type="button"
                  className="search-buttonab"
                  onClick={this.onShowSearchInput}
                  testid="searchButton"
                >
                  <HiOutlineSearch size={18} color="#ffffff" />
                </button>
              </Link>
            </div>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1669785109/Movies%20App/Vector_Avatar1_hiwft7.png"
                alt="profile"
                className="avatar-imageab"
              />
            </Link>
            <button
              type="button"
              className="menu-buttonab"
              onClick={this.toggleMenuItems}
            >
              <MdMenuOpen />
            </button>
          </div>
        </div>

        {showMenu && (
          <ul className="menu-link-containerab">
            <Link to="/" className="route-linkab">
              <li className={`menu-linkab ${homeClassName}`}>Home</li>
            </Link>
            <Link to="/popular" className="route-linkab">
              <li className={`menu-linkab ${popularClassName}`}>Popular</li>
            </Link>
            <Link to="/account" className="route-linkab">
              <li className={`menu-linkab ${accountClassName}`}>Account</li>
            </Link>
            <li>
              <button
                type="button"
                className="close-buttonab"
                onClick={this.toggleMenuItems}
              >
                <AiFillCloseCircle />
              </button>
            </li>
          </ul>
        )}
      </nav>
    )
  }
}

export default Header
