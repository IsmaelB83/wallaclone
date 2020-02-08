// API
import AuthServices from '../../services/AuthServices';
import UserServices from '../../services/UserServices';
import AdvertServices from '../../services/AdvertServices';
// Own modules
import LocalStorage from '../../utils/Storage';
// Actions
import * as ACTIONS from '../types/SessionTypes';


/**
 * Login con usuario y password
 * @param {String} email Email del usuario
 * @param {String} password Password del usuario
 */
export const login = (email, password) => {   
    return async function(dispatch, getState) {
        dispatch(loginRequest());
        return AuthServices.login(email, password)
        .then(response => {
            dispatch(loginSuccess(response));
            dispatch(fetchFavorites(response.jwt));
            dispatch(fetchPublished(response._id));
            const { session } = getState();
            LocalStorage.saveLocalStorage(session);
            return response;
        })
        .catch (error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(loginFailure(message));
            throw message;
        });
    }
};

const loginRequest = () => ({ type: ACTIONS.LOGIN_REQUEST });
const loginSuccess = session => ({ type: ACTIONS.LOGIN_SUCCESS, session });
const loginFailure = error => ({ type: ACTIONS.LOGIN_FAILURE, error });

/**
 * Login con token
 * @param {String} jwt 
 */
export const loginWithToken = jwt => {   
    return async function(dispatch, getState) {
        dispatch(loginWithTokenRequest());
        return AuthServices.loginWithToken(jwt)
        .then(response => {
            dispatch(loginWithTokenSuccess(response));
            dispatch(fetchFavorites(response.jwt));
            dispatch(fetchPublished(response._id));
            const { session } = getState();
            LocalStorage.saveLocalStorage(session);
            return response;    
        })
        .catch (error => {
            LocalStorage.cleanLocalStorage();
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(loginWithTokenFailure(message));
            throw message;
        });
    }
};

const loginWithTokenRequest = () => ({ type: ACTIONS.LOGIN_TOKEN_REQUEST });
const loginWithTokenSuccess = session => ({ type: ACTIONS.LOGIN_TOKEN_SUCCESS, session });
const loginWithTokenFailure = error => ({ type: ACTIONS.LOGIN_TOKEN_FAILURE, error });

/**
 * Logout
 * @param {String} jwt Token del usuario
 */
export const logout = jwt => {
    return async function(dispatch, getState) {
        dispatch(logoutRequest());
        return AuthServices.logout(jwt)
        .then(() => {
            LocalStorage.cleanLocalStorage();
            dispatch(logoutSuccess());
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(logoutFailure(message));
            throw message;
        });
    }
};

const logoutRequest = () => ({ type: ACTIONS.LOGOUT_REQUEST });
const logoutFailure = (error) => ({ type: ACTIONS.LOGOUT_FAILURE, error });
const logoutSuccess = () => ({ type: ACTIONS.LOGOUT_SUCCESS });

/**
 * Activate Account
 */
export const activateAccount = token => {
    return async function(dispatch, getState) {
        dispatch(activateAccountRequest());
        return AuthServices.activate(token)
        .then((result) => {
            LocalStorage.cleanLocalStorage();
            dispatch(activateAccountSuccess());
            return result;
        })
        .catch((error) => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(activateAccountFailure(message));;
            throw message;
        });
    }
};

const activateAccountRequest = () => ({ type: ACTIONS.ACTIVATE_ACCOUNT_REQUEST });
const activateAccountFailure = error => ({ type: ACTIONS.ACTIVATE_ACCOUNT_FAILURE, error });
const activateAccountSuccess = () => ({ type: ACTIONS.ACTIVATE_ACCOUNT_SUCCESS });

/**
 * Activate Account
 */
export const createAccount = (email, name, password) => {
    return async function(dispatch, getState) {
        dispatch(createAccountRequest());
        return UserServices.create(email, name, password)
        .then(user => {
            LocalStorage.cleanLocalStorage();
            dispatch(createAccountSuccess());
            return user;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(createAccountFailure(message));;
            throw message;
        });
    }
};

const createAccountRequest = () => ({ type: ACTIONS.CREATE_ACCOUNT_REQUEST });
const createAccountFailure = error => ({ type: ACTIONS.CREATE_ACCOUNT_FAILURE, error });
const createAccountSuccess = () => ({ type: ACTIONS.CREATE_ACCOUNT_SUCCESS });

/**
 * Request reseta password
 */
export const requestResetAccount = email => {
    return async function(dispatch, getState) {
        dispatch(requestResetAccountRequest());
        return AuthServices.resetRequest(email)
        .then(user => {
            dispatch(requestResetAccountSuccess());
            return user;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(requestResetAccountFailure(message));;
            throw message;
        });
    }
};

const requestResetAccountRequest = () => ({ type: ACTIONS.REQUEST_RESET_ACCOUNT_REQUEST });
const requestResetAccountFailure = error => ({ type: ACTIONS.REQUEST_RESET_ACCOUNT_FAILURE, error });
const requestResetAccountSuccess = () => ({ type: ACTIONS.REQUEST_RESET_ACCOUNT_SUCCESS });

