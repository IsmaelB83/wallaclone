// Components
import CardList from './CardList/CardList'
import CardTile from './CardTile/CardTile'
// HOCs
import withAdvertActions from '../withAdvertActions';
import { withNamespaces } from 'react-i18next';

// Exporto los dos modelos
export const CardListActions = withAdvertActions(withNamespaces()(CardList));
export const CardTileActions = withAdvertActions(withNamespaces()(CardTile));
