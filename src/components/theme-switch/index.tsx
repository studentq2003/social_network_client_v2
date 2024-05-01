import React, {useContext} from "react";
import {Switch} from "@nextui-org/react";
import {ThemeContext} from "../theme-provider";
import {FaMoon} from "react-icons/fa";
import {MdOutlineWbSunny} from "react-icons/md";

import {ClickSound} from "../click-sound";


export const ThemeSwitch = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)

    const [play] = ClickSound()

    return (
        <Switch
            isSelected={theme === "dark"}
            defaultSelected
            size="lg"
            color="secondary"
            startContent={<MdOutlineWbSunny/>}
            endContent={<FaMoon/>}
            onChange={(value) => {
                toggleTheme()
                play()
            }}
        >
        </Switch>
    )

}


