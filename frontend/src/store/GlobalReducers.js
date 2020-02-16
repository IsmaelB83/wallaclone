// Node
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
// Own Reducers
import { adverts } from './reducers/AdvertsReducers';
import { tags } from './reducers/TagsReducers';
import { filters } from './reducers/FiltersReducers';
import { lastCall } from './reducers/LastCallReducers';
import { session } from './reducers/SessionReducers';
import { ui } from './reducers/UiReducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  adverts,
  tags,
  filters,
  lastCall,
  session,
  ui
});

export default createRootReducer;