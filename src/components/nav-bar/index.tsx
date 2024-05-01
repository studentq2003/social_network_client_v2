import React, {useContext} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
} from "@nextui-org/react";
import {FiLayers} from "react-icons/fi";
import {BASE_URL} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectCurrent} from "../../features/user/userSlice";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ThemeSwitch} from "../theme-switch";
import {ClickSound} from "../click-sound";
import {ThemeContext} from "../theme-provider";
import {GoBack} from "../go-back";

export default function NavBarUpdated() {
    const current = useSelector(selectCurrent)
    const {theme} = useContext(ThemeContext)

    if (!current) {
        return null
    }

    const {name, email, avatarUrl, id} = current

    // const isAuthenticated = useSelector(selectIsAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        navigate("/auth")
    }

    const [play] = ClickSound()

    let color

    if (theme === "dark") {
        color = "secondary"
    } else {
        color = "default"
    }

    const cur_path = useLocation().pathname

    return (
        <Navbar>
            <NavbarBrand as={Link} to="/" onClick={() => {
                play()
            }}>
                <p className="font-bold text-inherit">SN</p>
                <FiLayers/>
                <span className={'ml-5'}/>
                {cur_path != '/' && (
                    <GoBack/>
                )}
            </NavbarBrand>


            <NavbarContent justify="end" as='div'>
                <ThemeSwitch/>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger onClick={() => play()}>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            // @ts-ignore
                            color={color}
                            name={name}
                            size="sm"
                            src={`${BASE_URL}${avatarUrl}`}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2" onClick={() => play()}>
                            <Link to={`/users/${id}`}>
                                <p className="font-semibold">{name}</p>
                                <p className="font-semibold">{email}</p>
                            </Link>

                        </DropdownItem>
                        <DropdownItem key="settings" isDisabled onClick={() => play()}>Настройки</DropdownItem>
                        <DropdownItem key="followers">
                            <Link to={`followers`} onClick={() => play()}>
                                Мои подписчики
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="following">
                            <Link to={`following`} onClick={() => play()}>
                                Мои подписки
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="help_and_feedback" isDisabled onClick={() => play()}>Помощь и обратная
                            связь</DropdownItem>
                        <DropdownItem key="logout" color="danger" onClick={() => {
                            play()
                            handleLogout()
                        }}>
                            Выйти
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
