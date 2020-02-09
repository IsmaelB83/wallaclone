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
        case FILTERS.SET_FILTERS:
            return {
                ...action.filters,
                name: action.filters.name.toLowerCase(),
                minPrice: parseFloat(action.filters.minPrice),
                maxPrice: parseFloat(action.filters.maxPrice)
            };
        case ADVERTS.FETCH_ADVERTS_SUCCESS:
            return {
                ...initialState.filters,
                totalCount: action.apiCount,
                lastCount: action.lastCount,
                start: action.start,
                end: action.end,
            };
        case ADVERTS.SEARCH_ADVERTS_SUCCESS:
            return {
                ...action.filters,
                totalCount: action.apiCount,
                lastCount: action.lastCount,
                start: action.start,
                end: action.end,
            };
        // Logout
        case SESSION.LOGOUT_SUCCESS:
        case SESSION.DELETE_ACCOUNT_SUCCESS:
            return initialState.filters;
        // Default
        default:
            return state;
    }
}