import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../HeaderAb'
import TrendingSection from '../TrendingSectionAb/index'
import TopRatedSection from '../TopRatedSectionAb/index'
import VideosSlider from '../VideosSliderAb/index'
import FooterSection from '../FooterSectionAb/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeSection extends Component {
  state = {originalsData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getOriginalsData()
  }

  getOriginalsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const originalsApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(originalsApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        originalsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPosterSuccessView = () => {
    const {originalsData} = this.state
    const randomNumber = Math.floor(Math.random() * (originalsData.length - 1))
    const posterImage = originalsData[randomNumber]

    return (
      <div
        style={{backgroundImage: `url(${posterImage.backdropPath})`}}
        className="bg-imageab"
      >
        <Header />
        <div className="movie-heading-containerab">
          <h1 className="poster-titleab">{posterImage.title}</h1>
          <p className="poster-descriptionab">{posterImage.overview}</p>
          <button type="button" className="play-buttonab">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderPosterLoadingView = () => (
    <div className="home-loader-containerab" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPosterFailureView = () => (
    <div className="poster-failure-viewab">
      <img
        src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670040709/Movies%20App/alert-triangle_sc1zom.png"
        alt="failure view"
        className="poster-failure-imageab"
      />
      <p className="failure-titleab">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-retry-buttonab"
        onClick={this.getOriginalsData}
      >
        Try Again
      </button>
    </div>
  )

  renderPosterOutputView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPosterSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderPosterLoadingView()
      case apiStatusConstants.failure:
        return this.renderPosterFailureView()

      default:
        return null
    }
  }

  renderOriginalsLoadingView = () => (
    <div className="loader-containerab" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderOriginalsSuccessView = () => {
    const {originalsData} = this.state
    return <VideosSlider videoData={originalsData} />
  }

  renderOriginalsFailureView = () => (
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
        onClick={this.getOriginalsData}
      >
        Try Again
      </button>
    </div>
  )

  renderOriginalsOutputView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOriginalsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderOriginalsLoadingView()
      case apiStatusConstants.failure:
        return this.renderOriginalsFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="home-bg-containerab">
          {this.renderPosterOutputView()}
          <hr />
          <h1 className="section-titleab">Trending Now</h1>
          <div className="video-slider-containerab">
            <TrendingSection />
          </div>
          <h1 className="section-titleab">Top Rated</h1>
          <div className="video-slider-containerab">
            <TopRatedSection />
          </div>
          <h1 className="section-titleab">Originals</h1>
          <div className="video-slider-containerab">
            {this.renderOriginalsOutputView()}
          </div>
          <hr className="rulerab" />
        </div>
        <FooterSection />
      </>
    )
  }
}

export default HomeSection
