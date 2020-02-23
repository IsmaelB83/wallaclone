// Imports
import * as ADVERTS from '../types/AdvertsTypes';
import * as SESSION from '../types/SessionTypes';
import { initialState } from '../InitialState';

/**
 * Reducer para gestionar las acciones sobre los anuncios de la app
 * @param {Array} state Anuncios
 * @param {Object} action Action
 */
export function adverts(state = initialState.adverts, action) {
    switch (action.type) {
        // Initialization
        case ADVERTS.FETCH_ADVERTS_FAILURE:
        case ADVERTS.SEARCH_ADVERTS_FAILURE:
        case ADVERTS.FETCH_ITERATE_ADVERTS_FAILURE:
        case ADVERTS.FETCH_FAVORITES_FAILURE:
        case ADVERTS.FETCH_USER_ADVERTS_FAILURE:
        case ADVERTS.FETCH_SOLD_HISTORY_FAILURE:
            return initialState.adverts;
        // Adverts related
        case ADVERTS.FETCH_ADVERTS_SUCCESS:
        case ADVERTS.SEARCH_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_ITERATE_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_FAVORITES_SUCCESS:
        case ADVERTS.FETCH_USER_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_SOLD_HISTORY_SUCCESS:
            return [...action.adverts];
        case ADVERTS.CREATE_ADVERT_SUCCESS:
            return [action.advert, ...state];
        case ADVERTS.EDIT_ADVERT_SUCCESS: {
            const i = state.findIndex(ad => ad._id === action.advert._id);
            if (i >= 0) {
                return [ ...state.slice(0, i), action.advert, ...state.slice(i + 1) ]
            }
            return state;
        }
        case ADVERTS.BOOK_ADVERT_SUCCESS: {
            const i = state.findIndex(ad => ad._id === action.advert._id);
            if (i >= 0) {
                const ad = {...state[i]};
                ad.booked = action.advert.booked;
                return [ ...state.slice(0, i), ad, ...state.slice(i + 1) ]
            }
            return state;
        }        
        case ADVERTS.SELL_ADVERT_SUCCESS:  {
            const i = state.findIndex(advert => advert._id === action.advert._id);
            return [ ...state.slice(0, i), ...state.slice(i + 1) ];
        }
        case ADVERTS.DELETE_ADVERT_SUCCESS: {
            const i = state.findIndex(advert => advert._id === action.advert._id);
            return [ ...state.slice(0, i), ...state.slice(i + 1) ];
        }
        // Favorites related
        case SESSION.SET_FAVORITE_SUCCESS: { 
            const i = state.findIndex(ad => ad._id === action.advert._id);
            if (i >= 0) {
                const ad = {...state[i]};
                ad.favorite = action.advert.favorite;
                return [ ...state.slice(0, i), ad, ...state.slice(i + 1) ]
            }
            return state;
        }  
        // Logout
        case SESSION.LOGOUT_SUCCESS:
        case SESSION.LOGOUT_FAILURE:
        case SESSION.DELETE_ACCOUNT_SUCCESS:
            return initialState.adverts;
        // Default
        default:
            return state;
    }
}