import style from './readModal.module.css'
import Container from "../../components/UI/Container.tsx";
import {FilledStart} from "../../components/UI/Icons.tsx";
import {useParams} from "react-router";
import {useGetSingleNoteQuery} from "../../services/noteService.ts";
import Loader from "../../components/UI/Loader.tsx";
import DOMPurify from "dompurify";

const ReadNote = () => {

    const {id} = useParams()

    const {data: note, isLoading, isFetching} = useGetSingleNoteQuery({noteId: id}, {refetchOnMountOrArgChange: true})

    if (isFetching || isLoading) {
        return <Loader/>
    }

    return (
        <div className={style["read-note-page"]}>
            <Container>
                <div className={style["read-note-wrapper"]}>
                    <h1 className={style["note-title"]}>{note?.title}</h1>
                    {note?.isMarked && (
                        <div className={style["marked-note-badge"]}>
                            <FilledStart/>
                            <span>Marked Note</span>
                        </div>
                    )}
                    <div>
                        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(note?.description || "")}}></p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ReadNote;