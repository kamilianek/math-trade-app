import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';


const {
  auth,
  editions,
  myAssignedProducts,
  myNotAssignedProducts,
  otherAssignedProducts,
  definedGroups,
} = reducers;

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['somethingTemporary'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  editions,
  myAssignedProducts,
  myNotAssignedProducts,
  otherAssignedProducts,
  definedGroups,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const middlewares = [
  thunk,
];

const store = applyMiddleware(...middlewares)(createStore)(persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistor = persistStore(store);

export default {
  store,
  persistor,
};
