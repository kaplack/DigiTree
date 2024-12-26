import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import medReducer from "../features/med/medSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    med: medReducer,
  },
});
