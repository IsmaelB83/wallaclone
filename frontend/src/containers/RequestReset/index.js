// Node modules
import { withSnackbar } from 'notistack';
// Own modules
import RequestReset from './RequestReset';

// Retorno el componente envuelto en el withSnackBar (para los tags de info de la app)
export default withSnackbar(RequestReset);