import {useEffect} from "react"
import {useParams} from "react-router-dom"
import {
    useGetUserByIdQuery,
    useLazyCurrentQuery,
    useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import {useDispatch, useSelector} from "react-redux"
import {resetUser, selectCurrent} from "../../features/user/userSlice"
import {Button, Card, Image} from "@nextui-org/react"
import {MdOutlinePersonAddAlt1} from "react-icons/md"
import {MdOutlinePersonAddDisabled} from "react-icons/md"
import {useDisclosure} from "@nextui-org/react"
import {
    useFollowUserMutation,
    useUnfollowUserMutation,
} from "../../app/services/followApi"
import {BASE_URL} from "../../constants"
import {CiEdit} from "react-icons/ci"
import {EditProfile} from "../../components/edit-profile"
import {formatToClientDate} from "../../utils/format-to-client-date"
import {ProfileInfo} from "../../components/profile-info"
import {CountInfo} from "../../components/count-info"
import {ClickSound} from "../../components/click-sound";

export const UserProfile = () => {
    const {id} = useParams<{ id: string }>()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const currentUser = useSelector(selectCurrent)
    const {data} = useGetUserByIdQuery(id ?? "")
    const [followUser] = useFollowUserMutation()
    const [unfolowUser] = useUnfollowUserMutation()
    const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
    const [triggerCurrentQuery] = useLazyCurrentQuery()

    const dispatch = useDispatch()

    const [play] = ClickSound()

    useEffect(
        () => () => {
            dispatch(resetUser())
        },
        [],
    )

    const handleFollow = async () => {
        try {
            play()
            if (id) {
                data?.isFollowing
                    ? await unfolowUser(id).unwrap()
                    : await followUser({followingId: id}).unwrap()

                await triggerGetUserByIdQuery(id)

                await triggerCurrentQuery()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = async () => {
        try {
            play()
            if (id) {
                await triggerGetUserByIdQuery(id)
                await triggerCurrentQuery()
                onClose()
            }
        } catch (err) {
            console.log(err)
        }
    }

    if (!data) {
        return null
    }

    return (
        <>
            <div className="flex items-stretch gap-4">
                <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
                    <Image
                        src={`${BASE_URL}${data.avatarUrl}`}
                        alt={data.name}
                        width={200}
                        height={200}
                        className="border-4 border-white"
                    />
                    <div className="flex flex-col text-2xl font-bold gap-4 items-center">
                        {data.name}
                        {currentUser?.id !== id ? (
                            <Button
                                color={data?.isFollowing ? "default" : "primary"}
                                variant="flat"
                                className="gap-2"
                                onClick={handleFollow}
                                endContent={
                                    data?.isFollowing ? (
                                        <MdOutlinePersonAddDisabled/>
                                    ) : (
                                        <MdOutlinePersonAddAlt1/>
                                    )
                                }
                            >
                                {data?.isFollowing ? 'Отписаться' : 'Подписаться'}
                            </Button>
                        ) : (
                            <Button
                                endContent={<CiEdit/>}
                                onClick={() => {
                                    play()
                                    onOpen()
                                }}
                            >
                                Редактировать
                            </Button>
                        )}
                    </div>
                </Card>
                <Card className="flex flex-col space-y-4 p-5 flex-1 max-w-[500px]">
                    <ProfileInfo title="Почта:" info={data.email}/>
                    <ProfileInfo title="Местоположение:" info={data.location}/>
                    <ProfileInfo title="Дата рождения:" info={formatToClientDate(data.dateOfBirth)}/>
                    <ProfileInfo title="Обо мне:" info={data.bio}/>

                    <div className="flex gap-2 justify-center">
                        <CountInfo count={data.followers.length} title="Подписчики"/>
                        <CountInfo count={data.following.length} title="Подписки"/>
                    </div>
                </Card>
            </div>
            <EditProfile isOpen={isOpen} onClose={handleClose} user={data}/>
        </>
    )
}
