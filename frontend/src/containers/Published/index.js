// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { withNamespaces } from 'react-i18next';
// Own Components
import Published from './Published';
// Models
// Own modules
import { AdvertsActions, SessionActions, FiltersActions } from '../../store/GlobalActions';

/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        adverts: state.adverts,
        session: state.session,
        ui: state.ui,
        lastCall: state.lastCall
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        // Session
        logout: () => dispatch(SessionActions.logout()),
        setFavorite: (slug) => dispatch(SessionActions.setFavorite(slug)),
        // Filters
        setCurrentPage: pageNumber => dispatch(FiltersActions.setCurrentPage(pageNumber)),
        // Adverts
        deleteAdvert: (slug) => dispatch(AdvertsActions.deleteAdvert(slug)),
        bookAdvert: (slug) => dispatch(AdvertsActions.bookAdvert(slug)),
        sellAdvert: (slug) => dispatch(AdvertsActions.sellAdvert(slug)),
        fetchUserAdverts: (slug) => dispatch(AdvertsActions.fetchUserAdverts(slug)),
        fetchIterateAdverts: direction => dispatch(AdvertsActions.fetchIterateAdverts(direction)),
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withNamespaces()(Published)));