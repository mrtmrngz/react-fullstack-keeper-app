import {FormikHelpers} from "formik";
import {UserLoginProps} from "../../../types.ts";
import AuthForm from "../../../components/Forms/AuthForm/AuthForm.tsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useLoginMutation} from "../../../services/authService.ts";
import {toast} from "react-toastify";

interface ErrorTypes {
    status: number
    data: {
        error: string
    }
}

const Login = () => {

    const [login, {isLoading}] = useLoginMutation()
    const [error, setError] = useState<ErrorTypes | null>(null)
    const navigate = useNavigate()

    const initialValues: UserLoginProps = {
        email: "",
        password: ""
    }

    const handleSubmit = async (values: UserLoginProps, _actions: FormikHelpers<UserLoginProps>) => {
        setError(null)
        try {
            const res = await login(values).unwrap()
            if(res) {
                toast.success(res.message)
                navigate("/")
            }
        }catch (err: any) {
            setError(err)
        }
    }

    return <AuthForm isLoading={isLoading} error={error} initialValues={initialValues} handleSubmit={handleSubmit} isLogin />
};

export default Login;