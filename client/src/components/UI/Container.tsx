import {ReactNode, FC, memo} from "react";

interface ContainerProps {
    children: ReactNode
    className?:string
}

const Container: FC<ContainerProps> = ({children, className}) => {
    return <div className={`container ${className ? className : ""}`}>{children}</div>
};

export default memo(Container);