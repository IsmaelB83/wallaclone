// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own Components
import Published from './Published';
// Models
// Own modules
import { AdvertsActions, SessionActions } from '../../store/GlobalActions';

/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        published: state.published,
        session: state.session,
        isFetching: state.ui.isFetching,
        error: state.ui.error,
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
        sellAdvert: (slug, jwt) => dispatch(AdvertsActions.sellAdvert(slug, jwt)),
        fetchUserAdverts: (slug) => dispatch(AdvertsActions.fetchUserAdverts(slug)),
        setFavorite: (slug, jwt) => dispatch(SessionActions.setFavorite(slug, jwt)),
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Published));