import {Switch, Route, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRouteAb/index'
import HomeSection from './components/HomeSectionAb/index'
import PopularSection from './components/PopularSectionAb/index'
import AccountSection from './components/AccountSectionAb/index'
import SearchRoute from './components/SearchRouteAb/index'
import MovieDetailSection from './components/MovieDetailSectionAb/index'
import NotFound from './components/NotFoundAb/index'
import ProtectedRoute from './components/ProtectedRouteAb/index'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeSection} />
    <ProtectedRoute exact path="/popular" component={PopularSection} />
    <ProtectedRoute exact path="/account" component={AccountSection} />
    <ProtectedRoute exact path="/search" component={SearchRoute} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetailSection} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
