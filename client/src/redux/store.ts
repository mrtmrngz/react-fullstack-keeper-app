import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice.ts";
import {authService} from "../services/authService.ts";
import {userService} from "../services/userService.ts";
import noteSlice from "./noteSlice.ts";
import {noteService} from "../services/noteService.ts";
import searchSlice from "./searchSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        notes: noteSlice,
        search: searchSlice,
        [authService.reducerPath]: authService.reducer,
        [userService.reducerPath]: userService.reducer,
        [noteService.reducerPath]: noteService.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authService.middleware).concat(userService.middleware).concat(noteService.middleware)
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch