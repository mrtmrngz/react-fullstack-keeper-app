import {Modal} from "../UI/Modal/Modal.tsx";
import {AddNoteModalProps, NoteTypesWithoutId} from "../../types.ts";
import NoteForm from "../Forms/NoteForm.tsx";
import {FormikHelpers} from "formik";
import {useCreateNoteMutation} from "../../services/noteService.ts";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {setAddNote} from "../../redux/noteSlice.ts";


const AddNoteModal = ({onClose, onOpen, modalRef}: AddNoteModalProps) => {

    const [createNote] = useCreateNoteMutation()
    const dispatch = useDispatch()

    const initialState: NoteTypesWithoutId = {
        title: "",
        description: "",
        isMarked: false
    }

    const handleSubmit = async (values: NoteTypesWithoutId, _actions: FormikHelpers<NoteTypesWithoutId>): Promise<void> => {
        try {
            const result = await createNote(values).unwrap()
            if(result) {
                toast.success(result?.message)
                dispatch(setAddNote(result?.note))
                onClose()
            }
        }catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal modalRef={modalRef} title="Add Note" onClose={onClose} onOpen={onOpen}>
            <NoteForm initialState={initialState} onSubmit={handleSubmit} buttonText="Add Note" />
        </Modal>
    );
};

export default AddNoteModal;