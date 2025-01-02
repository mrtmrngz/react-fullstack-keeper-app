import PageTitle from '../../components/UI/PageTitle';
import style from './home.module.css'
import Button from "../../components/UI/Button.tsx";
import Container from "../../components/UI/Container.tsx";
import NoteList from "../../components/Notes/NoteList.tsx";
import {useRef, useState} from "react";
import AddNoteModal from "../../components/Modals/AddNoteModal.tsx";
import gsap from 'gsap';
import {useGSAP} from '@gsap/react'
import {useGetNotesQuery} from "../../services/noteService.ts";
import Loader from "../../components/UI/Loader.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";

const Home = () => {

    const [isModalInvalid, setIsModalInvalid] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const modalRef = useRef(null)
    const {data, isLoading, isFetching} = useGetNotesQuery()
    const {notes} = useSelector((state: RootState) => state.notes)
    const {searchState} = useSelector((state: RootState) => state.search)

    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchState.toLowerCase()))

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

    if(isLoading || isFetching) {
        return <Loader />
    }

    return (
        <>
            <div className={style["home-page"]}>
                <PageTitle title='Notes'/>
                <div className={style["notes"]}>
                    <Container>
                        <div className={style["add-note-btn-wrapper"]}>
                            <Button onClick={() => {
                                setIsModalInvalid(true)
                                setIsModalOpen(true)
                            }}>Add Note</Button>
                        </div>
                        <NoteList notes={filteredNotes} />
                    </Container>
                </div>
            </div>
            {isModalInvalid && <AddNoteModal onOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalRef={modalRef} />}
        </>
    );
};

export default Home;