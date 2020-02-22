// Component
import AdvertDetail from './AdvertDetail'
// HOCs
import withAdvertActions from '../../hocs/withAdvertActions';
import { withNamespaces } from 'react-i18next';

export default withAdvertActions(withNamespaces()(AdvertDetail));
