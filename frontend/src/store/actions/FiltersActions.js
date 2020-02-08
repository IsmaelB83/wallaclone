// Actions
import * as ACTIONS from '../types/FiltersTypes';

export const setFilters = filters => ({ type: ACTIONS.SET_FILTERS, filters });
export const setPage = pageNumber => ({ type: ACTIONS.SET_PAGE, pageNumber });