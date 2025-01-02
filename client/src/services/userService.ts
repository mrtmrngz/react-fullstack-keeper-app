import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userService = createApi({
    reducerPath: "userService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/user`,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: () => ({
                url: "/user-info",
                method: "GET"
            })
        }),
        updateUser: builder.mutation({
            query: ({id, updatedData}) => ({
                url: `/${id}`,
                method: "PUT",
                body: updatedData
            })
        })
    })
})

export const {useGetUserInfoQuery, useUpdateUserMutation} = userService