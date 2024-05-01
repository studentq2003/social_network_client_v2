import React from "react"
import {FaRegArrowAltCircleLeft} from "react-icons/fa"
import {useNavigate} from "react-router-dom"
import {ClickSound} from "../click-sound";

export const GoBack = () => {
    const navigate = useNavigate()

    const [play] = ClickSound()

    const handleGoBack = () => {
        navigate(-1)
        play()
    }

    return (
        <span
            onClick={handleGoBack}
            className="text-default-500 flex items-center gap-2 cursor-pointer"
        >
            <FaRegArrowAltCircleLeft/>
            Назад
        </span>
    )
}
