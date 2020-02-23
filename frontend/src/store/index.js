// Node imports
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
// Own imports
import createRootReducer from './GlobalReducers';

const loggerMiddleware = createLogger();
const componseEnhancers = composeWithDevTools({
    name: `Redux`,
    realtime: true,
    trace: true,
    traceLimit: 25
});

// History
export const history = createBrowserHistory()

// Store
let store;

// Configura el store
export default function configureStore(preloadedState, notify, socketio, snackbar) {
    const middlewares = [ thunkMiddleware.withExtraArgument({history, notify, socketio, snackbar}), routerMiddleware(history) ];
    if (process.env === 'development') {
        middlewares.push(loggerMiddleware);
    }
    store = createStore(
        createRootReducer(history),
        preloadedState,
        componseEnhancers(applyMiddleware(...middlewares)),
    );
    return store;
}

export function getStore(){ return store };

/**
 * OPCION 2: para crear el reducer combinado.
 * 
 * Crear nuestor propia función, en vez de utilizar el combineReducers de react. De esta forma,
 * podemos pasar partes del estado a cualquiera de los reducers, que de la forma estandar
 * no tendrían acceso a ellas.
 *
 * const reducer = (state = initialState, action) => {
 *     return {
 *         adverts: adverts(state.adverts, action, {session: state.session}),
 *         filters: filters(state.filters, action),
 *         session: session(state.session, action)
 *     }
 * }
 */