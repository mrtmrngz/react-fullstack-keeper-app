import style from './profile.module.css'
import PageTitle from "../../components/UI/PageTitle.tsx";
import Container from "../../components/UI/Container.tsx";
import Button from "../../components/UI/Button.tsx";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {useGetCountsQuery} from "../../services/noteService.ts";
import Loader from "../../components/UI/Loader.tsx";

const Profile = () => {

    const {user} = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const {data, isLoading, isFetching} = useGetCountsQuery(undefined, {
        refetchOnMountOrArgChange: true
    })

    console.log(data)

    if(isLoading || isFetching) {
        return <Loader />
    }

    return (
        <div className={style["profile-page"]}>
            <PageTitle title="Profile" />
            <Container>
                <div className={style["profile-page-wrapper"]}>

                    <div className={style["profile-page-info-wrapper"]}>
                        <h2 className={style["profile-page-header"]}>Profile Info</h2>
                        <div className={style["profile-info-list"]}>
                            <div className={style["profile-page-info"]}>
                                <h3>Username: </h3>
                                <span>{user?.username}</span>
                            </div>
                            <div className={style["profile-page-info"]}>
                                <h3>Email: </h3>
                                <span>{user?.email}</span>
                            </div>
                            <Button onClick={() => navigate(`/profile/update/${user?.id}`)} size="large">Update Profile</Button>
                        </div>
                    </div>

                    <div className={style["divider"]}/>

                    <div className={style["profile-page-info-wrapper"]}>
                        <h2 className={style["profile-page-header"]}>Note Info</h2>
                        <div className={`${style["profile-info-list"]} ${style["last-list"]}`}>
                            <div className={style["profile-page-info"]}>
                                <h3>Note Count: </h3>
                                <span>{data?.allNotesCount}</span>
                            </div>
                            <div className={style["profile-page-info"]}>
                                <h3>Marked Note Count: </h3>
                                <span>{data?.markedNotesCount}</span>
                            </div>
                            <div className={style["button-wrapper"]}>
                                <Button onClick={() => navigate("/")} size="large">All Notes</Button>
                                <Button onClick={() => navigate("/marked-notes")} size="large">Marked Notes</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Profile;