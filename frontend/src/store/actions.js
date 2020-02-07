// API
import AdvertServices from '../services/AdvertServices';
import AuthServices from '../services/AuthServices';
import UserServices from '../services/UserServices';
// Own modules
import LocalStorage from '../utils/Storage';
// Actions
import {
    // Tags
    FETCH_TAGS_REQUEST,
    FETCH_TAGS_FAILURE,
    FETCH_TAGS_SUCCESS,
    // Adverts
    FETCH_ADVERT_REQUEST,
    FETCH_ADVERT_FAILURE,
    FETCH_ADVERT_SUCCESS,
    FETCH_ADVERTS_REQUEST,
    FETCH_ADVERTS_FAILURE,
    FETCH_ADVERTS_SUCCESS,
    EDIT_ADVERT_REQUEST,
    EDIT_ADVERT_FAILURE,
    EDIT_ADVERT_SUCCESS,
    DELETE_ADVERT_REQUEST,
    DELETE_ADVERT_FAILURE,
    DELETE_ADVERT_SUCCESS,
    CREATE_ADVERT_REQUEST,
    CREATE_ADVERT_FAILURE,
    CREATE_ADVERT_SUCCESS,
    CLEAR_ADVERT,
    // Navigation
    SET_FILTERS,
    SET_PAGE,
    // User
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_WITH_TOKEN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
    EDIT_USER_REQUEST,
    EDIT_USER_FAILURE,
    EDIT_USER_SUCCESS,
    SET_FAVORITES,
    SET_FAVORITE_REQUEST,
    SET_FAVORITE_FAILURE,
    SET_FAVORITE_SUCCESS,
} from './types';


/**
 * Login con usuario y password
 * @param {String} email Email del usuario
 * @param {String} password Password del usuario
 */
