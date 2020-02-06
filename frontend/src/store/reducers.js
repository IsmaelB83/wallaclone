// Node imports
// Own imports
import * as TYPES from './types';
// Models
import Advert, { ADVERT_CONSTANTS } from '../models/Advert';

/**
 * Estado inicial
 */
export const initialState = {
    // User session
    session: {},
    // Para el modo visualizar/editar almaceno el anuncio seleccionado en cache (lo obtengo
    // desde la API en vez de extraerlo del store. Así me aseguro que el usuario ve la
    // versión más actualizada del anuncio cuando lo selecciona)
    advert: Advert.emptyAdvert(),
    // Adverts in the app
    adverts: [],
    // Available tags in the backend
    tags: [],
    // User favorites
    favorites: [],
    // Filters applied (text, tag, type, amounts)
    filters: {
        name: '',
        type: ADVERT_CONSTANTS.TYPE.ALL,
        tag: ADVERT_CONSTANTS.TAG.ALL,
        minPrice: 0,
        maxPrice: 0
    },
    // UI State
    ui: {
        apiConnected: false,
        error: null,
        isDeleting: false,
        isFetching: false,
        isUpdating: false,
        lastAdvertsUpdated: null,
        totalAdvertsReturned: 0,
        currentPage: 0,
    }
}

/**
 * Reducer para gestionar los tags disponibles en el backend
 * @param {Array} state Tags
 * @param {Object} action Action
 */
export function tags(state = initialState.tags, action) {
    switch (action.type) {
        case TYPES.FETCH_TAGS_SUCCESS:
            return action.tags;
        default:
            return state;
    }
}

/**
 * Reducer para gestionar las acciones sobre el anuncio que se visita para edicion o visualización (que se mantiene en cache de redux)
 * @param {Array} state Anuncio
 * @param {Object} action Action
 */
export function advert(state = initialState.advert, action) {
    switch (action.type) {
        case TYPES.FETCH_ADVERT_REQUEST:
            return initialState.advert;
        case TYPES.FETCH_ADVERT_FAILURE:
            return initialState.advert;
        case TYPES.FETCH_ADVERT_SUCCESS:
            return action.advert;
        case TYPES.EDIT_ADVERT_SUCCESS:
            return action.advert;
        case TYPES.EDIT_ADVERT_FAILURE:
            return initialState.advert
        case TYPES.SET_FAVORITE_SUCCESS:
            if (action._id === state._id) {
                return { ...state, favorite: action.favorite };
            }
            return state;
        case TYPES.CREATE_ADVERT_SUCCESS:
            return initialState.advert;
        case TYPES.CREATE_ADVERT_FAILURE:
            return initialState.advert;
        case TYPES.DELETE_ADVERT_SUCCESS:
            return initialState.advert;
        case TYPES.DELETE_ADVERT_FAILURE:
            return initialState.advert;
        case TYPES.CLEAR_ADVERT:
            return initialState.advert;
        case TYPES.LOGOUT_SUCCESS:
            return initialState.advert;
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
        case TYPES.FETCH_ADVERTS_REQUEST:
            return initialState.adverts;
        case TYPES.FETCH_ADVERTS_FAILURE:
            return initialState.adverts;
        case TYPES.FETCH_ADVERTS_SUCCESS:
            return [...action.adverts];
        case TYPES.EDIT_ADVERT_SUCCESS:
            return state.map(advert => {
                if (advert._id === action.advert._id) {
                    return { ...action.advert }
                }
                return advert;
            });
        case TYPES.SET_FAVORITE_SUCCESS:
            return state.map(advert => {
                if (advert._id === action._id) {
                    return {
                        ...advert,
                        favorite: action.favorite
                    }
                }
                return {...advert};
            });
        case TYPES.DELETE_ADVERT_SUCCESS:
            const i = state.findIndex(advert => advert._id === action.advert._id);
            return [
                ...state.slice(0, i),
                ...state.slice(i + 1)
            ];
        case TYPES.CREATE_ADVERT_SUCCESS:
            return [...state, action.advert];
        case TYPES.LOGOUT_SUCCESS:
            return initialState.adverts;
        default:
            return state;
    }
}

/**
 * Reducer para gestionar las acciones sobre los filtros de la app
 * @param {Array} state Anuncios
 * @param {Object} action Action
 */
export function filters (state = initialState.filters, action) {
    switch (action.type) {
        case TYPES.SET_FILTERS:
            return {
                ...action.filters,
                name: action.filters.name.toLowerCase(),
                minPrice: parseFloat(action.filters.minPrice),
                maxPrice: parseFloat(action.filters.maxPrice)
            };
        case TYPES.LOGOUT_SUCCESS:
            return initialState.filters;
        default:
            return state;
    }
}

/**
 * Reducer para gestionar las acciones sobre la sesion de usuario
 * @param {Array} state Anuncios
 * @param {Object} action Action
 */
