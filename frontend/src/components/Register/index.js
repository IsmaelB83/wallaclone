// Node modules
import { withSnackbar } from 'notistack';
// Own modules
import Register from './Register';

// Retorno el componente envuelto en el withSnackBar (para los tags de info de la app)
export default withSnackbar(Register);