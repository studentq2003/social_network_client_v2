// @ts-ignore
import useSound from 'use-sound';
import clickSfx from '../../static/click.mp3';
import {useEffect} from "react";
import {Button} from "@nextui-org/react";


export const ClickSound = () => {
    const [play] = useSound(clickSfx);
    return [play]
}