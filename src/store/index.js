import { createStore } from 'redux';
import usuarioReducer from './usarioReduce';
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'ForinhoSite',
  storage,
};
const persistedReducer = persistReducer(persistConfig, usuarioReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
