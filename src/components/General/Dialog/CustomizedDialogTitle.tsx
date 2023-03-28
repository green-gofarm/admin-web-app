import { Box, DialogTitle } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import TooltipIconAction from '../Icon/TooltipIconAction';

interface ICustomizedDialogTitle {
    title?: string,
    onClose: any,
}

export default function CustomizedDialogTitle({
    title = "",
    onClose,
}: ICustomizedDialogTitle) {
    return (
        <DialogTitle
            component={Box}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            margin="0"
            borderBottom="1px solid #ededf5"
        >
            <Box className="card-title">
                {title}
            </Box>

            <Box marginRight="-4px">
                <TooltipIconAction
                    title="Đóng"
                    Icon={CloseIcon}
                    onClick={onClose}
                />
            </Box>
        </DialogTitle>
    )
}
