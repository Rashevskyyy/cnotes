import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { getUserInfo } from "../../api/routes";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
    token: Cookies.get("token") || null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token);
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      Cookies.remove("token");
      localStorage.removeItem("token");
    },
    register: (state, action) => {
      state.user = action.payload;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    updateUserInfoState: (state, action) => {
      if (state.user) {
        state.user.firstName = action.payload.firstName;
        state.user.lastName = action.payload.lastName;
      }
    },
  },
});

export const fetchUserInfo = () => async (dispatch, getState) => {
  const { token } = getState().user;

  if (!token) return;

  try {
    const userInfo = await getUserInfo(token);
    dispatch(setUserInfo(userInfo));
  } catch (error) {
    console.error("Error fetching user info", error);
  }
};

export const { login, logout, register, setUserInfo, updateUserInfoState } =
  userSlice.actions;

export default userSlice.reducer;
