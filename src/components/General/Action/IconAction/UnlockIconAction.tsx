import React, { MouseEventHandler } from 'react'
import TooltipIconAction from '../../Icon/TooltipIconAction'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { IconTypeMap } from '@mui/material';

interface IViewIconAction {
    title?: string,
    Icon?: OverridableComponent<IconTypeMap> | any,
    onClick?: MouseEventHandler<HTMLElement>,
}

function UnlockIconAction({
    title = "Mở khóa",
    Icon = LockOpenIcon,
    onClick,
    ...props
}: IViewIconAction) {
    return (
        <TooltipIconAction
            title={title}
            Icon={Icon}
            IconProps={{
                color: "#229451 !important"
            }}
            onClick={onClick}
            {...props}
        />
    )
}

export default UnlockIconAction;