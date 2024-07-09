import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authAction";
import cartReducer from "./features/cart/cartReducer";
import { localStorageMiddleware } from "@/middleware/storageMiddleware";
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const preloadedState = loadState();
export const Store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: {
    cart: preloadedState || undefined,
  },
});
