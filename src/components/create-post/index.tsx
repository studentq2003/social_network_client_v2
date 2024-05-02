import {Avatar, Badge, Button, Textarea, user} from "@nextui-org/react"
import {IoMdCreate} from "react-icons/io"
import {
    useCreatePostMutation,
    useLazyGetAllPostsQuery,
} from "../../app/services/postsApi"
import {useForm, Controller} from "react-hook-form"
import {ErrorMessage} from "../error-message"
import {ClickSound} from "../click-sound";
import {useContext} from "react";
import {ThemeContext} from "../theme-provider";
import {BASE_URL} from "../../constants";
import {useSelector} from "react-redux";
import {selectCurrent} from "../../features/user/userSlice";
import { FiCheck } from "react-icons/fi";
import "./style.css"


export const CreatePost = () => {
    const [createPost] = useCreatePostMutation()
    const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
    const {
        handleSubmit,
        control,
        formState: {errors},
        setValue,
    } = useForm()

    const onSubmit = handleSubmit(async (data) => {
        try {
            await createPost({content: data.post}).unwrap()
            setValue("post", "")
            await triggerGetAllPosts().unwrap()
        } catch (error) {
            console.log("err", error)
        }
    })
    const error = errors?.post?.message as string

    const [play] = ClickSound()

    const {theme} = useContext(ThemeContext)

    let color

    if (theme === 'dark') {
        color = "secondary"
    } else {
        color = "default"
    }

    const current = useSelector(selectCurrent)
    if (!current) {
        return null
    }
    const {name, email, avatarUrl, id} = current

    return (
        <form className="post-create-form flex-grow mb-5" onSubmit={onSubmit}>
            <Controller
                name="post"
                control={control}
                defaultValue=""
                rules={{
                    required: "Обязательное поле",
                }}
                render={({field}) => (
                    <Textarea
                        {...field}
                        variant={'bordered'}
                        labelPlacement="outside"
                        placeholder="О чём вы думаете?"
                        className="post-create-form-textarea"
                        maxLength={3000}
                    />

                )}
            />
            {errors && <ErrorMessage error={error}/>}
            <div className='user-info-create-post '>
                {email == 'studentq@animalq.ru' ? (
                    <Badge
                        isOneChar
                        content={<FiCheck color="secondary" />}
                        color="success"
                        placement="bottom-right"
                    >
                        <Avatar
                            isBordered
                            className='create-post-avatar'
                            color="success"
                            radius="md"
                            src={`${BASE_URL}${avatarUrl}`}                        />
                    </Badge>
                ) : (
                    <Badge content="" color="success" shape="circle" placement="bottom-right">
                        <Avatar isBordered radius="lg" src={`${BASE_URL}${avatarUrl}`}/>
                    </Badge>
                )}
                <Button
                    // @ts-ignore
                    color={color}
                    className="create-post-btn flex-end p-2 mx-4"
                    endContent={<IoMdCreate/>}
                    type="submit"
                    onClick={() => {
                        play()
                    }}
                >
                    Добавить пост
                </Button>
            </div>

        </form>
    )
}
