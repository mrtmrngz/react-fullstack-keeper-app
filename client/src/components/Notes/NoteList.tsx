import style from './notes.module.css'
import NoteItem from "./NoteItem.tsx";
import {useRef, useState} from "react";
import {GetNoteTypes, NoteTypesWithId} from "../../types.ts";
import UpdateNoteModal from "../Modals/UpdateNoteModal.tsx";
import gsap from 'gsap';
import {useGSAP} from '@gsap/react'

interface NoteListProps {
    notes: GetNoteTypes[]
}

const NoteList = ({notes}: NoteListProps) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isModalInvalid, setIsModalInvalid] = useState<boolean>(false)
    const [editingRow, setEditingRow] = useState<null | NoteTypesWithId>(null)
    const modalRef = useRef(null)


    useGSAP(() => {
        if(isModalOpen) {
            gsap.fromTo(modalRef.current, {opacity: 0}, {
                opacity: 1,
                duration: .7,
                ease: "power2.out"
            })
        }

        if(!isModalOpen && isModalInvalid) {
            gsap.to(modalRef.current, {
                opacity: 0,
                duration: .3,
                onComplete: () => {
                    setIsModalInvalid(false)
                }
            })
        }
    }, [isModalOpen, isModalInvalid])

    return (
        <>
            <div className={style["note-list-wrapper"]}>
                {notes.length > 0 ? (
                    <div className={style["note-list"]}>
                        {notes.map((note) => (
                            <NoteItem key={note.id} note={note} setIsModalOpen={setIsModalOpen}
                                      setIsModalInvalid={setIsModalInvalid} setEditingRow={setEditingRow}/>
                        ))}
                    </div>
                ) : <h2 className={style["no-note-warning"]}>There is no any note!</h2>}
            </div>

            {isModalInvalid &&
                <UpdateNoteModal editingRow={editingRow} onOpen={isModalOpen}
                                 onClose={() => setIsModalOpen(false)} modalRef={modalRef}/>}
        </>
    );
};

export default NoteList;