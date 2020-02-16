// Component
import AdvertList from './AdvertList';
// HOCs
import withPaginator from '../withPaginator';
import { withNamespaces } from 'react-i18next';


export default withPaginator(withNamespaces()(AdvertList));