"use client";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  token: typeof window !== "undefined" ? Cookies.get("token") || "" : null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user") || "{}")
      : {},
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { token, user } = action.payload;
      sessionStorage.setItem("user", JSON.stringify(user));
      Cookies.set("token", token);
      state.token = token;
      state.user = user;
    },
    logout(state) {
      sessionStorage.removeItem("user");
      Cookies.remove("token");
      state.token = null;
      state.user = {};
    },
    updateUser(state, action) {
      const updatedUser = { ...state.user, ...action.payload };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      state.user = updatedUser;
    },
  },
});

export const { login, logout, updateUser } = auth.actions;

export default auth.reducer;
