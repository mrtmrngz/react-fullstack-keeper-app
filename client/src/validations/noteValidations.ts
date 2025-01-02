import * as yup from 'yup'


export const noteValidations = yup.object().shape({
    title: yup.string()
        .min(3, "Note title must be at leas 3 character")
        .max(255, "Note title must be maximum 255 character")
        .required('Note Title is required!'),
    description: yup.string().required("Note is required !"),
    isMarked: yup.boolean()
})