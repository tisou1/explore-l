import { createStore,combineReducers } from 'redux';

import filterSelect from './reducers/filterSelect';
import counter from './reducers/counter'

export { dispatchFilter } from './actions/filterSelect';

const store = createStore(
    combineReducers({
      filterSelect,
      counter
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
