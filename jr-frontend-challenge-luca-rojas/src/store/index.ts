import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './propertiesSlice';
import selectedPropertyReducer from './selectedPropertySlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    selectedProperty: selectedPropertyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
