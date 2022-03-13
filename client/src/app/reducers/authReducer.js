import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch11 } from "../../helper/fetch2";

const initialState = {
  token: "",
  loading: false,
  error: "",
};

export const signupUser = createAsyncThunk("signupUser", async (body) => {
  const result = await fetch2("/signup", body);
  return result;
});

export const signinUser = createAsyncThunk("signinUser", async (body) => {
  const result = await fetch11("/signin", body);

  return result;
});

const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    logOut: (state, action) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action);
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.error = action.payload.message;
      }
    },
    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signupUser.rejected]: () => {},

    [signinUser.fulfilled]: (state, { payload: { error, token } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.token = token;
        localStorage.setItem("token", token);
      }
    },
    [signinUser.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { addToken, logOut } = authReducer.actions;
export default authReducer.reducer;
