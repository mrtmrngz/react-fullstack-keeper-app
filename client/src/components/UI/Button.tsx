import {ReactNode, FC, memo} from "react";

interface ButtonProps {
    className?: string
    onClick?: () => void
    children: ReactNode
    htmlType?: "button" | "submit" | "reset"
    type?: "primary" | "secondary" | "danger" | "link"
    size?: "small" | "large" | "medium",
    disabled?: boolean
}

const Button: FC<ButtonProps> = ({className, onClick, children, htmlType, type, size, disabled}) => {

    return <button disabled={disabled} onClick={onClick} type={htmlType} className={`btn ${className ? className : ""} btn-${type ? type : "primary"} btn-${size ? size : "medium"}`}>{children}</button>
};

export default memo(Button);