export function session (state = initialState.session, action) {
    switch (action.type) {
        case TYPES.LOGIN_FAILURE:
            return initialState.session;
        case TYPES.LOGIN_SUCCESS:
            return {...action.session}
        case TYPES.LOGOUT_SUCCESS:
            return initialState.session;
        default:
            return state;
    }
}

/**
 * Reducer para gestionar las acciones sobre los favoritos del usuario
 * @param {Array} state Anuncios
 * @param {Object} action Action
 */
export function favorites (state = initialState.favorites, action) {
    switch (action.type) {
        case TYPES.SET_FAVORITES:
            return [...action.favorites];
        case TYPES.SET_FAVORITE_SUCCESS:
            // If action.favorite === true tries to insert favorite
            const i = state.findIndex(fav => fav === action._id);
            if (action.favorite && i < 0) {
                return [...state, action._id];
            } else if (!action.favorite && i >= 0) {
                return [...state.slice(0, i), ...state.slice(i + 1)];
            }
            return state;
        case TYPES.LOGOUT_SUCCESS:
            return initialState.favorites;
        default:
            return state;
    }
}

/**
 * Reducer para gestionar el estado de la ui
 * @param {Object} state UI state
 * @param {Object} action Action
 */
export function ui(state = initialState.ui, action) {
    switch (action.type) {
        case TYPES.SET_FILTERS:
            return { ...state, currentPage: 0 }
        case TYPES.FETCH_ADVERT_REQUEST:
            return { ...state, isFetching: true, error: null }
        case TYPES.FETCH_ADVERT_FAILURE:
            return { ...state, isFetching: false, error: action.error }
        case TYPES.FETCH_ADVERT_SUCCESS:
            return { ...state, isFetching: false, error: null }
        case TYPES.FETCH_ADVERTS_REQUEST:
            return { ...state, isFetching: true, error: null }
        case TYPES.FETCH_ADVERTS_FAILURE:
            return { ...state, isFetching: false, error: action.error }
        case TYPES.FETCH_ADVERTS_SUCCESS:
            return { ...state, 
                     isFetching: false, 
                     error: null, 
                     lastAdvertsUpdated: Date.now(), 
                     totalAdvertsReturned: action.adverts.length,
                     currentPage: 0
                    }
        case TYPES.EDIT_ADVERT_REQUEST:
            return { ...state, isUpdating: true, error: null }
        case TYPES.EDIT_ADVERT_FAILURE:
            return { ...state, isUpdating: false, error: action.error }
        case TYPES.EDIT_ADVERT_SUCCESS:
            return { ...state, isUpdating: false, error: null }
        case TYPES.DELETE_ADVERT_REQUEST:
            return { ...state, isDeleting: true, error: null }
        case TYPES.DELETE_ADVERT_FAILURE:
            return { ...state, isDeleting: false, error: action.error }
        case TYPES.DELETE_ADVERT_SUCCESS:
            return { ...state, isDeleting: false, error: null }
        case TYPES.CREATE_ADVERT_REQUEST:
            return { ...state, isUpdating: true, error: null }
        case TYPES.CREATE_ADVERT_FAILURE:
            return { ...state, isUpdating: false, error: action.error }
        case TYPES.CREATE_ADVERT_SUCCESS:
            return { ...state, isUpdating: false, error: null }
        case TYPES.FETCH_TAGS_REQUEST:
            return { ...state, error: null, isFetching: true, apiConnected: false }
        case TYPES.FETCH_TAGS_FAILURE:
            return { ...state, error: action.error, isFetching: false, apiConnected: action.error==='Request failed with status code 401'?true:false }
        case TYPES.FETCH_TAGS_SUCCESS:
            return { ...state, error: null, isFetching: false, apiConnected: true }
        case TYPES.LOGIN_REQUEST:
            return { ...state, error: null, isFetching: true }
        case TYPES.LOGIN_FAILURE:
            return { ...state, error: action.error, isFetching: false }
        case TYPES.LOGIN_WITH_TOKEN_FAILURE:
            return { ...state, error: null, isFetching: false }
        case TYPES.LOGIN_SUCCESS:
            return { ...state, error: null, isFetching: false }
        case TYPES.SET_PAGE:
            return { ...state, currentPage: action.pageNumber }
        case TYPES.LOGOUT_REQUEST:
            return { ...state, error: null, isFetching: true }
        case TYPES.LOGOUT_FAILURE:
            return { ...state, error: action.error, isFetching: false }
        case TYPES.LOGOUT_SUCCESS:
            return { ...state, error: null, isFetching: false }
        case TYPES.EDIT_USER_REQUEST:
            return { ...state, error: null, isUpdatng: true }
        case TYPES.EDIT_USER_FAILURE:
            return { ...state, error: action.error, isUpdatng: false }
        case TYPES.EDIT_USER_SUCCESS:
            return { ...state, error: null, isUpdatng: false }
        default:
            return state;
    }
}
