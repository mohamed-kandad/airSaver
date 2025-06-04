// store.js
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

import tripReducer from './tripSlice';
import nameSlice from './nameSlice';
import langSlice from './langSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  trips: tripReducer,
  name: nameSlice,
  lang: langSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

// إعداد الـ persistor
export const persistor = persistStore(store);

export default store;
// store.dispatch(initializeTrips());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
