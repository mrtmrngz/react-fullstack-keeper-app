import { createSlice } from "@reduxjs/toolkit";
import {UserTypesWithoutPassword} from "../types.ts";

interface InitialStateTypes {
    user: UserTypesWithoutPassword | null
}

const initialStates: InitialStateTypes = {
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialStates,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logOut: (state) => {
            state.user = null
        }
    }
})

export const {setUser, logOut} = authSlice.actions
export default authSlice.reducer