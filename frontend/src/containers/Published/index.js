// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own Components
import Published from './Published';
// Model
// Own modules
import { deleteAdvert, bookAdvert, sellAdvert, setFavorite } from '../../store/actions';

/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        session: state.session,
        ui: state.ui,
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        deleteAdvert: (slug, jwt) => dispatch(deleteAdvert(slug, jwt)),
        bookAdvert: (slug, jwt) => dispatch(bookAdvert(slug, jwt)),
        sellAdvert: (slug, jwt) => dispatch(sellAdvert(slug, jwt)),
        setFavorite: (slug, jwt) => dispatch(setFavorite(slug, jwt))
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Published));