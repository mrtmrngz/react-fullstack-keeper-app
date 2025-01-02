import PageTitle from '../../components/UI/PageTitle';
import Container from "../../components/UI/Container.tsx";
import style from './updateProfile.module.css'
import {Form, Formik} from "formik";
import CustomInput from "../../components/Inputs/CustomInput.tsx";
import {UserUpdateProps} from "../../types.ts";
import Button from "../../components/UI/Button.tsx";
import {updateUserValidation} from "../../validations/userValidation.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {useUpdateUserMutation} from "../../services/userService.ts";
import {toast} from "react-toastify";
import {useState} from "react";

interface ErrorTypes {
    status: number
    data: {
        error: string
    }
}

const UpdateUserPage = () => {

    const [error, setError] = useState<ErrorTypes | null>(null)
    const {user} = useSelector((state: RootState) => state.auth)
    const [updateUser, {isLoading}] = useUpdateUserMutation()

    const initialState = {
        username: user?.username || "",
        email: user?.email || ""
    }

    const handleSubmit = async (values: UserUpdateProps) => {
        setError(null)
        try {
            const result = await updateUser({id: user?.id, updatedData: values}).unwrap()
            if (result) {
                toast.info(result.message)
                window.location.href = "/profile"
            }
        } catch (err: any) {
            setError(err)
            console.log(err)
        }
    }

    return (
        <div className={style["update-profile-page"]}>
            <PageTitle title='Update Profile'/>
            {error && (error.status !== 500) && (
                <h3 className={style["update-profile-error-message"]}>{error?.data?.error}</h3>
            )}
            <Container>
                <div className={style["update-profile-wrapper"]}>
                    <Formik validationSchema={updateUserValidation} initialValues={initialState} onSubmit={handleSubmit}
                            enableReinitialize>
                        {() => (
                            <div className={style["update-profile-form-wrapper"]}>
                                <Form className={style["update-profile-form"]}>
                                    <CustomInput placeholder="Enter your username" label="username"
                                                 name="username" type="text"/>
                                    <CustomInput placeholder="Enter your email" label="email"
                                                 name="email" type="email"/>
                                    <div className="button-right-wrapper">
                                        <Button disabled={isLoading} htmlType="submit">Update User</Button>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </Container>
        </div>
    );
};

export default UpdateUserPage;