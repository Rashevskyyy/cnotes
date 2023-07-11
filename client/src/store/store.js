import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import notesReducer from './slices/notesSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
});
