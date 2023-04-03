import React, { MouseEventHandler } from 'react'
import TooltipIconAction from '../../Icon/TooltipIconAction'
import DeleteIcon from '@mui/icons-material/Delete';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { IconTypeMap } from '@mui/material';

interface IViewIconAction {
    title?: string,
    Icon?: OverridableComponent<IconTypeMap> | any,
    onClick?: MouseEventHandler<HTMLElement>,
}

function DeleteIconAction({
    title = "Xóa",
    Icon = DeleteIcon,
    onClick,
    ...props
}: IViewIconAction) {
    return (
        <TooltipIconAction
            title={title}
            Icon={Icon}
            onClick={onClick}
            {...props}
        />
    )
}

export default DeleteIconAction;