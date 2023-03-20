import { MouseEventHandler } from 'react'
import TooltipIconAction from '../../Icon/TooltipIconAction'
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { IconTypeMap } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface IViewIconAction {
    title?: string,
    Icon?: OverridableComponent<IconTypeMap> | any,
    onClick?: MouseEventHandler<HTMLElement>,
}

function SendIconAction({
    title = "Gửi yêu cầu",
    Icon = SendIcon,
    onClick,
    ...props
}: IViewIconAction) {
    return (
        <TooltipIconAction
            title={title}
            Icon={Icon}
            IconProps={{
                color: "rgb(25, 118, 210) !important"
            }}
            onClick={onClick}
            {...props}
        />
    )
}

export default SendIconAction;