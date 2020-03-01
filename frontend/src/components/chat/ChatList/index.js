// Component
import ChatList from './ChatList';
// HOCs
import { withRouter } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

export default withNamespaces()(withRouter(ChatList));