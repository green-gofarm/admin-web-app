import React, { ReactNode } from 'react'
import { DialogActions } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    root: {
        borderTop: "1px solid #ededf5"
    },
    wrapper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gridGap: "0.5rem",
    }
}));

interface ICustomizedDialogActions {
    children: ReactNode
}

export default function CustomizedDialogActions({
    children,
    ...props
}: ICustomizedDialogActions) {

    const classes = useStyles();

    return (
        <DialogActions className={classes.root} {...props}>
            <div className={classes.wrapper}>
                {children}
            </div>
        </DialogActions>
    )
}
