import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {},
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isAuthenticated = true;
      state.token = action.payload.token;
      // Access user data directly from the payload
      state.user = action.payload;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.isAuthenticated = false;
      state.token = null;
      state.user = {};
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { login, logout, updateUser } = auth.actions;

export default auth.reducer;
