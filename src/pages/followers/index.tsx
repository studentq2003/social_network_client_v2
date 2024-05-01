import {useSelector} from "react-redux"
import {selectCurrent} from "../../features/user/userSlice"
import {Link} from "react-router-dom"
import {Avatar, Card, CardBody} from "@nextui-org/react"
import {User} from "../../components/user"
import {BASE_URL} from "../../constants";
import {useContext} from "react";
import {ThemeContext} from "../../components/theme-provider";

export const Followers = () => {
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


    return currentUser.followers.length > 0 ? (
        <div className="gap-5 flex flex-col">
            {currentUser.followers.map((user) => (
                <Link to={`/users/${user.follower.id}`} key={user.follower.id}>
                    <Card>
                        <CardBody className="block">
                            <CardBody className="flex-row centerVertically">
                                <Avatar
                                    className={'mr-5'}
                                    src={`${BASE_URL}${user.follower.avatarUrl}`}
                                    isBordered
                                    // @ts-ignore
                                    color={color}
                                />
                                <div className={'flex flex-col'}>
                                    <div className={'mr-5'}>{user.follower.name}</div>
                                    <div>{user.follower.email}</div>
                                </div>

                            </CardBody>
                        </CardBody>
                    </Card>
                </Link>
            ))}
        </div>
    ) : (
        <h2>У вас нет подписчиков</h2>
    )
}
