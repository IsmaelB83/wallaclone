// Imports
import * as FILTERS from '../types/FiltersTypes';
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
        // Logout
        case SESSION.LOGOUT_SUCCESS:
        case SESSION.DELETE_ACCOUNT_SUCCESS:
            return initialState.filters;
        // Default
        default:
            return state;
    }
}