// NPM Modules
import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// Components
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
import History from '../History';
// Own modules
import { SessionActions } from '../../store/GlobalActions';
import configureStore, { history } from '../../store';
import { initialState } from '../../store/InitialState';
// Models
// Assets
// CSS

// APP Root Component
export default function App(props) {

    // When user clicks in a push notification. This is the callback that service worker execute it
    const showNotification = (content) => {
        switch (content.action) {
            case 'navigate':
                // Accion de navegación
                history.push(content.data)
                break;
            case 'delete':
                // Elimino de favoritos y navego a favoritos
                store.dispatch(SessionActions.setFavorite(content.data))
                .then(() => {
                    props.enqueueSnackbar(props.t('Product deleted from favorites'), { variant: 'success'});
                    history.push('/favorites')
                })
                .catch(error => props.enqueueSnackbar(props.t('Error deleting advert from favorites ERROR', {error}), { variant: 'error' }));
                break;
            default:
                console.error('Uncontrolled action returned by service worker');
        }
    }

    // Configuro el store, y sincronizo el history del store con el de router
    const store = configureStore(initialState, showNotification);

    // Render
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path='/login' exact component={Login} />
                    <Route path='/register' exact component={Register} />
                    <Route path='/reset' exact component={RequestReset} />
                    <Route path='/reset/:token' exact component={Reset} />
                    <Route path='/activate/:token' exact component={Login} />
                    <Route path='/published/:login' exact component={Published} />
                    <PrivateRoute path='/history' exact component={History} />
                    <PrivateRoute path='/favorites' exact component={Favorites} />
                    <PrivateRoute path='/profile' exact component={Profile} />
                    <PrivateRoute path='/advert/create' exact render={(props) => <Edit {...props} mode='create'/>}/>
                    <PrivateRoute path='/advert/edit/:slug' exact render={(props) => <Edit {...props} mode='edit'/>}/>
                    <Route path='/advert/:slug' exact component={Detail} />
                    <Route path='/' exact component={Home} />
                    <Route component={Error404} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
}