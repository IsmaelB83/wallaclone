// Node modules
import { withSnackbar } from 'notistack';
// Own modules
import Reset from './Reset';

// Retorno el componente envuelto en el withSnackBar (para los tags de info de la app)
export default withSnackbar(Reset);