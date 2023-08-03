import { createSlice } from "@reduxjs/toolkit";
import { fetchAllNotes, fetchNotesByUser, getNote } from "../../api/routes";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    currentNote: {},
    isLoadingCurrentNote: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesByUser.fulfilled, (state, action) => {
        state.notes = action.payload.map((note) => {
          return {
            ...note,
            date: new Date(note.date).toLocaleDateString(),
          };
        });
      })
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        state.notes = action.payload.map((note) => {
          return {
            ...note,
            date: new Date(note.date).toLocaleDateString(),
          };
        });
      })
      .addCase(getNote.pending, (state, action) => {
        state.isLoadingCurrentNote = true;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.isLoadingCurrentNote = false;
        state.currentNote = {
          ...action.payload,
          date: new Date(action.payload.date).toLocaleDateString(),
          comments: action.payload.comments.map((comment) => ({
            ...comment,
            date: new Date(comment.date).toLocaleString(),
          })),
        };
      });
  },
});

export default notesSlice.reducer;
