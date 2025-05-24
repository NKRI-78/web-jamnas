import { configureStore } from '@reduxjs/toolkit';

import clubReducer from '@redux/slices/clubSlice';
import { enableMapSet } from 'immer';

enableMapSet();

export const store = configureStore({
  reducer: {
    club: clubReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;