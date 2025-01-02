import {Form, Formik, FormikHelpers} from "formik";
import {UserLoginProps, UserRegisterProps} from "../../../types.ts";
import CustomInput from "../../../components/Inputs/CustomInput.tsx";
import {loginValidation, registerValidation} from "../../../validations/userValidation.ts";
import {Link} from "react-router";
import Button from "../../../components/UI/Button.tsx";
import style from './authForm.module.css'
import {FC} from "react";

interface LoginFormProps {
    isLogin: true
    initialValues: UserLoginProps
    handleSubmit: (values: UserLoginProps, actions: FormikHelpers<UserLoginProps>) => void
}

interface RegisterFormProps {
    isLogin?: false
    initialValues: UserRegisterProps
    handleSubmit: (values: UserRegisterProps, actions: FormikHelpers<UserRegisterProps>) => void
}

type AuthFormProps = {
    error?: {
        status: number,
        data: {
            error: string
        }
    } | null | undefined
    isLoading: boolean
} & (LoginFormProps | RegisterFormProps)

const AuthForm: FC<AuthFormProps> = ({initialValues, handleSubmit, isLogin, error, isLoading}) => {

    const validationSchema = isLogin ? loginValidation : registerValidation

    const linkRouting = !isLogin ? "/login" : "/register"

    return (
        <div className={`${style["auth-page-wrapper"]} ${style["login-auth-page"]}`}>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={(values, actions) => {
                if (isLogin) {
                    handleSubmit(values as UserLoginProps, actions as FormikHelpers<UserLoginProps>);
                } else {
                    handleSubmit(values as UserRegisterProps, actions as FormikHelpers<UserRegisterProps>);
                }
            }}>
                {() => (
                    <div className={style["auth-form-wrapper"]}>
                        <div className={style["auth-text"]}>
                            {(error && (error.status !== 500)) && (
                                <span className={style["auth-error-message"]}>{error?.data?.error}</span>
                            )}
                            <h1 className={style["auth-title"]}>{isLogin ? "Login" : "Register"}</h1>
                        </div>
                        <Form className={style["auth-form"]}>
                            {!isLogin && (
                                <CustomInput requiredField placeholder="Enter your username" label="username"
                                             name="username" type="text"/>
                            )}
                            <CustomInput requiredField placeholder="Enter your email" label="email"
                                         name="email" type="email"/>
                            <CustomInput requiredField placeholder="Enter your password" label="password"
                                         name="password" type="password"/>
                            <div className={style["auth-button-wrapper"]}>
                                <span>
                                    {isLogin ? "Dont you have an account?" : "Already have account?"} <Link
                                    to={linkRouting}>{isLogin ? "Register Now" : "Login Now"}</Link>
                                </span>
                                <Button disabled={isLoading} htmlType="submit">{isLogin ? "Login" : "Register"}</Button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default AuthForm;