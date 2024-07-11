import { createSlice } from "@reduxjs/toolkit";

const initState = {
  userName: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initState,
  reducers: {},
});
