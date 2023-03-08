import MuiIcon from './MuiIcon';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Box, IconButton, IconTypeMap, Tooltip } from '@mui/material';
import { MouseEventHandler } from 'react';
import makeStyles from '@mui/styles/makeStyles/makeStyles';

const useStyles = makeStyles({
    iconButton: {
        padding: "4px"
    },
    muiIcon: {
        background: "#fff",
        color: "#333",
        padding: "6px",
        borderRadius: "50%",
        border: "1px solid #e3e3e3",
        width: 28,
        height: 28,
    }
})

interface ITooltipIconAction {
    title: string,
    Icon: OverridableComponent<IconTypeMap> | any,
    IconProps?: any,
    isCustom?: boolean,
    onClick?: MouseEventHandler<HTMLElement>,
}

function TooltipIconAction({
    title,
    onClick,
    Icon,
    IconProps,
    isCustom,
    ...props
}: ITooltipIconAction) {
    const classes = useStyles();

    return (
        <Tooltip title={title}>
            <span>
                <Box
                    component={IconButton}
                    onClick={onClick}
                    className={classes.iconButton}
                    bgcolor="#fff"

                    {...props}
                >
                    {Boolean(isCustom)
                        ? Icon
                        : <MuiIcon
                            Icon={Icon}
                            {...{
                                ...IconProps ?? {},
                                className: classes.muiIcon + " " + (IconProps?.className ?? "")
                            }}
                        />
                    }
                </Box>
            </span>
        </Tooltip>
    )
}

export default TooltipIconAction;