/**
 * Reset password
 */
export const resetAccount = (token, password) => {
    return async function(dispatch, getState) {
        dispatch(resetAccountRequest());
        return AuthServices.reset(token, password)
        .then(user => {
            dispatch(resetAccountSuccess());
            return user;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(resetAccountFailure(message));;
            throw message;
        });
    }
};

const resetAccountRequest = () => ({ type: ACTIONS.RESET_ACCOUNT_REQUEST });
const resetAccountFailure = error => ({ type: ACTIONS.RESET_ACCOUNT_FAILURE, error });
const resetAccountSuccess = () => ({ type: ACTIONS.RESET_ACCOUNT_SUCCESS });

/**
 * Guardar el anuncio en los favoritos del usuario
 * @param {String} slug Slug del anuncio que queremos guardar como favorito
 * @param {String} jwt Token para autenticar en la API
 */
export const setFavorite = (slug, jwt) => {
    return async function(dispatch, getState) {
        dispatch(setFavoriteRequest());
        return UserServices.setFavorite(slug, jwt)
        .then(response => {
            response.advert.favorite = response.favorite;
            dispatch(setFavoriteSuccess(response.advert));
            return response.advert;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(setFavoriteFailure(message));
            throw message;
        });
    }
}

const setFavoriteRequest = () => ({ type: ACTIONS.SET_FAVORITE_REQUEST });
const setFavoriteFailure = error => ({ type: ACTIONS.SET_FAVORITE_FAILURE, error });
const setFavoriteSuccess = advert => ({ type: ACTIONS.SET_FAVORITE_SUCCESS, advert });

/**
 * Editar datos de usuario
 * @param {Object} user Objeto con los nuevos datos del usuario
 * @param {String} jwt Token para autenticar en la API
 */
export const editUser = (user, jwt) => {   
    return async function(dispatch, getState) {
        dispatch(editUserRequest());
        return UserServices.edit(user, jwt)
        .then (response => {
            dispatch(editUserSuccess(response))
            return response;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(editUserFailure(message));
            throw message;
        })
    }
};

const editUserRequest = () => ({ type: ACTIONS.EDIT_ACCOUNT_REQUEST });
const editUserFailure = error => ({ type: ACTIONS.EDIT_ACCOUNT_FAILURE, error });
const editUserSuccess = user => ({ type: ACTIONS.EDIT_ACCOUNT_SUCCESS, user });

/**
 * Elimina una cuenta de usuario
 * @param {String} id Id del usuario a eliminar
 * @param {String} jwt Token para autenticar en la API
 */
export const deleteAccount = (id, jwt) => {   
    return async function(dispatch, getState) {
        dispatch(deleteAccountRequest());
        return UserServices.delete(id, jwt)
        .then (response => {
            LocalStorage.cleanLocalStorage();
            dispatch(deleteAccountSuccess(response))
            return response;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(deleteAccountFailure(message));
            throw message;
        })
    }
};

const deleteAccountRequest = () => ({ type: ACTIONS.DELETE_ACCOUNT_REQUEST });
const deleteAccountFailure = error => ({ type: ACTIONS.DELETE_ACCOUNT_FAILURE, error });
const deleteAccountSuccess = response => ({ type: ACTIONS.DELETE_ACCOUNT_SUCCESS, response });

/**
 * Obtener favoritos del usuario
 * @param {String} jwt Token para autenticar en el API
 */
export const fetchFavorites = jwt => {
    return async function(dispatch, getState) {
        dispatch(fetchFavoritesRequest());
        return UserServices.getFavorites(jwt)
        .then(favorites => {
            dispatch(fetchFavoritesSuccess(favorites));
            return favorites;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(fetchFavoritesFailure(message));
            throw message;
        });
    }
};

const fetchFavoritesRequest = () => ({ type: ACTIONS.FETCH_FAVORITES_REQUEST });
const fetchFavoritesFailure = error => ({ type: ACTIONS.FETCH_FAVORITES_FAILURE, error });
const fetchFavoritesSuccess = favorites => ({ type: ACTIONS.FETCH_FAVORITES_SUCCESS, favorites });

/**
 * Obtener anuncios publicados por mi usuario
 */
export const fetchPublished = (_id) => {   
    return async function(dispatch, getState) {
        dispatch(fetchPublishedRequest());
        return AdvertServices.getAdvertsByUser(_id)
        .then(published => {
            dispatch(fetchPublishedSuccess(published));
            return published;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(fetchPublishedFailure(message));
            throw message;
        })
    }
};

const fetchPublishedRequest = () => ({ type: ACTIONS.FETCH_PUBLISHED_REQUEST });
const fetchPublishedFailure = error => ({ type: ACTIONS.FETCH_PUBLISHED_FAILURE, error });
const fetchPublishedSuccess = published => ({ type: ACTIONS.FETCH_PUBLISHED_SUCCESS, published });