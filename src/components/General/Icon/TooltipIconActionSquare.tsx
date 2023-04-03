import { Box, IconButton, Tooltip } from '@mui/material';
import { MouseEventHandler } from 'react';
import makeStyles from '@mui/styles/makeStyles/makeStyles';

const useStyles = makeStyles({
    iconButton: {
        padding: "4px"
    },
    root: {
        background: '#fff',
        border: '1px solid #ededf5',
        borderRadius: '5px',
        color: '#7987a1',
        fontSize: '18px',
        lineHeight: '18px',
        padding: '8px 10px',
    },
})

interface TooltipIconActionSquareProps {
    title: string,
    icon: any,
    onClick?: MouseEventHandler<HTMLElement>,
}

function TooltipIconActionSquare({
    title,
    onClick,
    icon,
    ...props
}: TooltipIconActionSquareProps) {
    const classes = useStyles();

    return (
        <Tooltip title={title}>
            <span>
                <Box
                    component={IconButton}
                    onClick={onClick}
                    className={classes.root}
                    bgcolor="#fff"

                    {...props}
                >
                    {icon}
                </Box>
            </span>
        </Tooltip>
    )
}

export default TooltipIconActionSquare;