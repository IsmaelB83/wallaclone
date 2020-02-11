// Actions
import * as ACTIONS from '../types/FiltersTypes';

export const setFilters = filters => {
    filters.name = filters.name.toLowerCase();
    filters.minPrice = parseFloat(filters.minPrice);
    filters.maxPrice = parseFloat(filters.maxPrice);
    return { type: ACTIONS.SET_FILTERS, filters };
};
export const setCurrentPage = pageNumber => ({ type: ACTIONS.SET_PAGE, pageNumber });