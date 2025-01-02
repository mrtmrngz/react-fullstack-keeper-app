import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {searchState: ""},
    reducers: {
        setSearch: (state, action) => {
            state.searchState = action.payload
        }
    }
})

export const {setSearch} = searchSlice.actions
export default searchSlice.reducer