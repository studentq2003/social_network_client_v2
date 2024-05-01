import {
    Card as NextUiCard,
    CardHeader,
    CardBody,
    CardFooter, Chip,
} from "@nextui-org/react"
import {MetaInfo} from "../meta-info"
import {Typography} from "../typography"
import {User} from "../user"
import {Link, useNavigate} from "react-router-dom"
import {FaRegComment} from "react-icons/fa6"
import {
    useUnlikePostMutation,
    useLikePostMutation,
} from "../../app/services/likesApi"
import {
    useDeletePostMutation,
    useLazyGetAllPostsQuery,
    useLazyGetPostByIdQuery,
} from "../../app/services/postsApi"
import {FcDislike} from "react-icons/fc"
import {MdOutlineFavoriteBorder} from "react-icons/md"
import {formatToClientDate} from "../../utils/format-to-client-date"
import {RiDeleteBinLine} from "react-icons/ri"
import {useSelector} from "react-redux"
import {selectCurrent} from "../../features/user/userSlice"
import {useDeleteCommentMutation} from "../../app/services/commentsApi"
import {Spinner} from "@nextui-org/react"
import {ErrorMessage} from "../error-message"
import {useContext, useState} from "react"
import {hasErrorField} from "../../utils/has-error-field"
import {ClickSound} from "../click-sound";
import {ThemeContext} from "../theme-provider";
import PostControl from "../post-control";

type Props = {
    avatarUrl: string
    name: string
    authorId: string
    content: string
    commentId?: string
    likesCount?: number
    commentsCount?: number
    createdAt?: Date
    id?: string
    cardFor: "comment" | "post" | "current-post"
    likedByUser?: boolean
}

export const Card = ({
                         avatarUrl = "",
                         name = "",
                         content = "",
                         authorId = "",
                         id = "",
                         likesCount = 0,
                         commentsCount = 0,
                         cardFor = "post",
                         likedByUser = false,
                         createdAt,
                         commentId = "",
                     }: Props) => {
    const [likePost] = useLikePostMutation()
    const [unlikePost] = useUnlikePostMutation()
    const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
    const [triggerGetPostById] = useLazyGetPostByIdQuery()
    const [deletePost, deletePostStatus] = useDeletePostMutation()
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrent)

    const [play] = ClickSound()

    const refetchPosts = async () => {
        switch (cardFor) {
            case "post":
                await triggerGetAllPosts().unwrap()
                break
            case "current-post":
                await triggerGetAllPosts().unwrap()
                break
            case "comment":
                await triggerGetPostById(id).unwrap()
                break
            default:
                throw new Error("Неверный аргумент cardFor")
        }
    }

    const handleClick = async () => {
        try {
            likedByUser
                ? await unlikePost(id).unwrap()
                : await likePost({postId: id}).unwrap()
            play()

            await refetchPosts()
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error)
            } else {
                setError(err as string)
            }
        }
    }

    const handleDelete = async () => {
        try {
            play()
            switch (cardFor) {
                case "post":
                    await deletePost(id).unwrap()
                    await refetchPosts()
                    break
                case "current-post":
                    await deletePost(id).unwrap()
                    navigate('/')
                    break
                case "comment":
                    await deleteComment(commentId).unwrap()
                    await refetchPosts()
                    break
                default:
                    throw new Error("Неверный аргумент cardFor")
            }

        } catch (err) {
            console.log(err)
            if (hasErrorField(err)) {
                setError(err.data.error)
            } else {
                setError(err as string)
            }
        }
    }

    const {theme} = useContext(ThemeContext)

    let color
    if (theme == "dark") {
        color = "secondary"
    }
    else {
        color = "default"
    }

    return (
        <NextUiCard className="mb-5">
            <CardHeader className="justify-between items-center bg-transparent">
                <Link to={`/users/${authorId}`} onClick={() => {
                    play()
                }}>
                    <User
                        authorId={authorId}
                        name={name}
                        avatarUrl={avatarUrl}
                        color={color}
                        description={createdAt && formatToClientDate(createdAt)}
                    />
                </Link>
                {authorId === currentUser?.id && (
                    <div className="cursor-pointer" onClick={handleDelete}>
                        {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
                            <Spinner/>
                        ) : (
                            <RiDeleteBinLine/>
                        )}
                    </div>
                )}

            </CardHeader>
            <CardBody className="px-3 py-2 mb-5">
                <Typography>{content}</Typography>
            </CardBody>
            {cardFor !== "comment" && (
                <CardFooter className="gap-3">
                    <div className="flex gap-5 items-center">
                        <div onClick={handleClick}>
                            <MetaInfo
                                count={likesCount}
                                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
                            />
                        </div>
                        <Link to={`/posts/${id}`} onClick={() => {
                            play()
                        }}>
                            <MetaInfo count={commentsCount} Icon={FaRegComment}/>
                        </Link>
                    </div>
                    <ErrorMessage error={error}/>
                </CardFooter>
            )}
        </NextUiCard>
    )
}
