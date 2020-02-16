// Component
import AdvertCardSmall from './AdvertCardSmall'
// HOCs
import withAdvertActions from '../withAdvertActions';
import { withNamespaces } from 'react-i18next';

export default withAdvertActions(withNamespaces()(AdvertCardSmall));