// Node imports
import * as types from './types';
import * as reducers from './reducers';
// Models
import Session from '../models/Session';

describe('REDUCERS TESTS', () => {

    describe('TAGS REDUCER', () => {
        
        it('should handle a FETCH_TAGS_SUCCESS', () => {   
            // Estado inicial
            const initialState = [];
            // Acción a ejecutar
            const action = {
                type: types.FETCH_TAGS_SUCCESS,
                tags: ['lifestyle', 'mobile', 'motor']
            };
            // Estado esperato tras ejecutar la acción
            const expectedState = ['lifestyle', 'mobile', 'motor'];
            // Lanzo el test
            expect(reducers.tags(initialState, action)).toEqual(expectedState);
        });

    });

    describe('SESSION REDUCER', () => {

        it('should handle a SET_SESSION action', () => {   
            // Estado inicial
            const initialState = {
                session: new Session()
            };
            // Acción a ejecutar
            const action = {
                type: types.SET_SESSION,
                session: new Session('ismaelbernal83@gmail.com', 'Ismael', 'Bernal', 3) 
            };
            // Estado esperato tras ejecutar la acción
            const expectedState = { 
                name: 'Ismael',
                email: 'ismaelbernal83@gmail.com',
                maxAdverts: 3
            };
            // Lanzo el test
            expect(reducers.session(initialState, action)).toEqual(expectedState);
        });
        
    });

    describe('ADVERTS REDUCER', () => {
        
        it('should handle a CREATE_ADVERT_SUCCESS', () => {   
            // Estado inicial
            const initialState = [{name: 'Anuncio antiguo'}];
            // Acción a ejecutar
            const action = {
                type: types.CREATE_ADVERT_SUCCESS,
                advert: { name: 'Anuncio nuevo' }
            };
            // Estado esperato tras ejecutar la acción
            const expectedState = [
                { name: 'Anuncio antiguo' },
                { name: 'Anuncio nuevo' }
            ]
            // Lanzo el test
            expect(reducers.adverts(initialState, action)).toEqual(expectedState);
        });

    });

});