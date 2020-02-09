// Imports
import * as TYPES from '../types/SessionTypes';
import * as ADVERTS from '../types/AdvertsTypes';
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
 * Reducer para gestionar las acciones sobre los anuncios publicados de un usuario
 * @param {Array} state Anuncios
 * @param {Object} action Action
 */
export function published (state = initialState.favorites, action) {
    switch (action.type) {
        case TYPES.FETCH_PUBLISHED_SUCCESS:
            return [...action.published];
        case ADVERTS.CREATE_ADVERT_SUCCESS:
            return [action.advert, ...state];
        case ADVERTS.DELETE_ADVERT_SUCCESS:
            const i = state.findIndex(ad => ad._id === action.advert._id);
            if (i >= 0) return [...state.slice(0, i), ...state.slice(i + 1)];
            return state;
        case ADVERTS.BOOK_ADVERT_SUCCESS: 
            return state.map(a => {
                if (action.advert._id === a._id ) return {...a, booked: action.advert.booked};
                return {...a};
            });
        case ADVERTS.SELL_ADVERT_SUCCESS: 
            return state.map(a => {
                if (action.advert._id === a._id ) return {...a, sold: action.advert.sold};
                return {...a};
            });            
        case TYPES.LOGOUT_SUCCESS:
        case TYPES.DELETE_ACCOUNT_SUCCESS:
            return initialState.published;
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
        case TYPES.FETCH_FAVORITES_SUCCESS:
            return [...action.favorites];
        case TYPES.SET_FAVORITE_SUCCESS: {
            const i = state.findIndex(f => f._id === action.advert._id);
            if (action.advert.favorite && i < 0) {
                return [action.advert, ...state];
            } else if (!action.advert.favorite && i >= 0) {
                return [...state.slice(0, i), ...state.slice(i + 1)];
            }
            return state;
        }
        case ADVERTS.DELETE_ADVERT_SUCCESS: {
            const i = state.findIndex(ad => ad._id === action.advert._id);
            if (i >= 0) return [...state.slice(0, i), ...state.slice(i + 1)];
            return state;            
        }
        // Logout
        case TYPES.LOGOUT_SUCCESS:
        case TYPES.DELETE_ACCOUNT_SUCCESS:
            return initialState.favorites;
        default:
            return state;
    }
}