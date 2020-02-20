// HOCs
import { withNamespaces } from 'react-i18next';
import { withSnackbar } from 'notistack';
// Components
import App from './App';


// Retorno el componente envuelto
export default withNamespaces()(withSnackbar(App));