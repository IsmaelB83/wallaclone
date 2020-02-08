// API
import AdvertServices from '../../services/AdvertServices';
// Actions
import * as ACTIONS from '../types/AdvertsTypes';

/**
 * Obtener tags disponibles para categorizar anuncios
 */
export const fetchTags = () => {   
    return async function(dispatch, getState) {
        dispatch(fetchTagsRequest());
        return AdvertServices.getTags()
        .then(tags => {
            dispatch(fetchTagsSuccess(tags));
            return tags;
        })
        .catch (error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(fetchTagsFailure(message));
            throw message;
        });
    }
};

const fetchTagsRequest = () => ({ type: ACTIONS.FETCH_TAGS_REQUEST });
const fetchTagsFailure = error => ({ type: ACTIONS.FETCH_TAGS_FAILURE, error });
const fetchTagsSuccess = tags => ({ type: ACTIONS.FETCH_TAGS_SUCCESS, tags });

/**
 * Obtener datos de un anuncio
 * @param {String} slug Slug identificativo del anuncio
 */
export const fetchAdvert = slug => {
    return async function(dispatch, getState) {
        dispatch(fetchAdvertRequest());
        return AdvertServices.getAdvert(slug)
        .then(advert => {
            const { favorites } = getState();
            if (favorites) {
                advert.favorite = false;
                const i = favorites.findIndex(favorite => favorite === advert._id);
                if (i>=0) advert.favorite = true;
            }
            dispatch(fetchAdvertSuccess(advert));
            return advert;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(fetchAdvertFailure(message));
            throw message;
        });
    }
};

const fetchAdvertRequest = () => ({ type: ACTIONS.FETCH_ADVERT_REQUEST });
const fetchAdvertFailure = error => ({ type: ACTIONS.FETCH_ADVERT_FAILURE, error });
const fetchAdvertSuccess = advert => ({ type: ACTIONS.FETCH_ADVERT_SUCCESS, advert });

/**
 * Obtener anuncios de la base de datros sin ningún tipo de filtro
 */
export const fetchAdverts = () => {   
    return async function(dispatch, getState) {
        dispatch(fetchAdvertsRequest());
        return AdvertServices.getAdverts()
        .then(adverts => {
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
            return adverts;
        })
        .catch (error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(fetchAdvertsFailure(message));
            throw message;
        });
    }
};

const fetchAdvertsRequest = () => ({ type: ACTIONS.FETCH_ADVERTS_REQUEST });
const fetchAdvertsFailure = error => ({ type: ACTIONS.FETCH_ADVERTS_FAILURE, error });
const fetchAdvertsSuccess = adverts => ({ type: ACTIONS.FETCH_ADVERTS_SUCCESS, adverts });

/**
 * Obtener anuncios de del usuario indicado
 */
export const fetchUserAdverts = () => {   
    return async function(dispatch, getState) {
        dispatch(fetchUserAdvertsRequest());
        return AdvertServices.getAdverts()
        .then(adverts => {
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
            dispatch(fetchUserAdvertsSuccess(adverts));
            return adverts;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(fetchUserAdvertsFailure(message));
            throw message;
        })
    }
};

const fetchUserAdvertsRequest = () => ({ type: ACTIONS.FETCH_USERADVERTS_REQUEST });
const fetchUserAdvertsFailure = error => ({ type: ACTIONS.FETCH_USERADVERTS_FAILURE, error });
const fetchUserAdvertsSuccess = adverts => ({ type: ACTIONS.FETCH_USERADVERTS_SUCCESS, adverts });

/**
 * Buscar anuncios mediante los filtros indicados
 * @param {Object} filters Filtros a aplicar en la búsqueda
 */
export const searchAdverts = filters => {
    return async function(dispatch, getState) {
        dispatch(fetchAdvertsRequest());
        return AdvertServices.searchAdverts(filters)
        .then(adverts => {
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
            return adverts;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(fetchAdvertsFailure(message));;
            throw message;
        });
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
        return AdvertServices.editAdvert(advert, jwt)
        .then(response => {
            dispatch(editAdvertSuccess(response));
            return response;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(editAdvertFailure(message));
            throw message;
        });
    }
};

