import { configureStore } from '@reduxjs/toolkit';
import authReducer from './invoices/layout';
import { invoicesApiSlice } from './invoices/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [invoicesApiSlice.reducerPath]: invoicesApiSlice.reducer, // Add API slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(invoicesApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;