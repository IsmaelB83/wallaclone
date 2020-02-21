// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own Components
import Home from './Home';
// Own modules
import { AdvertsActions, SessionActions, FiltersActions, ChatActions } from '../../store/GlobalActions';
import { getVisibleAdverts } from '../../store/selectors/AdvertsSelectors';


/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        adverts: getVisibleAdverts(state.adverts, state.filters),
        session: state.session,
        chats: state.chats,
        tags: state.tags,
        ui: state.ui,
        filters: state.filters,
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
        setFilters: filters => dispatch(FiltersActions.setFilters(filters)),
        setCurrentPage: pageNumber => dispatch(FiltersActions.setCurrentPage(pageNumber)),
        // Adverts
        fetchTags: () => dispatch(AdvertsActions.fetchTags()),
        fetchAdverts: () => dispatch(AdvertsActions.fetchAdverts()),
        fetchIterateAdverts: direction => dispatch(AdvertsActions.fetchIterateAdverts(direction)),
        searchAdverts: filters => dispatch(AdvertsActions.searchAdverts(filters)),
        // Chats
        createChat: (slug) => dispatch(ChatActions.createChat(slug)) 
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Home));