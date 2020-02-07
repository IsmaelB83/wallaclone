// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own Components
import Home from './Home';
// Own modules
import { 
    fetchTags,
    fetchAdverts,
    searchAdverts,
    setFavorite,
    setPage
 } from '../../store/actions';
import { getVisibleAdverts } from '../../store/selectors';


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
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTags: () => dispatch(fetchTags()),
        loadAdverts: () => dispatch(fetchAdverts()),
        setFavorite: (slug, jwt) => dispatch(setFavorite(slug, jwt)),
        searchAdverts: (filters) => dispatch(searchAdverts(filters)),
        setCurrentPage: pageNumber => dispatch(setPage(pageNumber)),
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Home));