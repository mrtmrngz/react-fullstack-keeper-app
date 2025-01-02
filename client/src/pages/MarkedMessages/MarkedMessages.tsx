import PageTitle from '../../components/UI/PageTitle';
import Container from "../../components/UI/Container.tsx";
import NoteList from "../../components/Notes/NoteList.tsx";
import style from './markedNotes.module.css'
import {useGetMarkedNotesQuery} from "../../services/noteService.ts";
import Loader from "../../components/UI/Loader.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";

const MarkedMessages = () => {

    // @ts-ignore
    const {data, isFetching, isLoading} = useGetMarkedNotesQuery()

    const {markedNotes} = useSelector((state: RootState) => state.notes)
    const {searchState} = useSelector((state: RootState) => state.search)
    const filteredNotes = markedNotes.filter(note => note.title.toLowerCase().includes(searchState.toLowerCase()))

    if(isFetching || isLoading) {
        return <Loader />
    }

    return (
        <div className={style["marked-note-page"]}>
            <PageTitle title='Marked Notes'/>
            <div className={style["notes"]}>
                <Container>
                    <NoteList notes={filteredNotes} />
                </Container>
            </div>
        </div>
    );
};

export default MarkedMessages;