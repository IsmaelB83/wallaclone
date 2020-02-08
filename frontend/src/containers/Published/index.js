// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own Components
import Published from './Published';
// Models
import { ADVERT_CONSTANTS } from '../../models/Advert';
// Own modules
import { AdvertsActions } from '../../store/GlobalActions';
import { AdvertsSelectors } from '../../store/GlobalSelectors';

/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        session: state.session,
        selling: AdvertsSelectors.getAdvertsByType(state.published, ADVERT_CONSTANTS.TYPE.SELL),
        buying: AdvertsSelectors.getAdvertsByType(state.published, ADVERT_CONSTANTS.TYPE.BUY),
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        deleteAdvert: (slug, jwt) => dispatch(AdvertsActions.deleteAdvert(slug, jwt)),
        bookAdvert: (slug, jwt) => dispatch(AdvertsActions.bookAdvert(slug, jwt)),
        sellAdvert: (slug, jwt) => dispatch(AdvertsActions.sellAdvert(slug, jwt))
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Published));