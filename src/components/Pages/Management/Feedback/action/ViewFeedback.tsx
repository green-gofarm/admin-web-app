import { memo } from 'react'
import { Button } from 'react-bootstrap';
import { Box, Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogTitle from '../../../../General/Dialog/CustomizedDialogTitle';
import CustomizedDialogActions from '../../../../General/Dialog/CustomizedDialogActions';
import { createCodeString } from '../../../../../helpers/stringUtils';
import { getTimeAgoString } from '../../../../../helpers/dateUtils';

interface _IViewFeedback {
    open?: boolean,
    feedback?: any,
    refresh?: any,
    onClose: Function
}

function ViewFeedback({
    open,
    feedback,
    refresh,
    onClose,
}: _IViewFeedback) {

    const handleClose = () => {
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <CustomizedDialogTitle
                title="Chi tiết phản hồi"
                onClose={handleClose}
            />
            <DialogContent>
                <Box padding="1rem 0 0 0">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap="8px"
                                padding="4px"
                                className="tag tag-rounded"
                                marginRight="8px"
                            >
                                <i className='fa fa-user'></i>
                                {feedback?.user}
                            </Box>

                            <Box
                                display="flex"
                                alignItems="center"
                                gap="8px"
                                padding="4px"
                                className="tag tag-rounded"
                            >
                                Đơn:<b>{createCodeString("OD", feedback?.orderId)}</b>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box className="main-chat-time" >
                                <span>{getTimeAgoString(feedback?.createdDate)}</span>
                            </Box>
                            <Box className="main-msg-wrapper">
                                {feedback?.comment}
                            </Box>
                        </Grid>
                    </Grid>

                </Box>
            </DialogContent>

            <CustomizedDialogActions>
                <Button variant="primary" onClick={handleClose}>
                    Đóng
                </Button>
            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(ViewFeedback);