import { MouseEventHandler } from 'react'
import TooltipIconAction from '../../Icon/TooltipIconAction'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { IconTypeMap } from '@mui/material';

interface IViewIconAction {
    title?: string,
    Icon?: OverridableComponent<IconTypeMap> | any,
    onClick?: MouseEventHandler<HTMLElement>,
}

function RejectIconAction({
    title = "Khóa",
    Icon = ThumbDownAltIcon,
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

export default RejectIconAction;