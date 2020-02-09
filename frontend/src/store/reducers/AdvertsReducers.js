// Imports
import * as ADVERTS from '../types/AdvertsTypes';
import * as SESSION from '../types/SessionTypes';
import { initialState } from '../InitialState';

/**
 * Reducer para gestionar los tags disponibles en el backend
 * @param {Array} state Tags
 * @param {Object} action Action
 */
export function tags(state = initialState.tags, action) {
    switch (action.type) {
        case ADVERTS.FETCH_TAGS_SUCCESS:
            return action.tags;
        default:
            return state;
    }
}

/**
 * Reducer para gestionar las acciones sobre los anuncios de la app
 * @param {Array} state Anuncios
 * @param {Object} action Action
 */
export function adverts(state = initialState.adverts, action) {
    switch (action.type) {
        // Initialization
        case ADVERTS.FETCH_ADVERTS_REQUEST:
        case ADVERTS.FETCH_ADVERTS_FAILURE:
            return initialState.adverts;
        // Adverts related
        case ADVERTS.FETCH_ADVERTS_SUCCESS:
            return [...action.adverts];
        case ADVERTS.CREATE_ADVERT_SUCCESS:
            return [action.advert, ...state];
        case ADVERTS.EDIT_ADVERT_SUCCESS:
            return state.map(advert => {
                if (advert._id === action.advert._id) return { ...action.advert }
                return advert;
            });
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
        case ADVERTS.DELETE_ADVERT_SUCCESS:
            const i = state.findIndex(advert => advert._id === action.advert._id);
            return [ ...state.slice(0, i), ...state.slice(i + 1) ];
        // Favorites related
        case SESSION.FETCH_FAVORITES_SUCCESS:
            return state.map(a => {
                const favorite = action.favorites.findIndex(f => f._id === a._id) >= 0 ? true : false;
                return {...a, favorite};
            });
        case SESSION.SET_FAVORITE_SUCCESS:
            return state.map(a => {
                if (action.advert._id === a._id ) return {...a, favorite: action.advert.favorite};
                return {...a};
            });
        // Logout
        case SESSION.LOGOUT_SUCCESS:
        case SESSION.DELETE_ACCOUNT_SUCCESS:
            return initialState.adverts;
        // Default
        default:
            return state;
    }
}