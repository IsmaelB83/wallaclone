// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own components
import Favorites from './Favorites';
// Own modules
import { AdvertsActions, SessionActions, FiltersActions } from '../../store/GlobalActions';


/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        adverts: state.favorites,
        lastCall: state.lastCall,
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
        setFavorite: (slug, jwt) => dispatch(SessionActions.setFavorite(slug, jwt)),
        setCurrentPage: pageNumber => dispatch(FiltersActions.setCurrentPage(pageNumber)),
        fetchFavorites: (jwt) => dispatch(AdvertsActions.fetchFavorites(jwt)),
        fetchIterateAdverts: direction => dispatch(AdvertsActions.fetchIterateAdverts(direction)),
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Favorites));