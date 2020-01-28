// Node imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// Own imports
import * as reducers from './reducers';

const loggerMiddleware = createLogger();
const componseEnhancers = composeWithDevTools;

/**
 * Configura el store
 */
export function configureStore(preloadedState) {
    const reducer = combineReducers(reducers);
    const middlewares = [ thunkMiddleware ];
    if (process.env === 'development') {
        middlewares.push(loggerMiddleware);
    }
    const store = createStore(
        reducer, 
        preloadedState,
        componseEnhancers(applyMiddleware(...middlewares)),
    );
    return store;
}

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