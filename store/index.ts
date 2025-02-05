// store.js
import {configureStore} from '@reduxjs/toolkit';
import tripReducer, {initializeTrips} from './tripSlice';
import nameSlice from './nameSlice';

const store = configureStore({
  reducer: {
    trips: tripReducer,
    name: nameSlice,
  },
});

export default store;
store.dispatch(initializeTrips());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
