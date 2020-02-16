// NPM Modules
import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
// Components
import PrivateRoute from '../../components/PrivateRoute';
import ErrorBoundary from '../../components/ErrorBoundary';
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
import SoldHistory from '../SoldHistory';
// Models
// Own modules
import configureStore, { history } from '../../store';
import { initialState } from '../../store/InitialState';
// Assets
// CSS

// Configuro el store, y sincronizo el history del store con el de router
const store = configureStore(initialState);

// APP Root Component
export default function App(props) {
  
  return (
    <ErrorBoundary>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <SnackbarProvider maxSnack={1}> 
                    <Switch>
                        <Route path='/login' exact component={Login} />
                        <Route path='/register' exact component={Register} />
                        <Route path='/reset' exact component={RequestReset} />
                        <Route path='/reset/:token' exact component={Reset} />
                        <Route path='/activate/:token' exact component={Login} />
                        <Route path='/published/:login' exact component={Published} />
                        <PrivateRoute path='/soldhistory' exact component={SoldHistory} />
                        <PrivateRoute path='/favorites' exact component={Favorites} />
                        <PrivateRoute path='/profile' exact component={Profile} />
                        <PrivateRoute path='/advert/create' exact render={(props) => <Edit {...props} mode='create'/>}/>
                        <PrivateRoute path='/advert/edit/:slug' exact render={(props) => <Edit {...props} mode='edit'/>}/>
                        <Route path='/advert/:slug' exact component={Detail} />
                        <Route path='/' exact component={Home} />
                        <Route component={Error404} />
                    </Switch>
                </SnackbarProvider>
            </ConnectedRouter>
        </Provider>
    </ErrorBoundary>
  );
}