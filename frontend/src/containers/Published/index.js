// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own Components
import Published from './Published';
// Model
// Own modules
import { AdvertsActions, SessionActions } from '../../store/GlobalActions';

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
        fetchUserAdverts: (_id) => dispatch(AdvertsActions.fetchUserAdverts(_id)),
        deleteAdvert: (slug, jwt) => dispatch(AdvertsActions.deleteAdvert(slug, jwt)),
        bookAdvert: (slug, jwt) => dispatch(AdvertsActions.bookAdvert(slug, jwt)),
        sellAdvert: (slug, jwt) => dispatch(AdvertsActions.sellAdvert(slug, jwt)),
        setFavorite: (slug, jwt) => dispatch(SessionActions.setFavorite(slug, jwt))
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Published));