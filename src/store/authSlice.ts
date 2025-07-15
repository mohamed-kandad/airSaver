import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuth: false, token: "", authInfo: {}, authType: "" },
  reducers: {
    setAuth: (state, action) => {
      // addName(action.payload);
      state.token = action.payload.token;
      state.isAuth = true;
      state.authInfo = action.payload.authInfo;
      state.authType = action.payload.authType;
    },
    deleteAuth: (state, action) => {
      //   state.name = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setAuth, deleteAuth } = authSlice.actions;