const editAdvertRequest = () => ({ type: ACTIONS.EDIT_ADVERT_REQUEST });
const editAdvertFailure = error => ({ type: ACTIONS.EDIT_ADVERT_FAILURE, error });
const editAdvertSuccess = advert => ({ type: ACTIONS.EDIT_ADVERT_SUCCESS, advert });

/**
 * Reservar un producto
 * @param {String} slug Slug identificativo del producto
 * @param {String} jwt Token para autenticar en la API
 */
export const bookAdvert = (slug, jwt) => {   
    return async function(dispatch, getState) {
        dispatch(bookAdvertRequest());
        return AdvertServices.bookAdvert(slug, jwt)
        .then(response => {
            dispatch(bookAdvertSuccess(response));
            return response;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(bookAdvertFailure(message));
            throw message;
        });
    }
};

const bookAdvertRequest = () => ({ type: ACTIONS.BOOK_ADVERT_REQUEST });
const bookAdvertFailure = error => ({ type: ACTIONS.BOOK_ADVERT_FAILURE, error });
const bookAdvertSuccess = advert => ({ type: ACTIONS.BOOK_ADVERT_SUCCESS, advert });

/**
 * Marcar un producto como vendido
 * @param {String} slug Slug identificativo del producto
 * @param {String} jwt Token para autenticar en la API
 */
export const sellAdvert = (slug, jwt) => {   
    return async function(dispatch, getState) {
        dispatch(sellAdvertRequest());
        return AdvertServices.sellAdvert(slug, jwt)
        .then(response => {
            dispatch(sellAdvertSuccess(response));
            return response;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(sellAdvertFailure(message));
            throw message;
        });
    }
};

const sellAdvertRequest = () => ({ type: ACTIONS.SELL_ADVERT_REQUEST });
const sellAdvertFailure = error => ({ type: ACTIONS.SELL_ADVERT_FAILURE, error });
const sellAdvertSuccess = advert => ({ type: ACTIONS.SELL_ADVERT_SUCCESS, advert });

/**
 * Crear un anuncio nuevo
 * @param {Object} advert Objeto con los datos del anuncio a crear
 * @param {String} jwt Token para autenticar en la API
 */
export const createAdvert = (advert, jwt) => {   
    return async function(dispatch, getState) {
        dispatch(createAdvertRequest());
        delete advert._id;
        return AdvertServices.postAdvert(advert, jwt)
        .then(response => {
            dispatch(createAdvertSuccess(response));
            return response;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(createAdvertFailure(message));;
            throw message;
        });
    }
};

const createAdvertRequest = () => ({ type: ACTIONS.CREATE_ADVERT_REQUEST });
const createAdvertFailure = error => ({ type: ACTIONS.CREATE_ADVERT_FAILURE, error });
const createAdvertSuccess = advert => ({ type: ACTIONS.CREATE_ADVERT_SUCCESS, advert });

/**
 * Eliminar un anuncio de la base de datos
 * @param {String} slug Slug del anuncio que queremos eliminar
 * @param {String} jwt Token para autenticar en la API
 */
export const deleteAdvert = (slug, jwt) => {   
    return async function(dispatch, getState) {
        dispatch(deleteAdvertRequest());
        return AdvertServices.deleteAdvert(slug, jwt)
        .then(response => {
            dispatch(deleteAdvertSuccess(response));
            return response;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(deleteAdvertFailure(message));;
            throw message;
        });
    }
};

const deleteAdvertRequest = () => ({ type: ACTIONS.DELETE_ADVERT_REQUEST });
const deleteAdvertFailure = error => ({ type: ACTIONS.DELETE_ADVERT_FAILURE, error });
const deleteAdvertSuccess = advert => ({ type: ACTIONS.DELETE_ADVERT_SUCCESS, advert });