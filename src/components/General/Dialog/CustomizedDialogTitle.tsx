import { Box, DialogTitle, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface ICustomizedDialogTitle {
    title?: string,
    onClose?: () => void,
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
        >
            <Box className="card-title m-0">
                {title}
            </Box>

            <Tooltip title="Đóng">
                <CloseIcon
                    sx={{
                        cursor: "pointer",
                        width: 20,
                        height: 20,
                    }}
                    onClick={onClose}
                />
            </Tooltip>
        </DialogTitle>
    )
}
