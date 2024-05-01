import {useEffect} from "react"
import {Container} from "../container"
import {Outlet, useNavigate} from "react-router-dom"
import {Profile} from "../profile"
import {useSelector} from "react-redux"
import {
    selectUser,
    selectIsAuthenticated,
} from "../../features/user/userSlice"
import NavBarUpdated from "../nav-bar";

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
            <Container>
                <div className="flex-1 p-4">
                    <Outlet/>
                </div>
                <div className="flex-2 p-4">
                    <div className="flex-col flex gap-5">{!user && <Profile/>}</div>
                </div>
            </Container>
        </>
    )
}
