import {Modal} from "../UI/Modal/Modal.tsx";
import {NoteTypesWithoutId, UpdateNoteModalProps} from "../../types.ts";
import NoteForm from "../Forms/NoteForm.tsx";
import {FormikHelpers} from "formik";
import {useUpdateNoteMutation} from "../../services/noteService.ts";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {setUpdateNote} from "../../redux/noteSlice.ts";


const UpdateNoteModal = ({onClose, onOpen, modalRef, editingRow}: UpdateNoteModalProps) => {

    const [updateNote] = useUpdateNoteMutation()
    const dispatch = useDispatch()

    const initialState: NoteTypesWithoutId = {
        title: editingRow?.title || "",
        description: editingRow?.description || "",
        isMarked: editingRow?.isMarked || false
    }

    const handleSubmit = async (values: NoteTypesWithoutId, _actions: FormikHelpers<NoteTypesWithoutId>) => {
        try {
            const result = await updateNote({noteId: editingRow?.id, updatedData: values}).unwrap()
            if(result) {
                toast.info(result?.message)
                dispatch(setUpdateNote(result.updatedNote))
                onClose()
            }
        }catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal modalRef={modalRef} title="Update Note" onClose={onClose} onOpen={onOpen}>
            <NoteForm initialState={initialState} onSubmit={handleSubmit} buttonText="Update Note" />
        </Modal>
    );
};

export default UpdateNoteModal;