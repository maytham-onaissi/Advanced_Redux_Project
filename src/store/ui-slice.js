import { createSlice } from "@reduxjs/toolkit";

const initalUiState = { toggle: false, notification: null };

const uiSlice = createSlice({
  name: "UI",
  initialState: initalUiState,
  reducers: {
    toggle(state) {
      state.toggle = !state.toggle;
    },
    setNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
