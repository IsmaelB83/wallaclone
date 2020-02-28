// Imports
import * as FILTERS from '../types/FiltersTypes';
import * as ADVERTS from '../types/AdvertsTypes';
import * as SESSION from '../types/SessionTypes';
import { initialState } from '../InitialState';

/**
 * Reducer para gestionar las acciones sobre los filtros de la app
 * @param {Array} state Anuncios
 * @param {Object} action Action
 */
export function filters (state = initialState.filters, action) {
    switch (action.type) {
        // Set filters
        case FILTERS.SET_FILTERS:
        case ADVERTS.SEARCH_ADVERTS_SUCCESS:
            return { ...action.filters };
        // Delete filters
        case FILTERS.RESET_FILTERS:
        case SESSION.LOGOUT_SUCCESS:
        case SESSION.LOGOUT_FAILURE:
        case SESSION.DELETE_ACCOUNT_SUCCESS:
        case ADVERTS.FETCH_ADVERTS_SUCCESS:
            return initialState.filters;
        // Default
        default:
            return state;
    }
}