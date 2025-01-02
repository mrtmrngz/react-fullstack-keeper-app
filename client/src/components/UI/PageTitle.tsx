import {memo} from "react";

interface PageTitleProps {
    title: string
}

const PageTitle = ({title}: PageTitleProps) => {
    return <h1 className="page-title">{title}</h1>
};

export default memo(PageTitle);