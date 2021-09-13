import { ListContextProvider } from 'context/ListContext'
import * as H from 'history'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom'
import Home from 'views/Home'
import Profile from 'views/Profile'

type locationState = {
  background: H.Location
}

export default function Routes() {
  const location = useLocation<locationState>()

  const background = location.state && location.state.background
  return (
    <ListContextProvider>
      <Router>
        <Switch location={background || location}>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/:seed">
            <Home />
          </Route>
        </Switch>
        <Route path="/Profile/:seed/:id">
          <Profile />
        </Route>
      </Router>
    </ListContextProvider>
  )
}
