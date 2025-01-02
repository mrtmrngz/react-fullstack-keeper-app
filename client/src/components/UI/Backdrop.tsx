import {memo} from "react";

interface BackdropProps {
    onClose: () => void
    onOpen: boolean
}

const Backdrop = ({onClose, onOpen} : BackdropProps) => {
    return (
        <div onClick={onClose} className={`backdrop ${onOpen ? "open" : ""}`} />
    );
};

export default memo(Backdrop);