export const login = (email, password) => {   
    return async function(dispatch, getState) {
        dispatch(loginRequest());
        try {
            // Authenticate trough user/password
            const { user, favorites } = await AuthServices.login(email, password);
            dispatch(loginSuccess(user));
            dispatch(setFavorites(favorites));
        } catch (error) {
            let message = error.message;
            if (error.response && error.response.data) {
                message = error.response.data.data
            }
            dispatch(loginFailure(message))
        }
    }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = session => ({ type: LOGIN_SUCCESS, session });
const loginFailure = error => ({ type: LOGIN_FAILURE, error });
const setFavorites = favorites => ({ type: SET_FAVORITES, favorites });

/**
 * Login con token
 * @param {String} jwt 
 */
export const loginWithToken = (jwt) => {   
    return async function(dispatch, getState) {
        dispatch(loginRequest());
        try {
            // Authenticate (validation when login from Local storage) trough JWT
            const { user, favorites } = await AuthServices.loginWithToken(jwt);
            dispatch(loginSuccess(user));
            dispatch(setFavorites(favorites));
        } catch (error) {
            // In case login from JWT in Local storage fails --> clean local storage
            LocalStorage.cleanLocalStorage();
            let message = error.message;
            if (error.response && error.response.data) {
                message = error.response.data.data
            }
            dispatch(loginWithTokenFailure(message))
        }
    }
};

const loginWithTokenFailure = error => ({ type: LOGIN_WITH_TOKEN_FAILURE, error });

/**
 * Logout
 * @param {String} jwt Token del usuario
 */
export const logout = (jwt) => {
    return async function(dispatch, getState) {
        dispatch(logoutRequest());
        try {
            await AuthServices.logout(jwt);
            LocalStorage.cleanLocalStorage();
            dispatch(logoutSuccess());
        } catch (error) {
            dispatch(logoutFailure(error.message))
        }
    }
};

const logoutRequest = () => ({ type: LOGOUT_REQUEST });
const logoutFailure = (error) => ({ type: LOGOUT_FAILURE, error });
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

/**
 * Obtener tags disponibles para categorizar anuncios
 */
export const fetchTags = () => {   
    return async function(dispatch, getState) {
        dispatch(fetchTagsRequest());
        try {
            const tags = await AdvertServices.getTags();
            dispatch(fetchTagsSuccess(tags));
        } catch (error) {
            dispatch(fetchTagsFailure(error.message))
        }
    }
};

const fetchTagsRequest = () => ({ type: FETCH_TAGS_REQUEST });
const fetchTagsFailure = error => ({ type: FETCH_TAGS_FAILURE, error });
const fetchTagsSuccess = tags => ({ type: FETCH_TAGS_SUCCESS, tags });

/**
 * Obtener datos de un anuncio
 * @param {String} slug Slug identificativo del anuncio
 */
export const fetchAdvert = (slug) => {
    return async function(dispatch, getState) {
        dispatch(fetchAdvertRequest());
        try {
            const advert = await AdvertServices.getAdvert(slug);
            // If there are favorites in state it means user is authenticated in the app. Identify favorites
            const { favorites } = getState();
            if (favorites) {
                advert.favorite = false;
                const i = favorites.findIndex(favorite => favorite === advert._id);
                if (i>=0) advert.favorite = true;
            }
            dispatch(fetchAdvertSuccess(advert));
        } catch (error) {
            dispatch(fetchAdvertFailure(error.message))
        }
    }
};

const fetchAdvertRequest = () => ({ type: FETCH_ADVERT_REQUEST });
const fetchAdvertFailure = error => ({ type: FETCH_ADVERT_FAILURE, error });
const fetchAdvertSuccess = advert => ({ type: FETCH_ADVERT_SUCCESS, advert });

/**
 * Obtener anuncios de la base de datros sin ningún tipo de filtro
 */
export const fetchAdverts = () => {   
    return async function(dispatch, getState) {
        dispatch(fetchAdvertsRequest());
        try {
            const adverts = await AdvertServices.getAdverts();
            // If there are favorites in state it means user is authenticated in the app. Identify favorites
            const { favorites } = getState();
            if (favorites) {
                for (let i = 0; i < adverts.length; i++) {
                    adverts[i].favorite = false;   
                    const j = favorites.findIndex(favorite => favorite === adverts[i]._id);
                    if (j >= 0) {
                        adverts[i].favorite = true;
                    }
                }
            }
            dispatch(fetchAdvertsSuccess(adverts));
        } catch (error) {
            dispatch(fetchAdvertsFailure(error.message))
        }
    }
};

const fetchAdvertsRequest = () => ({ type: FETCH_ADVERTS_REQUEST });
const fetchAdvertsFailure = error => ({ type: FETCH_ADVERTS_FAILURE, error });
const fetchAdvertsSuccess = adverts => ({ type: FETCH_ADVERTS_SUCCESS, adverts });

/**
 * Buscar anuncios mediante los filtros indicados
 * @param {Object} filters Filtros a aplicar en la búsqueda
 */
export const searchAdverts = (filters) => {
    return async function(dispatch, getState) {
        dispatch(fetchAdvertsRequest());
        try {
            const adverts = await AdvertServices.searchAdverts(filters);
            // If there are favorites in state it means user is authenticated in the app. Identify favorites
            const { favorites } = getState();
            if (favorites) {
                for (let i = 0; i < adverts.length; i++) {
                    adverts[i].favorite = false;   
                    const j = favorites.findIndex(favorite => favorite === adverts[i]._id);
                    if (j >= 0) {
                        adverts[i].favorite = true;
                    }
                }
            }
            dispatch(fetchAdvertsSuccess(adverts));
        } catch (error) {
            dispatch(fetchAdvertsFailure(error.message));
        }
    }
};

/**
 * Editar datos de un anuncio
 * @param {Object} advert Datos actualizados del anuncio
 * @param {String} jwt Token para autenticar en la API
 */
export const editAdvert = (advert, jwt) => {   
    return async function(dispatch, getState) {
        dispatch(editAdvertRequest());
        try {
            const response = await AdvertServices.editAdvert(advert, jwt);
            dispatch(editAdvertSuccess(response));
        } catch (error) {
            dispatch(editAdvertFailure(error.message))
        }
    }
};

const editAdvertRequest = () => ({ type: EDIT_ADVERT_REQUEST });
const editAdvertFailure = error => ({ type: EDIT_ADVERT_FAILURE, error });
const editAdvertSuccess = advert => ({ type: EDIT_ADVERT_SUCCESS, advert });

/**
 * Reservar un producto
 * @param {String} slug Slug identificativo del producto
 * @param {String} jwt Token para autenticar en la API
 */
export const bookAdvert = (slug, jwt) => {   
    return async function(dispatch, getState) {
        dispatch(editAdvertRequest());
        try {
            const response = await AdvertServices.bookAdvert(slug, jwt);
            dispatch(editAdvertSuccess(response));
        } catch (error) {
            dispatch(editAdvertFailure(error.message))
        }
    }
};

/**
 * Marcar un producto como vendido
 * @param {String} slug Slug identificativo del producto
 * @param {String} jwt Token para autenticar en la API
 */
export const sellAdvert = (slug, jwt) => {   
    return async function(dispatch, getState) {
        dispatch(editAdvertRequest());
        try {
            const response = await AdvertServices.sellAdvert(slug, jwt);
            dispatch(editAdvertSuccess(response));
        } catch (error) {
            dispatch(editAdvertFailure(error.message))
        }
    }
};

/**
 * Guardar el anuncio en los favoritos del usuario
 * @param {String} slug Slug del anuncio que queremos guardar como favorito
 * @param {String} jwt Token para autenticar en la API
 */
export const setFavorite = (slug, jwt) => {
    return async function(dispatch, getState) {
        dispatch(setFavoriteRequest());
        try {
            const { _id, favorite } = await UserServices.setFavorite(slug, jwt);
            dispatch(setFavoriteSuccess(_id, favorite));
        } catch (error) {
            dispatch(setFavoriteFailure(error.message))
        }
    }
}

const setFavoriteRequest = () => ({ type: SET_FAVORITE_REQUEST });
const setFavoriteFailure = error => ({ type: SET_FAVORITE_FAILURE, error });
const setFavoriteSuccess = (_id, favorite) => ({ type: SET_FAVORITE_SUCCESS, _id, favorite });

/**
 * Crear un anuncio nuevo
 * @param {Object} advert Objeto con los datos del anuncio a crear
 * @param {String} jwt Token para autenticar en la API
 */
export const createAdvert = (advert, jwt) => {   
    return async function(dispatch, getState) {
        dispatch(createAdvertRequest());
        try {
            delete advert._id;
            const response = await AdvertServices.postAdvert(advert, jwt);
            dispatch(createAdvertSuccess(response));
        } catch (error) {
            dispatch(createAdvertFailure(error.message));
        }
    }
};

const createAdvertRequest = () => ({ type: CREATE_ADVERT_REQUEST });
const createAdvertFailure = error => ({ type: CREATE_ADVERT_FAILURE, error });
const createAdvertSuccess = advert => ({ type: CREATE_ADVERT_SUCCESS, advert });

/**
 * Eliminar un anuncio de la base de datos
 * @param {String} slug Slug del anuncio que queremos eliminar
 * @param {String} jwt Token para autenticar en la API
 */
export const deleteAdvert = (slug, jwt) => {   
    return async function(dispatch, getState) {
        dispatch(deleteAdvertRequest());
        try {
            const response = await AdvertServices.deleteAdvert(slug, jwt);
            dispatch(deleteAdvertSuccess(response));
        } catch (error) {
            dispatch(deleteAdvertFailure(error.message))
        }
    }
};

const deleteAdvertRequest = () => ({ type: DELETE_ADVERT_REQUEST });
const deleteAdvertFailure = error => ({ type: DELETE_ADVERT_FAILURE, error });
const deleteAdvertSuccess = advert => ({ type: DELETE_ADVERT_SUCCESS, advert });

/**
 * Editar datos de usuario
 * @param {Object} user Objeto con los nuevos datos del usuario
 * @param {String} jwt Token para autenticar en la API
 */
export const editUser = (user, jwt) => {   
    return async function(dispatch, getState) {
        dispatch(editUserRequest());
        try {
            const response = await UserServices.edit(user, jwt);
            dispatch(editUserSuccess(response));
        } catch (error) {
            dispatch(editUserFailure(error.message))
        }
    }
};

const editUserRequest = () => ({ type: EDIT_USER_REQUEST });
const editUserFailure = error => ({ type: EDIT_USER_FAILURE, error });
const editUserSuccess = user => ({ type: EDIT_USER_SUCCESS, user });

/**
 * Other minor action creators
 */
export const clearAdvert = () => ({ type: CLEAR_ADVERT, });
export const setFilters = filters => ({ type: SET_FILTERS, filters });
export const setPage = pageNumber => ({ type: SET_PAGE, pageNumber });