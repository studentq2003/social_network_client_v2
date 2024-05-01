import {useSelector} from "react-redux"
import {selectCurrent} from "../../features/user/userSlice"
import {Link} from "react-router-dom"
import {Avatar, Card, CardBody} from "@nextui-org/react"
import {User} from "../../components/user"
import {BASE_URL} from "../../constants";
import "./style.css"
import {useContext} from "react";
import {ThemeContext} from "../../components/theme-provider";

export const Following = () => {
    const currentUser = useSelector(selectCurrent)

    if (!currentUser) {
        return null
    }

    const {theme} = useContext(ThemeContext)

    let color: string | undefined
    if (theme == "dark") {
        color = "secondary"
    }
    else {
        color = "default"
    }


    return currentUser.following.length > 0 ? (
        <div className="gap-5 flex flex-col">
            {currentUser.following.map((user) => (
                <Link to={`/users/${user.following.id}`} key={user.following.id}>
                    <Card>
                        <CardBody className="flex-row centerVertically">
                            <Avatar
                                className={'mr-5'}
                                src={`${BASE_URL}${user.following.avatarUrl}`}
                                isBordered
                                // @ts-ignore
                                color={color}
                            />
                            <div className={'flex flex-col'}>
                                <div className={'mr-5'}>{user.following.name}</div>
                                <div>{user.following.email}</div>
                            </div>

                        </CardBody>
                    </Card>
                </Link>
            ))}
        </div>
    ) : (
        <h2>Вы не подписаны ни на кого</h2>
    )
}
