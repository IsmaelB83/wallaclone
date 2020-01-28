// NPM Modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
/* Containers */
import AdvertDetail from '../AdvertDetail';
import AdvertEdit from '../AdvertEdit';
import Login from '../Login';
import Register from '../Register';
import Remember from '../Remember';
import Profile from '../Profile';
import Home from '../Home';
// Components
import ErrorBoundary from '../ErrorBoundary';
import PrivateRoute from '../PrivateRoute';
import Error404 from '../Error404';
// Models
// Own modules
// Assets
// CSS

/**
 * Main App
 */
export default function App(props) {
  
  /**
   * Render
   */
  return (
    <ErrorBoundary>
        <Router>
          <Switch>
              <Route path='/login' exact component={Login} />
              <Route path='/register' exact component={Register} />
              <Route path='/remember' exact component={Remember} />
              <PrivateRoute path='/profile' exact component={Profile} />
              <PrivateRoute path='/advert/display/:id' exact component={AdvertDetail} />
              <PrivateRoute path='/advert/create' exact render={(props) => <AdvertEdit {...props} mode='create'/>}/>
              <PrivateRoute path='/advert/edit/:id' exact render={(props) => <AdvertEdit {...props} mode='edit'/>}/>
              <PrivateRoute path='/' exact component={Home} />
              <PrivateRoute component={Error404} />
          </Switch>
        </Router>
    </ErrorBoundary>
  );
}