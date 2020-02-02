// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own Components
import Catalog from './Catalog';
// Model
import { ADVERT_CONSTANTS } from '../../models/Advert'
// Own modules
import { fetchAdverts } from '../../store/actions';
import { getOwnAdverts } from '../../store/selectors';


/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        advertsSelling: getOwnAdverts(state.adverts, state.session,  ADVERT_CONSTANTS.TYPE.SELL ),
        advertsBuying: getOwnAdverts(state.adverts, state.session, ADVERT_CONSTANTS.TYPE.BUY ),
        ui: state.ui,
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        loadAdverts: () => dispatch(fetchAdverts())
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Catalog));