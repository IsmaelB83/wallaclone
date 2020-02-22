// Component
import AdvertList from './AdvertList';
// HOCs
import withPaginator from '../../hocs/withPaginator';
import { withNamespaces } from 'react-i18next';


export default withPaginator(withNamespaces()(AdvertList));