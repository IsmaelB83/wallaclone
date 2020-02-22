// Components
import CardList from './CardList'
// HOCs
import withAdvertActions from '../../hocs/withAdvertActions';
import { withNamespaces } from 'react-i18next';

// Exporto los dos modelos
export default withAdvertActions(withNamespaces()(CardList));
