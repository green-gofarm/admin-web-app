import { MouseEventHandler } from 'react'
import TooltipIconAction from '../../Icon/TooltipIconAction'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { IconTypeMap } from '@mui/material';

interface IViewIconAction {
    title?: string,
    Icon?: OverridableComponent<IconTypeMap> | any,
    onClick?: MouseEventHandler<HTMLElement>,
}

function ApproveIconAction({
    title = "Khóa",
    Icon = ThumbUpAltIcon,
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

export default ApproveIconAction;