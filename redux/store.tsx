import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import pepperSlice from '../redux/slice';

const rootReducer = combineReducers({
  pepperSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
