// NPM modules
import { withSnackbar } from 'notistack';
// Own components
import App from './App';
// Own modules

// Retorno el componente envuelto en el "connect", y en un withSnackBar (para los tags de info de la app)
export default withSnackbar(App);