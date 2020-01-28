// API
import AdvertServices from '../services/AdvertServices';
import UserServices from '../services/UserServices';
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
    CREATE_ADVERT_REQUEST,
    CREATE_ADVERT_FAILURE,
    CREATE_ADVERT_SUCCESS,
    CLEAR_ADVERT,
    // Navigation
    SET_FILTERS,
    SET_PAGE,
    // User
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_SESSION,
    EDIT_SESSION,
} from './types';


export const login = (email, password) => {   
    return async function(dispatch, getState) {
        dispatch(loginRequest());
        try {
            const user = await UserServices.login(email, password);
            dispatch(loginSuccess(user));
        } catch (error) {
            dispatch(loginFailure(error.message))
        }
    }
};

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

export const fetchAdvert = (id) => {   
    return async function(dispatch, getState) {
        dispatch(fetchAdvertRequest());
        try {
            const advert = await AdvertServices.getAdvert(id);
            dispatch(fetchAdvertSuccess(advert));
        } catch (error) {
            dispatch(fetchAdvertFailure(error.message))
        }
    }
};

export const fetchAdverts = () => {   
    return async function(dispatch, getState) {
        dispatch(fetchAdvertsRequest());
        try {
            const adverts = await AdvertServices.getAdverts();
            dispatch(fetchAdvertsSuccess(adverts));
        } catch (error) {
            dispatch(fetchAdvertsFailure(error.message))
        }
    }
};

export const searchAdverts = (filters) => {   
    return async function(dispatch, getState) {
        dispatch(fetchAdvertsRequest());
        try {
            const adverts = await AdvertServices.searchAdverts(filters);
            dispatch(fetchAdvertsSuccess(adverts));
        } catch (error) {
            dispatch(fetchAdvertsFailure(error.message));
        }
    }
};

export const editAdvert = (advert) => {   
    return async function(dispatch, getState) {
        dispatch(editAdvertRequest());
        try {
            const response = await AdvertServices.editAdvert(advert);
            dispatch(editAdvertSuccess(response));
        } catch (error) {
            dispatch(editAdvertFailure(error.message))
        }
    }
};

export const createAdvert = (advert) => {   
    return async function(dispatch, getState) {
        delete advert._id;
        dispatch(createAdvertRequest());
        try {
            const response = await AdvertServices.postAdvert(advert);
            dispatch(createAdvertSuccess(response));
        } catch (error) {
            dispatch(createAdvertFailure(error.message));
        }
    }
};

export const clearAdvert = () => ({
    type: CLEAR_ADVERT,
});

export const setFilters = filters => ({
    type: SET_FILTERS,
    filters,
});

export const setSession = session => ({
    type: SET_SESSION,
    session,
});

export const editSession = session => ({
    type: EDIT_SESSION,
    session,
});

export const logout = () => ({
    type: LOGOUT,
});

export const setPage = pageNumber => ({
    type: SET_PAGE,
    pageNumber
});

/**
 * Action creators utilizados por los action creatos asincronos de redux-thunk
 */
const loginRequest = () => ({
    type: LOGIN_REQUEST
});

const loginFailure = error => ({
    type: LOGIN_FAILURE,
    error,
});

const loginSuccess = session => ({
    type: LOGIN_SUCCESS,
    session,
});

 const fetchTagsRequest = () => ({
    type: FETCH_TAGS_REQUEST
});

const fetchTagsFailure = error => ({
    type: FETCH_TAGS_FAILURE,
    error,
});

const fetchTagsSuccess = tags => ({
    type: FETCH_TAGS_SUCCESS,
    tags,
});

const fetchAdvertRequest = () => ({
    type: FETCH_ADVERT_REQUEST
});

const fetchAdvertFailure = error => ({
    type: FETCH_ADVERT_FAILURE,
    error,
});

const fetchAdvertSuccess = advert => ({
    type: FETCH_ADVERT_SUCCESS,
    advert,
});

const fetchAdvertsRequest = () => ({
    type: FETCH_ADVERTS_REQUEST
});

const fetchAdvertsFailure = error => ({
    type: FETCH_ADVERTS_FAILURE,
    error,
});

const fetchAdvertsSuccess = adverts => ({
    type: FETCH_ADVERTS_SUCCESS,
    adverts,
});

const editAdvertRequest = () => ({
    type: EDIT_ADVERT_REQUEST
});

const editAdvertFailure = error => ({
    type: EDIT_ADVERT_FAILURE,
    error,
});

const editAdvertSuccess = advert => ({
    type: EDIT_ADVERT_SUCCESS,
    advert,
});

const createAdvertRequest = () => ({
    type: CREATE_ADVERT_REQUEST
});

const createAdvertFailure = error => ({
    type: CREATE_ADVERT_FAILURE,
    error,
});

export const createAdvertSuccess = advert => ({
    type: CREATE_ADVERT_SUCCESS,
    advert,
});