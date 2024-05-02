import React, {useContext} from "react"
import {Avatar, Badge} from "@nextui-org/react"
import {BASE_URL} from "../../constants"
import {ThemeContext} from "../theme-provider";
import {MdPhotoCamera} from "react-icons/md";
import {useSelector} from "react-redux";
import {selectCurrent} from "../../features/user/userSlice";
import "./style.css"

type Props = {
    authorId: string,
    name: string,
    avatarUrl: string,
    description?: string,
    className?: string,
    color?: string
}

export const User: React.FC<Props> = ({
                                          authorId = "",
                                          name = "",
                                          description = "",
                                          avatarUrl = "",
                                          color: string = "",
                                      }) => {

    const {theme} = useContext(ThemeContext)

    let color = "default"
    if (theme == "dark") {
        color = "secondary"
    }

    const current = useSelector(selectCurrent)
    if (!current) {
        return null
    }
    const {email, id} = current

    return (
        <>
            <div className={'user-container'}>
                <div className="user-avatar">
                    {authorId === id ? (
                        <Badge content="" color="success" shape="circle" placement="bottom-right">
                            <Avatar isBordered radius="lg" src={`${BASE_URL}${avatarUrl}`}/>
                        </Badge>
                    ) : (
                        <Avatar
                            isBordered
                            // @ts-ignore
                            color={color}
                            showFallback src={`${BASE_URL}${avatarUrl}`} fallback={
                            <MdPhotoCamera className="animate-pulse w-6 h-6 text-default-500" fill="currentColor"
                                           size={20}/>
                        }/>
                    )}
                </div>
                <div className='text-left align-text-top'>
                    <p className='mb-2'><b>{name}</b></p>
                    <p className='font-light'>{description}</p>
                </div>
            </div>
        </>
    )
}
