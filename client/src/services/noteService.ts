import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {setMarkedNotes, setNotes} from "../redux/noteSlice.ts";
import {GetNoteTypes} from "../types.ts";

export const noteService = createApi({
    reducerPath: "noteService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/notes`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createNote: builder.mutation({
           query: (body) => ({
               url: "/",
               method: "POST",
               body: body
           })
        }),
        getNotes: builder.query<any, void>({
            query: () => "/",
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    dispatch(setNotes(data))
                }catch (err) {
                    console.log(err)
                }
            }
        }),
        getCounts: builder.query({
           query: () => "/note-counts"
        }),
        getMarkedNotes: builder.query<any, void>({
            query: () => "/marked-notes",
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    dispatch(setMarkedNotes(data))
                }catch (err) {
                    console.log(err)
                }
            }
        }),
        getSingleNote: builder.query<GetNoteTypes, {noteId: string | undefined}>({
            query: ({noteId}) => `/${noteId}`
        }),
        updateNote: builder.mutation({
            query: ({noteId, updatedData}) => ({
                url: `/${noteId}`,
                method: "PUT",
                body: updatedData
            })
        }),
        updateMarked: builder.mutation({
            query: ({noteId}) => ({
                url: `/change-marked/${noteId}`,
                method: "PUT"
            })
        }),
        deleteNote: builder.mutation({
            query: ({noteId}) => ({
                url: `/${noteId}`,
                method: "DELETE"
            })
        })
    })
})

export const {useGetNotesQuery, useGetCountsQuery, useGetMarkedNotesQuery, useGetSingleNoteQuery, useUpdateMarkedMutation, useUpdateNoteMutation, useDeleteNoteMutation, useCreateNoteMutation} = noteService