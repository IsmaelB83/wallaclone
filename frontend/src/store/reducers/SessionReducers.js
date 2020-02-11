// Imports
import * as TYPES from '../types/SessionTypes';
import { initialState } from '../InitialState';

/**
 * Reducer para gestionar las acciones sobre la sesion de usuario
 * @param {Array} state Anuncios
 * @param {Object} action Action
 */
export function session (state = initialState.session, action) {
    switch (action.type) {
        case TYPES.LOGIN_FAILURE:
        case TYPES.LOGIN_TOKEN_FAILURE:
            return initialState.session;
        case TYPES.LOGIN_SUCCESS:
        case TYPES.LOGIN_TOKEN_SUCCESS:
            return {...action.session}
        case TYPES.LOGOUT_SUCCESS:
            return initialState.session;
        default:
            return state;
    }
}