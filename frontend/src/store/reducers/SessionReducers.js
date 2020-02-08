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

/**
 * Reducer para gestionar las acciones sobre los favoritos del usuario
 * @param {Array} state Anuncios
 * @param {Object} action Action
 */
export function favorites (state = initialState.favorites, action) {
    switch (action.type) {
        case TYPES.SET_FAVORITES:
            return [...action.favorites];
        case TYPES.SET_FAVORITE_SUCCESS:
            // If action.favorite === true tries to insert favorite
            const i = state.findIndex(fav => fav === action._id);
            if (action.favorite && i < 0) {
                return [...state, action._id];
            } else if (!action.favorite && i >= 0) {
                return [...state.slice(0, i), ...state.slice(i + 1)];
            }
            return state;
        case TYPES.LOGOUT_SUCCESS:
            return initialState.favorites;
        default:
            return state;
    }
}