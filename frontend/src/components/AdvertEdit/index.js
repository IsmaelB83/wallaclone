// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own components
import AdvertEdit from './AdvertEdit';
// Own modules
import { fetchAdvert, editAdvert, createAdvert, clearAdvert } from '../../store/actions';


/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        session: state.session,
        tags: state.tags,
        advert: state.advert,
        adverts: state.adverts,
        ui: state.ui
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        loadAdvert: (id) => dispatch(fetchAdvert(id)),
        clearAdvert: () => dispatch(clearAdvert()),
        editAdvert: (advert, jwt) => dispatch(editAdvert(advert, jwt)),
        createAdvert: (advert, jwt) => dispatch(createAdvert(advert, jwt))
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(AdvertEdit));

/*  Lo anterior es equivalente a esto. Porque uso exactamente el mismo nombre de función que en el dispatch.
    Y además uso exactamente los mismos parámetros:
    ----------------------------------------------------
    const mapDispatchToProps = {
        editAdvert,
        createAdvert
    }

    O incluso más reducido aun:
    ----------------------------------------------------
    import * as actions from '../../store/actions';
    const mapDispatchToProps = actions;
*/