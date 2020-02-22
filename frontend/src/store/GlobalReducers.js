// Node
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
// Own Reducers
import { adverts } from './reducers/AdvertsReducers';
import { chats } from './reducers/ChatsReducers';
import { tags } from './reducers/TagsReducers';
import { filters } from './reducers/FiltersReducers';
import { lastCall } from './reducers/LastCallReducers';
import { session } from './reducers/SessionReducers';
import { socketIo } from './reducers/SocketIoReducers';
import { ui } from './reducers/UiReducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  chats,
  adverts,
  tags,
  filters,
  lastCall,
  session,
  socketIo,
  ui
});

export default createRootReducer;