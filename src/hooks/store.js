import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authAction";
import cartReducer from "./features/cart/cartReducer";
export const Store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
