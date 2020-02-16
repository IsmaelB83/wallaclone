// Imports
import * as ADVERTS from '../types/AdvertsTypes';
import * as FILTERS from '../types/FiltersTypes';
import * as SESSION from '../types/SessionTypes';
import { initialState } from '../InitialState';

/**
 * Reducer para gestionar el estado de la ui
 * @param {Object} state UI state
 * @param {Object} action Action
 */
export function ui(state = initialState.ui, action) {
    switch (action.type) {
        // Filters related
        case FILTERS.SET_FILTERS:
            return { ...state, currentPage: 0 }
        case FILTERS.SET_PAGE:
            return { ...state, currentPage: action.pageNumber }
        // Feching related
        case ADVERTS.FETCH_ADVERT_REQUEST:
        case ADVERTS.FETCH_ADVERTS_REQUEST:
        case ADVERTS.SEARCH_ADVERTS_REQUEST:
        case ADVERTS.FETCH_ITERATE_ADVERTS_REQUEST:
        case ADVERTS.FETCH_FAVORITES_REQUEST:
        case ADVERTS.FETCH_USER_ADVERTS_REQUEST:
        case ADVERTS.FETCH_SOLD_HISTORY_REQUEST:
            return { ...state, isFetching: true, error: null }
        case ADVERTS.FETCH_ADVERT_FAILURE:
        case ADVERTS.FETCH_ADVERTS_FAILURE:
        case ADVERTS.SEARCH_ADVERTS_FAILURE:
        case ADVERTS.FETCH_ITERATE_ADVERTS_FAILURE:
        case ADVERTS.FETCH_FAVORITES_FAILURE:
        case ADVERTS.FETCH_USER_ADVERTS_FAILURE:
        case ADVERTS.FETCH_SOLD_HISTORY_FAILURE:
            return { ...state, isFetching: false, error: action.error }
        case ADVERTS.FETCH_ADVERT_SUCCESS:
            return { ...state, isFetching: false, error: null }
        case ADVERTS.FETCH_ADVERTS_SUCCESS:
        case ADVERTS.SEARCH_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_FAVORITES_SUCCESS:
        case ADVERTS.FETCH_ITERATE_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_USER_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_SOLD_HISTORY_SUCCESS:
            return { ...state, currentPage: 0, isFetching: false, error: null }
        // Authention related
        case SESSION.RESET_ACCOUNT_REQUEST:
        case SESSION.LOGIN_REQUEST:
        case SESSION.ACTIVATE_ACCOUNT_REQUEST:
        case SESSION.LOGIN_TOKEN_REQUEST:
        case SESSION.REQUEST_RESET_ACCOUNT_REQUEST:
            return { ...state, error: null, isAuthenticating: true }
        case SESSION.RESET_ACCOUNT_FAILURE:
        case SESSION.LOGIN_FAILURE:
        case SESSION.ACTIVATE_ACCOUNT_FAILURE:
        case SESSION.LOGIN_TOKEN_FAILURE:
        case SESSION.REQUEST_RESET_ACCOUNT_FAILURE:
            return { ...state, error: action.error, isAuthenticating: false }
        case SESSION.RESET_ACCOUNT_SUCCESS:
        case SESSION.LOGIN_SUCCESS:
        case SESSION.ACTIVATE_ACCOUNT_SUCCESS:
        case SESSION.LOGIN_TOKEN_SUCCESS:
        case SESSION.REQUEST_RESET_ACCOUNT_SUCCESS:
            return { ...state, error: null, isAuthenticating: false }
        // Edit related
        case SESSION.EDIT_ACCOUNT_REQUEST:
        case ADVERTS.EDIT_ADVERT_REQUEST:
            return { ...state, error: null, isUpdating: true }
        case SESSION.EDIT_ACCOUNT_FAILURE:
        case ADVERTS.EDIT_ADVERT_FAILURE:
            return { ...state, error: action.error, isUpdating: false }
        case SESSION.EDIT_ACCOUNT_SUCCESS:
        case ADVERTS.EDIT_ADVERT_SUCCESS:
            return { ...state, error: null, isUpdating: false }
        // Creation related
        case ADVERTS.CREATE_ADVERT_REQUEST:
        case SESSION.CREATE_ACCOUNT_REQUEST:
            return { ...state, error: null, isCreating: true }
        case SESSION.CREATE_ACCOUNT_FAILURE:
        case ADVERTS.CREATE_ADVERT_FAILURE:
                return { ...state, error: action.error, isCreating: false }
        case SESSION.CREATE_ACCOUNT_SUCCESS:
        case ADVERTS.CREATE_ADVERT_SUCCESS:
            return { ...state, error: null, isCreating: false }
        // Deletion related
        case SESSION.DELETE_ACCOUNT_REQUEST:
        case ADVERTS.DELETE_ADVERT_REQUEST:
            return { ...state, isDeleting: true, error: null }
        case SESSION.DELETE_ACCOUNT_FAILURE:
        case ADVERTS.DELETE_ADVERT_FAILURE:
            return { ...state, isDeleting: false, error: action.error }
        case ADVERTS.DELETE_ADVERT_SUCCESS:
            return { ...state, isDeleting: false, error: null }
        // Logout
        case SESSION.LOGOUT_SUCCESS:
        case SESSION.LOGOUT_FAILURE:
        case SESSION.DELETE_ACCOUNT_SUCCESS:
            return initialState.ui;
        // Default
        default:
            return state;
    }
}