import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    firstName: "",
    displayName: "",
    email: "",
    role: ""
  },
  reducers: {
    setUser: (state, payload) => {
      console.log(payload);
      state.id = payload.payload.id;
      state.firstName = payload.payload.firstName;
      state.displayName = payload.payload.name;
      state.email = payload.payload.email;
      state.role = payload.payload.role;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
