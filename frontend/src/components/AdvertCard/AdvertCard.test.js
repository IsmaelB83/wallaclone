// Node modules
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
// Own modules
import AdvertCard from './AdvertCard';
import { ADVERT_CONSTANTS } from '../../models/Advert';

configure({ adapter: new Adapter() });

// Anuncio por defecto para las pruebas
const defaultProps = { 
    id: '1',
    name: "PS4Pro",
    description:  "Compro PS4 Pro con menos de 1 año de uso",
    price: 200.99,
    type: "buy",
    tags: [ "lifestyle" ],
    createdAt: new Date('12/15/2019').toString(),
    photo: 'dummy.png'
};

describe('ADVERT CARD TESTS', () => {

    describe('ADVERT BUY', () => {

        const render = props => shallow(<AdvertCard {...defaultProps} {...props} />);
        let wrapper;

        beforeEach(() => {
            wrapper = render();
        });
    
        it('should render', () => {
            expect(wrapper.exists()).toBe(true);
        });
    
        it('should render an article', () => {
            expect(wrapper.find('article').exists()).toBe(true);
        });
    
        it('check props of display link', () => {
            expect(wrapper.find('.AdvertCard__FooterActions').childAt(0).props().to === '/advert/display/1');
        });
    
        it('check type of advert', () => {
            expect(wrapper.find('.AdvertCard__Header img').prop("src")).toEqual('buy.png');
        });
    
        it('check photo of advert', () => {
            expect(wrapper.find('.AdvertCard__Media img').prop("src")).toEqual('dummy.png');
        });
    });

    describe('ADVERT SELL', () => {

        const render = props => shallow(<AdvertCard {...defaultProps} {...props} />);
        let wrapper;

        beforeEach(() => {
            defaultProps.type = ADVERT_CONSTANTS.TYPE.SELL;
            wrapper = render();
        });
    
        it('check type of advert', () => {
            expect(wrapper.find('.AdvertCard__Header img').prop("src")).toEqual('sell.png');
        });
    });
});