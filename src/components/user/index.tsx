import React, {useContext} from "react"
import {Avatar, Badge} from "@nextui-org/react"
import {BASE_URL} from "../../constants"
import {ThemeContext} from "../theme-provider";
import {MdPhotoCamera} from "react-icons/md";
import {VscVerifiedFilled} from "react-icons/vsc";
import {useSelector} from "react-redux";
import {selectCurrent} from "../../features/user/userSlice";
import {FiCheck} from "react-icons/fi";


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
            <div className={'flex text-small font-semibold leading-none text-default-600'}>
                <div className="flex gap-4 items-center mr-5">
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
