import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {} ,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  
});
