import style from "./notes.module.css";
import {Delete, Edit, Eye, Star} from "../UI/Icons.tsx";
import {GetNoteTypes, NoteTypesWithId} from "../../types.ts";
import {useNavigate} from "react-router";
import {useDeleteNoteMutation, useUpdateMarkedMutation} from "../../services/noteService.ts";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import DOMPurify from "dompurify";
import {changeMarked, setDeleteNote} from "../../redux/noteSlice.ts";

interface NoteItemProps {
    setIsModalOpen: (b: boolean) => void
    setIsModalInvalid: (b: boolean) => void
    setEditingRow: (note: NoteTypesWithId) => void
    note: GetNoteTypes
}

const NoteItem = ({setIsModalOpen, setIsModalInvalid, setEditingRow, note} : NoteItemProps) => {

    const navigate = useNavigate()
    const [updateMarked] = useUpdateMarkedMutation()
    const [deleteNote] = useDeleteNoteMutation()
    const dispatch = useDispatch()

    const handleChangeMarkedStatus = async (id: string | number) => {
        try {
            const result = await updateMarked({noteId: id}).unwrap()
            if(result) {
                toast.info(result.message)
                dispatch(changeMarked(result?.updatedNote))
            }
        }catch (err) {
            console.log(err)
        }
    }

    const handleDeleteNote = async (id: string | number) : Promise<void> => {
        try {
            const result = await deleteNote({noteId: id}).unwrap()
            if(result) {
                toast.warning(result?.message)
                dispatch(setDeleteNote(result?.deletedNote))
            }
        }catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={`${style["note-item"]} ${note?.isMarked ? style["marked-note"] : ""}`}>
            <div className={style["note-info"]}>
                <h3>{note?.title}</h3>
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(note?.description)}}></p>
            </div>
            <div className={style["note-actions"]}>
                <div className={style["note-actions-wrapper"]}>
                    <button title="Read Note" onClick={() => navigate(`/read/${note?.id}`)} className={style["note-action-btn"]}>
                        <Eye/>
                    </button>
                    <button onClick={() => handleChangeMarkedStatus(note?.id)} className={`${style["note-action-btn"]} ${style["star-icon"]}`}>
                        <Star/>
                    </button>
                    <button onClick={() => {
                        setEditingRow(note)
                        setIsModalInvalid(true)
                        setIsModalOpen(true)
                    }} className={style["note-action-btn"]}>
                        <Edit />
                    </button>
                    <button onClick={() => handleDeleteNote(note?.id)} className={style["note-action-btn"]}>
                        <Delete/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;