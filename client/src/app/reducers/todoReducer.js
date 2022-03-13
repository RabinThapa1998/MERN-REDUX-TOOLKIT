import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../helper/fetch2";

const initialState = [];

export const createTodo = createAsyncThunk("createtodo", async (body) => {
  const result = await fetch2("/createtodo", body);
  return result;
});

export const fetchTodo = createAsyncThunk("fetchtodos", async (body) => {
  const result = await fetch3("/gettodos", "get");
  return result;
});

export const removeTodo = createAsyncThunk("removetodo", async (id) => {
  console.log("dispatch", id);
  const result = await fetch3(`/remove/${id}`, "delete");
  return result;
});

const todoReducer = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: {
    [createTodo.fulfilled]: (state, { payload: { message } }) => {
      if (message) {
        state.push(message);
      }
    },
    [fetchTodo.fulfilled]: (state, { payload: { message } }) => {
      return message;
    },
    [removeTodo.fulfilled]: (state, { payload: { message } }) => {
      const removedTodo = state.filter((item) => {
        return item._id != message._id;
      });
      return removedTodo;
    },
  },
});

export default todoReducer.reducer;
