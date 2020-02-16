// NPM Modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// ComponentsW
import ErrorBoundary from '../../components/ErrorBoundary';
import PrivateRoute from '../../components/PrivateRoute';
// Containers
import Favorites from '../Favorites';
import Published from '../Published';
import Detail from '../Detail';
import Edit from '../Edit';
import Login from '../Login';
import Register from '../Register';
import RequestReset from '../RequestReset';
import Reset from '../Reset';
import Profile from '../Profile';
import Home from '../Home';
import Error404 from '../Error404';
// Models
// Own modules
// Assets
// CSS

/**
 * APP Root Component
 * @param {*} props Props del component
 */
export default function App(props) {
  
  // Render
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/reset' exact component={RequestReset} />
            <Route path='/reset/:token' exact component={Reset} />
            <Route path='/activate/:token' exact component={Login} />
            <Route path='/published/:login' exact component={Published} />
            <PrivateRoute path='/favorites' exact component={Favorites} />
            <PrivateRoute path='/profile' exact component={Profile} />
            <PrivateRoute path='/advert/create' exact render={(props) => <Edit {...props} mode='create'/>}/>
            <PrivateRoute path='/advert/edit/:slug' exact render={(props) => <Edit {...props} mode='edit'/>}/>
            <Route path='/advert/:slug' exact component={Detail} />
            <Route path='/' exact component={Home} />
            <Route component={Error404} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}