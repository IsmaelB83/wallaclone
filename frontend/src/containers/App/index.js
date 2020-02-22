// Components
import App from './App';
// HOCs
import { withNamespaces } from 'react-i18next';
import { withSnackbar } from 'notistack';
import withWebSocketChat from '../../components/withWebSocketChat';


// Retorno el componente envuelto
export default withNamespaces()(withSnackbar(withWebSocketChat(App)));