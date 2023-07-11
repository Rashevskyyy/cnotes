import {createSlice} from "@reduxjs/toolkit";
import {fetchNotesByUser, getNote} from '../../api/routes';

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        notesByUser: [],
        notes: [],
        currentNote: {},
        isLoadingCurrentNote: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotesByUser.fulfilled, (state, action) => {
                state.notesByUser = action.payload.map((note) => {
                    return {
                        ...note,
                        date: new Date(note.date).toLocaleDateString() + ' ' + new Date(note.date).toLocaleTimeString()
                    }
                });
            })
            .addCase(getNote.pending, (state, action) => {
                state.isLoadingCurrentNote = true
            })
            .addCase(getNote.fulfilled, (state, action) => {
                state.isLoadingCurrentNote = false
                state.currentNote = {
                        ...action.payload,
                        date: new Date(action.payload.date).toLocaleDateString() + ' ' + new Date(action.payload.date).toLocaleTimeString()
                    }
            })

    },
})

export default notesSlice.reducer;
