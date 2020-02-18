// Component
import App from './App';
// HOCs
import { withNamespaces } from 'react-i18next';
import { withSnackbar } from 'notistack';

export default withSnackbar(withNamespaces()(App));