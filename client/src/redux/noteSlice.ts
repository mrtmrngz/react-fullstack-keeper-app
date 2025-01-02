import { createSlice } from "@reduxjs/toolkit";
import {GetNoteTypes} from "../types.ts";

interface InitialValuesTypes {
    notes: GetNoteTypes[]
    markedNotes: GetNoteTypes[]
}

const initialState: InitialValuesTypes = {
    notes: [],
    markedNotes: []
}

const noteSlice = createSlice({
    name: "notes",
    initialState: initialState,
    reducers: {
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setMarkedNotes: (state, action) => {
            state.markedNotes = action.payload
        },
        setUpdateNote: (state, action) => {
            const id = action.payload.id
            const updatedNote = action.payload

            state.notes = state.notes.map(note => note.id === id ? updatedNote : note)

            if(updatedNote.isMarked) {
                const existinInMarked = state.markedNotes.some(note => note.id === id)
                if(existinInMarked) {
                    state.markedNotes = state.markedNotes.map(note => note.id === id ? updatedNote : note)
                }else {
                    state.markedNotes.push(updatedNote)
                }
            }else {
                state.markedNotes = state.markedNotes.filter(note => note.id !== id)
            }
        },
        changeMarked: (state, action) => {
            const id = action.payload.id
            const findNote = state.notes.find((note) => note.id === id)
            const markedNoteFind = state.markedNotes.find((note) => note.id === id)
            if(findNote) {
                findNote.isMarked = action.payload.isMarked
            }

            if(markedNoteFind) {
                state.markedNotes = state.markedNotes.filter(note => note.id !== id)
            }else {
                state.markedNotes.push(action.payload)
            }
        },
        setDeleteNote: (state, action) => {
            const id = action.payload.id
            const deletedNote = action.payload
            state.notes = state.notes.filter(note => note.id !== id)
            if(deletedNote.isMarked) {
                state.markedNotes = state.markedNotes.filter(note => note.id !== id)
            }
        },
        setAddNote: (state, action) => {
            state.notes.push(action.payload)
            if(action.payload.isMarked) {
                state.markedNotes.push(action.payload)
            }
        }
    }
})

export const {setNotes, setMarkedNotes, setUpdateNote, changeMarked, setDeleteNote, setAddNote} = noteSlice.actions
export default noteSlice.reducer