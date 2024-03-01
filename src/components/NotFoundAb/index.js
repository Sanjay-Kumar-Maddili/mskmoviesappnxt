import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-bg-containerab">
    <div className="not-found-content-containerab">
      <h1 className="not-found-titleab">Lost Your Way?</h1>
      <p className="not-found-descriptionab">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/" className="route-linkab">
        <button type="button" className="go-home-buttonab">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
