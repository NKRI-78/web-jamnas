import { configureStore } from '@reduxjs/toolkit';

import clubReducer from '@redux/slices/clubSlice';
import orderReducer from '@redux/slices/orderSlice';
import paymentReducer from '@redux/slices/paymentSlice';

import { enableMapSet } from 'immer';

enableMapSet();

export const store = configureStore({
  reducer: {
    club: clubReducer,
    order: orderReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;