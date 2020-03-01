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
            return action.session;
        case TYPES.EDIT_ACCOUNT_SUCCESS:
            return {
                ...state,
                avatar: action.user.avatar,
                email: action.user.email,
                login: action.user.login,
                name: action.user.name
            }
        case TYPES.LOGOUT_SUCCESS:
        case TYPES.LOGOUT_FAILURE:
            return initialState.session;
        case TYPES.SET_FAVORITE_SUCCESS:
            const i = state.favorites.indexOf(action.advert._id);
            let favorites = []
            if (i>=0 && !action.advert.favorite) {
                favorites = [ ...state.favorites.slice(0, i), ...state.favorites.slice(i + 1) ];
            }  else {
                favorites = [ ...state.favorites, action.advert._id ];
            }
            return {
                ...state,
                favorites: favorites
            }
        default:
            return state;
    }
}