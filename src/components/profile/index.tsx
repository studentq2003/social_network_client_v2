import {Card, CardHeader, CardBody, Image} from "@nextui-org/react"
import {useSelector} from "react-redux"
import {selectCurrent} from "../../features/user/userSlice"
import { VscAccount } from "react-icons/vsc";
import {BASE_URL} from "../../constants"
import {Link} from "react-router-dom"
import {ClickSound} from "../click-sound";
import "./style.css"

export const Profile = () => {
    const current = useSelector(selectCurrent)

    const [play] = ClickSound()

    if (!current) {
        return null
    }

    const {name, email, avatarUrl, id} = current

    return (
        <Card className="profile-card">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Image
                    alt="Card background"
                    className="avatar object-cover rounded-xl"
                    src={`${BASE_URL}${avatarUrl}`}
                    width={370}
                />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Link to={`/users/${id}`} onClick={() => {play()}}>
                    <h4 className="font-bold text-large mb-2">{name}</h4>
                </Link>
                <p className="text-default-500 flex items-center gap-2">
                    <VscAccount />
                    {email}
                </p>
            </CardBody>
        </Card>
    )
}
