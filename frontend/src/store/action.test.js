// Node imports
import configureStore from 'redux-mock-store';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
// Own imports
import { AdvertServices } from '../services';
import * as actions from './actions';
import * as types from './types';
import { ADVERT_CONSTANTS } from '../models/Advert';

// Opcion 1
jest.mock('../services/AdvertServices');

// Opcion 2 (redux-mock-store). Configuro el store lo más parecido a como lo tenga en real (mismos middlewares)
const loggerMiddleware = createLogger();
const middlewares = [ thunkMiddleware ];
if (process.env === 'development') {
    middlewares.push(loggerMiddleware);
}
const mockStore = configureStore(middlewares);
const store = mockStore({});

describe('ACTION TESTS', () => {
 
    // Tests relacionados con el action creator FETCH_TAGS
    describe('FETCH_TAGS', () => {
        const dispatch = jest.fn();

        beforeEach(() => {
            dispatch.mockClear();
        });

        describe('when getTags resolves', () => {
            const tags = [1, 2, 3];
            AdvertServices.getTags.mockResolvedValueOnce(tags);
    
            it('should dispatch FETCH_TAGS_SUCCESS', async () => {
                await actions.fetchTags()(dispatch, undefined);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: types.FETCH_TAGS_REQUEST,
                });
                expect(AdvertServices.getTags).toHaveBeenCalled();
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: types.FETCH_TAGS_SUCCESS,
                    tags,
                });
            });
        });

        describe('when getTags rejectes', () => {
            const error = {message: 'error fetching advert'};
            AdvertServices.getTags.mockRejectedValueOnce(error);
    
            it('should dispatch FETCH_TAGS_FAILURE', async () => {
                await actions.fetchTags()(dispatch, undefined);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: types.FETCH_TAGS_REQUEST,
                });
                expect(AdvertServices.getTags).toHaveBeenCalled();
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: types.FETCH_TAGS_FAILURE,
                    error: error.message
                });
            });
        });

    });

    // Tests relacionados con el action creator FETCH_ADVERT
    describe('FETCH_ADVERT', () => {
        const id = '0123456789';
        const dispatch = jest.fn();

        beforeEach(() => {
            dispatch.mockClear();
        });
        
        describe('when getAdvert resolves', () => {
            const advert = {}
            AdvertServices.getAdvert.mockResolvedValueOnce(advert);

            it('should dispatch FETCH_ADVERT_SUCCESS', async () => {
                await actions.fetchAdvert(id)(dispatch, undefined);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: types.FETCH_ADVERT_REQUEST,
                });
                expect(AdvertServices.getAdvert).toHaveBeenCalled();
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: types.FETCH_ADVERT_SUCCESS,
                    advert,
                });
            });
        });

        describe('when getAdvert rejectes', () => {
            const error = {message: 'error fetching advert'};
            AdvertServices.getAdvert.mockRejectedValueOnce(error);

            it('should dispatch FETCH_ADVERT_FAILURE', async () => {
                await actions.fetchAdvert(id)(dispatch, undefined);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: types.FETCH_ADVERT_REQUEST,
                });
                expect(AdvertServices.getAdvert).toHaveBeenCalled();
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: types.FETCH_ADVERT_FAILURE,
                    error: error.message
                });
            });
        });

    });

    // Tests relacionados con el action creator FETCH_ADVERTS
    describe('FETCH_ADVERTS', () => {
        const dispatch = jest.fn();

        beforeEach(() => {
            dispatch.mockClear();
        });

        describe('when getAdverts resolves', () => {
            const adverts = [1, 2, 3];
            AdvertServices.getAdverts.mockResolvedValueOnce(adverts);
    
            it('should dispatch FETCH_ADVERTS_SUCCESS', async () => {
                await actions.fetchAdverts()(dispatch, undefined);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: types.FETCH_ADVERTS_REQUEST,
                });
                expect(AdvertServices.getAdverts).toHaveBeenCalled();
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: types.FETCH_ADVERTS_SUCCESS,
                    adverts,
                });
            });
        });

        describe('when getAdverts rejectes', () => {
            const error = {message: 'error fetching advert'};
            AdvertServices.getAdverts.mockRejectedValueOnce(error);
    
            it('should dispatch FETCH_ADVERTS_FAILURE', async () => {
                await actions.fetchAdverts()(dispatch, undefined);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: types.FETCH_ADVERTS_REQUEST,
                });
                expect(AdvertServices.getAdverts).toHaveBeenCalled();
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: types.FETCH_ADVERTS_FAILURE,
                    error: error.message
                });
            });
        });

    });
    
    // Tests relacionados con el action creator EDIT_ADVERT
    describe('EDIT_ADVERT', () => {
        const advert = {};
        const dispatch = jest.fn();

        beforeEach(() => {
            dispatch.mockClear();
        });
        
        describe('when editAdvert resolves', () => {
            AdvertServices.editAdvert.mockResolvedValueOnce(advert);

            it('should dispatch an EDIT_ADVERT_SUCCESS', async () => {
                await actions.editAdvert(advert)(dispatch, undefined);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: types.EDIT_ADVERT_REQUEST,
                });
                expect(AdvertServices.editAdvert).toHaveBeenCalled();
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: types.EDIT_ADVERT_SUCCESS,
                    advert,
                });
            });
        });

        describe('when editAdvert rejectes', () => {
            const error = {message: 'error editing advert'};
            AdvertServices.editAdvert.mockRejectedValueOnce(error);

            it('should dispatch an EDIT_ADVERT_FAILURE', async () => {
                await actions.editAdvert(advert)(dispatch, undefined);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: types.EDIT_ADVERT_REQUEST,
                });
                expect(AdvertServices.editAdvert).toHaveBeenCalled();
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: types.EDIT_ADVERT_FAILURE,
                    error: error.message
                });
            });
        });

    });

    // Tests relacionados con el action creator EDIT_ADVERT
    describe('CREATE_ADVERT', () => {
        const advert = {};
        const error = {message: 'error creating advert'};
        AdvertServices.postAdvert
            .mockResolvedValueOnce(advert)
            .mockRejectedValueOnce(error);

        beforeEach(() => {
            store.clearActions();
        });

        describe('when createAdvert resolves', () => {
            it('should dispatch CREATE_ADVERT_SUCCESS', async () => {
                const expectedActions = [
                    { type: types.CREATE_ADVERT_REQUEST},
                    { type: types.CREATE_ADVERT_SUCCESS, advert },
                ];
                await store.dispatch(actions.createAdvert(advert));
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('when createAdvert rejects', () => {
            it('should dispatch CREATE_ADVERT_FAILURE', async () => {
                const expectedActions = [
                    { type: types.CREATE_ADVERT_REQUEST},
                    { type: types.CREATE_ADVERT_FAILURE, error: error.message },
                ];
                await store.dispatch(actions.createAdvert(advert));
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    // Tests relacionados con el action creator EDIT_ADVERT
    describe('SEARCH_ADVERTS', () => {
        const adverts = {}
        const filters = {};
        const error = {message: 'error searching advert'};
        AdvertServices.searchAdverts
            .mockResolvedValueOnce(filters)
            .mockRejectedValueOnce(error);

        beforeEach(() => {
            store.clearActions();
        });

        describe('when searchAdverts resolves', () => {
            it('should dispatch FETCH_ADVERTS_SUCCESS', async () => {
                const expectedActions = [
                    { type: types.FETCH_ADVERTS_REQUEST},
                    { type: types.FETCH_ADVERTS_SUCCESS, adverts },
                ];
                await store.dispatch(actions.searchAdverts(filters));
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('when searchAdverts rejects', () => {
            it('should dispatch FETCH_ADVERTS_FAILURE', async () => {
                const expectedActions = [
                    { type: types.FETCH_ADVERTS_REQUEST},
                    { type: types.FETCH_ADVERTS_FAILURE, error: error.message },
                ];
                await store.dispatch(actions.searchAdverts(filters));
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
        
        
    // Tests relacionados con el action creator CLEAR_ADVERT
    describe('CLEAR_ADVERT', () => {
        
        it('should create a CLEAR_ADVERT', () => {
            // Respuesta esperada por el action creator
            const expectedAction = {
                type: types.CLEAR_ADVERT,
            };
            expect(actions.clearAdvert()).toEqual(expectedAction);
        });

    });

    // Tests relacionados con el action creator SET_FILTERS
    describe('SET_FILTERS', () => {
        
        it('should create a SET_FILTERS', () => {
            // Filtros pasadoa al action creator
            const filters = {
                name: 'cr',
                type: ADVERT_CONSTANTS.TYPE.BUY,
                tag: ADVERT_CONSTANTS.TAG.LIFESTYLE
            };
            // Respuesta esperada por el action creator
            const expectedAction = {
                type: types.SET_FILTERS,
                filters,
            };
            expect(actions.setFilters(filters)).toEqual(expectedAction);
        });

    });

    // Tests relacionados con el action creator EDIT_SESSION
    describe('EDIT_SESSION', () => {
        
        it('should create a EDIT_SESSION', () => {
            // Filtros pasadoa al action creator
            const session = {
                name: 'Ismael',
                surname: 'Bernal',
                email: 'ismaelbernal83@gmail.com',
                maxAdverts: 3
            };
            // Respuesta esperada por el action creator
            const expectedAction = {
                type: types.EDIT_SESSION,
                session,
            };
            expect(actions.editSession(session)).toEqual(expectedAction);
        });

    });

    // Tests relacionados con el action creator SET_SESSION
    describe('SET_SESSION', () => {
    
        it('should create a SET_SESSION', () => {
            // Filtros pasadoa al action creator
            const session = {
                name: 'Ismael',
                surname: 'Bernal',
                email: 'ismaelbernal83@gmail.com',
                maxAdverts: 3
            };
            // Respuesta esperada por el action creator
            const expectedAction = {
                type: types.SET_SESSION,
                session,
            };
            expect(actions.setSession(session)).toEqual(expectedAction);
        });

    });

    // Tests relacionados con el action creator LOGOUT
    describe('LOGOUT', () => {

        it('should create a LOGOUT', () => {
            // Respuesta esperada por el action creator
            const expectedAction = {
                type: types.LOGOUT,
            };
            expect(actions.logout()).toEqual(expectedAction);
        });

    });

    // Tests relacionados con el action creator SET_PAGE
    describe('SET_PAGE', () => {

        it('should create a SET_PAGE', () => {
            // Pagina
            const pageNumber = 1;
            // Respuesta esperada por el action creator
            const expectedAction = {
                type: types.SET_PAGE,
                pageNumber
            };
            expect(actions.setPage(pageNumber)).toEqual(expectedAction);
        });

    });
});