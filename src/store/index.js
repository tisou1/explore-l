import { createStore,combineReducers } from 'redux';

import {filterSelect, dispatcCount} from './reducers/filterSelect';

export { dispatchFilter } from './actions/filterSelect';

const store = createStore(
    combineReducers({
      filterSelect,
      counter: dispatcCount
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
