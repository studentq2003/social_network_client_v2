import {useEffect} from "react"
import {Outlet, useNavigate} from "react-router-dom"
import {Profile} from "../profile"
import {useSelector} from "react-redux"
import {
    selectUser,
    selectIsAuthenticated,
} from "../../features/user/userSlice"
import NavBarUpdated from "../nav-bar";
import "./style.css"

export const Layout = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth")
        }
    }, [])

    return (
        <>
            <NavBarUpdated/>
                <div className='container'>
                    <div className="outlet">
                        <Outlet/>
                    </div>
                    {/*<div className="layout-profile-container">*/}
                    {/*    <div className="layout-profile flex-col flex gap-5">{!user && <Profile/>}</div>*/}
                    {/*</div>*/}
                </div>
        </>
    )
}
