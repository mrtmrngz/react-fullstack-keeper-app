import * as React from "react";
import {FC} from "react";
import {useField} from "formik";
import './CustomInputs.css'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label: string
    requiredField?: true
}

const CustomInput: FC<CustomInputProps> = ({label, requiredField, ...props}) => {

    const [field, meta] = useField({name: props.name!})

    return (
        <div className="custom-input-wrapper">
            <label htmlFor={props?.name}>
                {label} {requiredField ? <span className="required-tag">*</span> : ""}
            </label>
            <input id={props?.name} {...props} {...field} />
            {meta.touched && meta.error && (
                <span className="custom-input-error">{meta.error}</span>
            )}
        </div>
    );
};

export default CustomInput;