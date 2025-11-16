import { configureStore } from "@reduxjs/toolkit";
import variablesReducer from "./slices/variablesSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    variables: variablesReducer,
    user: userReducer,
  },
});

// TypeScript helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
