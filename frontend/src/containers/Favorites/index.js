// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own components
import Favorites from './Favorites';
// Own modules
import { AdvertsActions, SessionActions, FiltersActions, ChatActions } from '../../store/GlobalActions';


/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        adverts: state.adverts,
        lastCall: state.lastCall,
        session: state.session,
        chats: state.chats,
        ui: state.ui,
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
        fetchFavorites: () => dispatch(AdvertsActions.fetchFavorites()),
        // Chats
        createChat: (slug) => dispatch(ChatActions.createChat(slug))        
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Favorites));