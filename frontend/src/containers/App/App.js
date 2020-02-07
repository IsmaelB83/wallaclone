// NPM Modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import ErrorBoundary from '../../components/ErrorBoundary';
// Containers
import Favorites from '../Favorites';
import Published from '../Published';
import AdvertDetail from '../AdvertDetail';
import AdvertEdit from '../AdvertEdit';
import Login from '../Login';
import Register from '../Register';
import RequestReset from '../RequestReset';
import Reset from '../Reset';
import Profile from '../Profile';
import Home from '../Home';
import PrivateRoute from '../../components/PrivateRoute';
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
            <Route path='/reset' exact component={RequestReset} />
            <Route path='/reset/:token' exact component={Reset} />
            <Route path='/activate/:token' exact component={Login} />
            <Route path='/advert/display/:slug' exact component={AdvertDetail} />
            <PrivateRoute path='/published' exact component={Published} />
            <PrivateRoute path='/favorites' exact component={Favorites} />
            <PrivateRoute path='/profile' exact component={Profile} />
            <PrivateRoute path='/advert/create' exact render={(props) => <AdvertEdit {...props} mode='create'/>}/>
            <PrivateRoute path='/advert/edit/:slug' exact render={(props) => <AdvertEdit {...props} mode='edit'/>}/>
            <Route path='/' exact component={Home} />
            <Route component={Error404} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}