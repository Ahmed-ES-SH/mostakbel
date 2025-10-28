import { configureStore } from "@reduxjs/toolkit";
import variablesReducer from "./slices/variablesSlice";

export const store = configureStore({
  reducer: {
    variables: variablesReducer,
  },
});

// TypeScript helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
