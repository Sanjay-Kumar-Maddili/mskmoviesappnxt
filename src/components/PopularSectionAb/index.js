import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../HeaderAb'
import MovieItem from '../MovieItemAb'
import FooterSection from '../FooterSectionAb'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularSection extends Component {
  state = {popularData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPopularApiData()
  }

  getPopularApiData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const popularApiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(popularApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        popularData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {popularData} = this.state
    return (
      <ul className="popular-item-list-containerab">
        {popularData.map(eachMovie => (
          <MovieItem movieData={eachMovie} key={eachMovie.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="popular-loader-containerab" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-viewab">
      <img
        src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670040709/Movies%20App/alert-triangle_sc1zom.png"
        alt="failure view"
        className="poster-failure-imageab"
      />
      <p className="failure-titleab">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-retry-buttonab"
        onClick={this.getPopularApiData}
      >
        Try Again
      </button>
    </div>
  )

  renderOutputView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="popular-bg-containerab">
          {this.renderOutputView()}
          <FooterSection />
        </div>
      </>
    )
  }
}

export default PopularSection
