import style from './modal.module.css'
import Backdrop from "../Backdrop.tsx";
import ReactDOM from "react-dom";
import {Close} from "../Icons.tsx";
import {ReactNode, RefObject} from "react";

interface ModalProps {
    title: string
    onClose: () => void
    onOpen: boolean
    modalRef: RefObject<HTMLDivElement>
    children: ReactNode
}

const ModalWrapper = ({onClose, onOpen, title, children, modalRef}: ModalProps) => {
    return (
        <div className={style["modal"]}>
            <Backdrop onClose={onClose} onOpen={onOpen} />
            <div className={style["modal-wrapper"]} ref={modalRef}>
                <div className={style["modal-info"]}>
                    <h3 className={style["modal-title"]}>{title}</h3>
                    <button onClick={onClose} className={style["close-modal-btn"]}>
                        <Close />
                    </button>
                </div>
                <div className={style["modal-content"]}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export const Modal = ({children, onClose, onOpen, title, modalRef} : ModalProps) => {

    const portalElement = document.getElementById('modal')!

    return ReactDOM.createPortal(<ModalWrapper title={title} modalRef={modalRef} onOpen={onOpen} onClose={onClose}>{children}</ModalWrapper>, portalElement)
}