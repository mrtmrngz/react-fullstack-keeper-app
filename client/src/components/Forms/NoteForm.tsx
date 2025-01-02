import {Form, Formik, FormikHelpers} from "formik";
import CustomInput from "../Inputs/CustomInput.tsx";
import Button from "../UI/Button.tsx";
import {NoteTypesWithoutId} from "../../types.ts";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import style from './noteForm.module.css'
import CustomCheckbox from "../Inputs/CustomCheckbox.tsx";
import {noteValidations} from "../../validations/noteValidations.ts";

interface NoteFormProps {
    initialState: NoteTypesWithoutId
    buttonText: string
    onSubmit: (values: NoteTypesWithoutId, actions: FormikHelpers<NoteTypesWithoutId>) => void
}

const NoteForm = ({initialState, onSubmit, buttonText}: NoteFormProps) => {
    return (
        <Formik validationSchema={noteValidations} initialValues={initialState} onSubmit={(values, actions) => {
            onSubmit(values, actions)
        }} enableReinitialize>
            {({values, setFieldValue, touched, errors}) => (
                <Form className={style["note-form"]}>
                    <CustomInput requiredField placeholder="Enter note title" label="title"
                                 name="title" type="text"/>
                    <div className={style["form-quill-wrapper"]}>
                        <label htmlFor="descripton">
                            Note <span>*</span>
                        </label>
                        <ReactQuill theme={"snow"} id="note-description" value={values.description} onChange={(content) => setFieldValue('description', content)} />
                        {touched.description && errors.description && (
                            <span className="custom-input-error">{errors.description}</span>
                        )}
                    </div>
                    <CustomCheckbox label="Marked Note" name="isMarked" />
                    <div className="button-right-wrapper">
                        <Button htmlType="submit">{buttonText}</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default NoteForm;