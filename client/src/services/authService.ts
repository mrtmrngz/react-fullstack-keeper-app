import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/auth`,
    credentials: 'include'
})

export const authService = createApi({
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: "/register",
                method: "POST",
                body: credentials
            })
        }),
        logout: builder.mutation<{message: string}, void>({
            query: () => ({
                url: "/logout",
                method: "POST",
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useLogoutMutation} = authService
