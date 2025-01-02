import './CustomInputs.css'
import {useField} from "formik";
import {Check} from "../UI/Icons.tsx";


interface CustomCheckboxProps {
    label: string
    name: string
}

const CustomCheckbox = ({label, name}: CustomCheckboxProps) => {

    const [field, _, helpers] = useField({name: name!})


    return (
        <div className={`custom-checkbox-wrapper ${field.value ? "checked" : ""}`}>
            <button className="checkbox-btn" onClick={() => helpers.setValue(!field.value)} type="button" id={name}>
                {field.value && <Check />}
            </button>
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

export default CustomCheckbox;