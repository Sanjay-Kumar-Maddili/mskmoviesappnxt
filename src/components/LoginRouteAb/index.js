import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value, showErrorMsg: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, showErrorMsg: false})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userData = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label className="labelab" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-fieldab"
          onChange={this.onChangeUsername}
          value={username}
          placeholder="Username"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="labelab" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-fieldab"
          onChange={this.onChangePassword}
          value={password}
          placeholder="Password"
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-bg-containerab">
        <div className="website-logo-image-containerab">
          <img
            src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1669787785/Movies%20App/Movies_Logo_nu3gsl.png"
            alt="login website logo"
            className="website-logoab"
          />
        </div>
        <form className="login-form-containerab" onSubmit={this.submitForm}>
          <h1 className="login-titleab">Login</h1>
          {this.renderUsername()}
          {this.renderPassword()}
          {showErrorMsg && <p className="error-msgab">{errorMsg}</p>}
          <button type="submit" className="login-btnab">
            Login
          </button>
          <button type="submit" className="sign-in-btnab">
            Sign in
          </button>
        </form>
      </div>
    )
  }
}

export default LoginRoute
