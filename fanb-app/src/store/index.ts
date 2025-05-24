import { configureStore } from '@reduxjs/toolkit';
// Import reducers akan ditambahkan nanti

export const store = configureStore({
  reducer: {
    // reducers akan ditambahkan nanti
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 