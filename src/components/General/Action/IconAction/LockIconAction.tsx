import React, { MouseEventHandler } from 'react'
import TooltipIconAction from '../../Icon/TooltipIconAction'
import LockIcon from '@mui/icons-material/Lock';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { IconTypeMap } from '@mui/material';

interface IViewIconAction {
    title?: string,
    Icon?: OverridableComponent<IconTypeMap> | any,
    onClick?: MouseEventHandler<HTMLElement>,
}

function LockIconAction({
    title = "Khóa",
    Icon = LockIcon,
    onClick,
    ...props
}: IViewIconAction) {
    return (
        <TooltipIconAction
            title={title}
            Icon={Icon}
            IconProps={{
                color: "#e39124 !important"
            }}
            onClick={onClick}
            {...props}
        />
    )
}

export default LockIconAction;