// Node modules
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
// Own modules
import AdvertDetail from './AdvertDetail';
import { adverts } from '../../assets/tests/data';
import Advert from '../../models/Advert';


configure({ adapter: new Adapter() });

const defaultProps = { 
    advert: new Advert(adverts[0]),
    isFetching: false,
    error: null,
    match: {
        params: {
            id: '1'
        }
    }
};
const render = props => shallow(<AdvertDetail {...defaultProps} {...props} />);      

describe('ADVERT DETAIL TESTS', () => {

    describe('Snapshot test', () => {
        it('should match snapshot', () => {
            const wrapper = render();
            expect(wrapper).toMatchSnapshot();
        });
    });
});
