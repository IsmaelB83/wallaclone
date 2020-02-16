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
        case SESSION.LOGOUT_SUCCESS:
        case SESSION.LOGOUT_FAILURE:
            return initialState.tags
        default:
            return state;
    }
}