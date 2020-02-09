// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own Components
import Home from './Home';
// Own modules
import { AdvertsActions, SessionActions, FiltersActions } from '../../store/GlobalActions';
import { getVisibleAdverts } from '../../store/selectors/AdvertsSelectors';


/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        adverts: getVisibleAdverts(state.adverts, state.filters),
        session: state.session,
        tags: state.tags,
        ui: state.ui,
        filters: state.filters,
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTags: () => dispatch(AdvertsActions.fetchTags()),
        fetchAdverts: () => dispatch(AdvertsActions.fetchAdverts()),
        setFilters: filters => dispatch(FiltersActions.setFilters(filters)),
        setFavorite: (slug, jwt) => dispatch(SessionActions.setFavorite(slug, jwt)),
        searchAdverts: filters => dispatch(AdvertsActions.searchAdverts(filters)),
        setCurrentPage: pageNumber => dispatch(FiltersActions.setPage(pageNumber)),
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Home));