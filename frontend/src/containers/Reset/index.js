// Node modules
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
// Own components
import withForm from '../../components/Form/withForm';
import Reset from './Reset';
// Own modules
import { SessionActions } from '../../store/GlobalActions';

/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        isAuthenticating: state.ui.isAuthenticating,
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        resetAccount: (token, password) => dispatch(SessionActions.resetAccount(token, password)),
    }
}

// Retorno el componente envuelto en el "connect", y en un withSnackBar (para los tags de info de la app)
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withForm(Reset)));