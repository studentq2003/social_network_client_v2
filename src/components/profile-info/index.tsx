import React from 'react'

type Props = {
    title: string;
    info?: string;
}

export const ProfileInfo: React.FC<Props> = ({
                                                 title,
                                                 info,
                                             }) => {

    if (!info) {
        return null;
    }

    return (
        <div className="font-semibold">
            <div className="text-gray-500 mr-2">{title}</div>
            <div>{info}</div>
        </div>
    )
}
