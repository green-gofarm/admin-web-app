import React, { MouseEventHandler } from 'react'
import TooltipIconAction from '../../Icon/TooltipIconAction'
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { IconTypeMap } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface UploadIconActionProps {
    title?: string,
    Icon?: OverridableComponent<IconTypeMap> | any,
    onClick?: MouseEventHandler<HTMLElement>,
}

function UploadIconAction({
    title = "Tải lên",
    Icon = CloudUploadIcon,
    onClick,
    ...props
}: UploadIconActionProps) {
    return (
        <TooltipIconAction
            title={title}
            Icon={Icon}
            onClick={onClick}
            {...props}
        />
    )
}

export default UploadIconAction;