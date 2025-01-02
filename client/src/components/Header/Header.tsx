import Container from "../UI/Container.tsx";
import {Link, useLocation} from "react-router";
import {BurgerMenuIcon, Close, Draw, Home, Logout, Person, Search, Star} from "../UI/Icons.tsx";
import styles from './Header.module.css'
import React, {ReactNode, useEffect, useState} from "react";
import Backdrop from "../UI/Backdrop.tsx";
import {useLogoutMutation} from "../../services/authService.ts";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {logOut} from "../../redux/authSlice.ts";
import {AppDispatch} from "../../redux/store.ts";
import {setSearch} from "../../redux/searchSlice.ts";

type LinkTypes = {
    key: string
    path: string
    label: string
    icon: ReactNode
}

const links: Array<LinkTypes> = [
    {
        key: "home",
        path: "/",
        label: "Home",
        icon: <Home/>
    },
    {
        key: "marked",
        path: "/marked-notes",
        label: "Marked Notes",
        icon: <Star/>
    },
    {
        key: "profile",
        path: "/profile",
        label: "Profile",
        icon: <Person/>
    },
    {
        key: "logout",
        path: "/",
        label: "Logout",
        icon: <Logout/>
    }
]

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [logout] = useLogoutMutation()
    const dispatch: AppDispatch = useDispatch()

    const {pathname} = useLocation()

    const handleLogout = async () => {
        try {
            const result = await logout().unwrap()
            if (result) {
                toast.warning(result.message)
                dispatch(logOut())
                window.location.href = "/login"
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        dispatch(setSearch(value))
    }

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    return (
        <header>
            <div className={styles["main-header"]}>
                <Container className={styles["header-container"]}>
                    <div className={styles["header-wrapper"]}>
                        <div className={styles["logo"]}>
                            <Link to="/" className={styles["logo-link"]}>
                                <Draw size={30}/>
                                <span>KeeperApp</span>
                            </Link>
                        </div>
                        <div className={styles["search-wrapper"]}>
                            <input onChange={handleSearchChange} type="text"/>
                            <button>
                                <Search/>
                            </button>
                        </div>
                        <div className={styles["nav-links"]}>
                            <nav>
                                <ul className={styles["nav-list"]}>
                                    {links.map((link) => (
                                        <li key={link.key} className={styles["nav-item"]}>
                                            {link.key !== "logout" ? (
                                                <Link className={`${pathname === link.path ? styles["active"] : ""}`}
                                                      to={link.path}>
                                                    {link.icon}
                                                    <span>{link.label}</span>
                                                </Link>
                                            ) : (
                                                <button onClick={handleLogout} className={styles["logout-btn"]}>
                                                    {link.icon}
                                                    <span>{link.label}</span>
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className={styles["mobile-menu-icon"]}>
                            <button onClick={() => setIsMenuOpen(true)} className={styles["mobile-menu-btn"]}>
                                <BurgerMenuIcon/>
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
            <div className={styles["mobile-menu"]}>
                <Backdrop onClose={() => setIsMenuOpen(false)} onOpen={isMenuOpen}/>
                <div className={`${styles["mobile-menu-wrapper"]} ${isMenuOpen ? styles["active"] : ""}`}>
                    <nav>
                        <ul className={styles["nav-list"]}>
                            {links.map((link) => (
                                <li key={link.key} className={styles["nav-item"]}>
                                    {link.key !== "logout" ? (
                                        <Link className={`${pathname === link.path ? styles["active"] : ""}`}
                                              to={link.path}>
                                            {link.icon}
                                            <span>{link.label}</span>
                                        </Link>
                                    ) : (
                                        <button className={styles["logout-btn"]}>
                                            {link.icon}
                                            <span>{link.label}</span>
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div>
                        <button onClick={() => setIsMenuOpen(false)} className={styles["close-menu-btn"]}>
                            <Close/>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;