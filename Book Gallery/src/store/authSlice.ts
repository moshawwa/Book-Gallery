import { User } from "../types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAuth: boolean;
  user: User | null;
};

const initialState: AuthState = {
  isAuth: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    logOut: (state) => {
      localStorage.removeItem("access_token");
      state.isAuth = false;
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { loginUser, logOut } = authSlice.actions;
