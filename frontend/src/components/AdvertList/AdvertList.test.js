// Node modules
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
// Own modules
import AdvertList from './AdvertList';
import { adverts } from '../../assets/tests/data';

configure({ adapter: new Adapter() });

const defaultProps = { adverts };
const render = props => shallow(<AdvertList {...defaultProps} {...props} />);
let wrapper;

describe('ADVERT LILST TESTS (using enzyme with a NON-redux component)', () => {

    beforeEach(() => {
        wrapper = render();
    });

    it('should render', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should render an AdvertList', () => {
        expect(wrapper.find('.AdvertList').exists()).toBe(true);
    });

    it('should render 4 AdvertCards', () => {
        expect(wrapper.find('AdvertCard')).toHaveLength(4);
    });

    it('check props of the 4th AdvertCard', () => {
        expect(wrapper.find('.AdvertList').childAt(3).props()._id === '4');
    });
});