import {FormikHelpers} from "formik";
import {UserRegisterProps} from "../../../types.ts";
import AuthForm from "../../../components/Forms/AuthForm/AuthForm.tsx";
import {useRegisterMutation} from "../../../services/authService.ts";
import {useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

interface ErrorTypes {
    status: number
    data: {
        error: string
    }
}

const Register = () => {

    const [register, {isLoading}] = useRegisterMutation()
    const [error, setError] = useState<ErrorTypes | null>(null)
    const navigate = useNavigate()

    const initialValues: UserRegisterProps = {
        username: "",
        email: "",
        password: ""
    }

    const handleSubmit = async(values: UserRegisterProps, _actions: FormikHelpers<UserRegisterProps>) => {
        setError(null)
        try {
            const res = await register(values).unwrap()
            if(res) {
                toast.success(res.message)
                navigate("/login")
            }
        }catch (err: any) {
            setError(err)
        }
    }

    return <AuthForm isLoading={isLoading} initialValues={initialValues} handleSubmit={handleSubmit} error={error} />
};

export default Register;