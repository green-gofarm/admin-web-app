import React, { MouseEventHandler } from 'react'
import TooltipIconAction from '../../Icon/TooltipIconAction'
import EditIcon from '@mui/icons-material/Edit';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { IconTypeMap } from '@mui/material';

interface IViewIconAction {
    title?: string,
    Icon?: OverridableComponent<IconTypeMap> | any,
    onClick?: MouseEventHandler<HTMLElement>,
}

function EditIconAction({
    title = "Chỉnh sửa",
    Icon = EditIcon,
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

export default EditIconAction;