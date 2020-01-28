// Node imports
// Own imports
import * as selectors from './selectors';
import { adverts } from '../assets/tests/data';

describe('SELECTOR TESTS', () => {
    
    it('filter by name in getVisibleAdverts', () => {   
        const filters = { name: 'PS4Pro' };
        expect(selectors.getVisibleAdverts(adverts, filters)).toHaveLength(1);
    });
    it('filter by type in getVisibleAdverts', () => {   
        const filters = { type: 'buy' };
        expect(selectors.getVisibleAdverts(adverts, filters)).toHaveLength(3);
    });
    it('filter by tag in getVisibleAdverts', () => {   
        const filters = { tag: 'work' };
        expect(selectors.getVisibleAdverts(adverts, filters)).toHaveLength(1);
    });   
    it('filter by combining filter/tag/name in getVisibleAdverts', () => {   
        const filters = { 
            name: 'Gaming',
            tag: 'lifestyle',
            type: 'sell'
        };  
        expect(selectors.getVisibleAdverts(adverts, filters)).toHaveLength(1);
    });   
    it('filter by combining filter/tag/name in getVisibleAdverts', () => {   
        const filters = { 
            name: 'Gaming',
            tag: 'lifestyle',
        };  
        expect(selectors.getVisibleAdverts(adverts, filters)).toHaveLength(2);
    });   
    it('filter by combining filter/tag/name in getVisibleAdverts', () => {   
        const filters = { 
            name: 'Gaming',
            tag: 'lifestyle',
            minPrice: 40
        };  
        expect(selectors.getVisibleAdverts(adverts, filters)).toHaveLength(1);
    });  
});