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
        case SESSION.LOGOUT:
        case SESSION.DELETE_ACCOUNT_SUCCESS:
        case ADVERTS.FETCH_ADVERTS_SUCCESS:
            return initialState.filters;
        // Default
        default:
            return state;
    }
}

/**
 * Reducer para gestionar las acciones sobre los datos de la última llamada al API
 * @param {Array} state objeto last call del estado
 * @param {Object} action action recibida en el reducer
 */
export function lastCall (state = initialState.filters, action) {
    switch (action.type) {
        // Set api call statistics
        case ADVERTS.FETCH_ADVERTS_SUCCESS:
        case ADVERTS.SEARCH_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_ITERATE_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_FAVORITES_SUCCESS:
        case ADVERTS.FETCH_USER_ADVERTS_SUCCESS:
            return {
                totalCount: action.totalCount,
                start: action.start,
                end: action.end,
            };
        // Delete api call statistics
        case SESSION.LOGOUT:
        case SESSION.DELETE_ACCOUNT_SUCCESS:
            return initialState.filters;
        // Default
        default:
            return state;
    }
}