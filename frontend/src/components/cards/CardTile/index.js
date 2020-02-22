// Components
import CardTile from './CardTile'
// HOCs
import withAdvertActions from '../../hocs/withAdvertActions';
import { withNamespaces } from 'react-i18next';

// Exporto los dos modelos
export default withAdvertActions(withNamespaces()(CardTile));
