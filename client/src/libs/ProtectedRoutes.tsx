import {useDispatch, useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router";
import {AppDispatch, RootState} from "../redux/store.ts";
import {useGetUserInfoQuery} from "../services/userService.ts";
import {useEffect} from "react";
import {setUser} from "../redux/authSlice.ts";
import Loader from "../components/UI/Loader.tsx";

const ProtectedRoutes = () => {
    const {user} = useSelector((state: RootState) => state.auth)
    const dispatch: AppDispatch = useDispatch()
    const {data, isLoading, isFetching, isError, refetch} = useGetUserInfoQuery(null, {skip: !!user})

    useEffect(() => {
        if(!user) {
            refetch()
        }
    }, [user, refetch])

    useEffect(() => {
        if(data && !user) {
            dispatch(setUser(data))
        }
    }, [data, user, dispatch])

    if(isLoading || isFetching) {
        return <Loader />
    }

    if(isError) {
        return (
            <Navigate to="/login" replace />
        )
    }

    return <Outlet />
};

export default ProtectedRoutes;