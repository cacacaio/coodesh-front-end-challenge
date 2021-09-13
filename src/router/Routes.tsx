import {ListContextProvider} from 'context/ListContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from 'views/Home'
import Profile from 'views/Profile'

export default function Routes() {
  return (
    <ListContextProvider>
      <Router>
        <Switch>
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
