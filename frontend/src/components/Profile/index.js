import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own modules
import Profile from './Profile';
import { editSession, logout } from '../../store/actions';

/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        tags: state.tags,
        session: state.session,
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        editSession: (session) => dispatch(editSession(session)),
        logout: () => dispatch(logout()),
    }
}

// Retorno el componente envuelto en el "connect", y en un withSnackBar (para los tags de info de la app)
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Profile));