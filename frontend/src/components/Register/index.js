// NPM modules
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
// Own components
import Register from './Register';
// Own modules
import { login } from '../../store/actions';

 
/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
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
        login: (email, password) => dispatch(login(email, password))
    }
}

// Retorno el componente envuelto en el "connect", y en un withSnackBar (para los tags de info de la app)
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Register));