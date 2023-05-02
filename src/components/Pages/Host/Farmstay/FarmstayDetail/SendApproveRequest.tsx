import { memo, useState } from 'react'
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import { Button } from 'react-bootstrap';
import CustomizedDialogTitle from '../../../../General/Dialog/CustomizedDialogTitle';
import CustomizedDialogActions from '../../../../General/Dialog/CustomizedDialogActions';
import { activityCriteriaObj, farmstayCriteriaObj, policyCriteriaObj, roomCriteriaObj, serviceCriteriaObj } from '../../../Management/Farmstay/action/ApproveFarmstay';
import { useDispatch } from 'react-redux';
import useCurrentUser from '../../../../../hooks/useCurrentUser';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { FARMSTAY_STATUSES } from '../../../../../setting/farmstay-setting';
import { toast } from 'react-toastify';
import { updateFarmstay } from '../../../../../redux/farmstay/action';

const renderRule = (criteria: { [key: string]: boolean }) => {
    return Object.entries(criteria).map(([criterion]) => (
        <Box
            component="div"
            marginTop="4px"
            color="#7987a1"
        >
            {`- ${criterion}`}
        </Box>
    ));
};

interface SendApproveRequestProps {
    open?: boolean,
    farmstay: any,
    onSuccessCallback?: any,
    onClose: () => void
}

function SendApproveRequest({
    open,
    farmstay,
    onSuccessCallback,
    onClose,
}: SendApproveRequestProps) {


    const [farmstayDetailCriteria] = useState<{ [key: string]: boolean }>(farmstayCriteriaObj);
    const [activityCriteria] = useState<{ [key: string]: boolean }>(activityCriteriaObj);
    const [roomCriteria] = useState<{ [key: string]: boolean }>(roomCriteriaObj);
    const [serviceCriteria] = useState<{ [key: string]: boolean }>(serviceCriteriaObj);
    const [policyCriteria] = useState<{ [key: string]: boolean }>(policyCriteriaObj);

    const renderContent = () => (
        <Grid
            container
            spacing={1}
            sx={{ padding: "1rem" }}
        >
            <Grid item xs={12}>
                <Box
                    component="h3"
                    textAlign="center"
                >
                    Tiêu chí để phê duyệt farmstay
                </Box>
            </Grid>
            <Grid item xs={12}>
                <h5>1. Farmstay cần có đầy đủ thông tin</h5>
                {renderRule(farmstayDetailCriteria)}
            </Grid>
            <Grid item xs={12}>
                <h5>2. Tiêu chí về hoạt động trong farmstay</h5>
                {renderRule(activityCriteria)}
            </Grid>
            <Grid item xs={12}>
                <h5>3. Tiêu chí về phòng trong farmstay</h5>
                {renderRule(roomCriteria)}
            </Grid>
            <Grid item xs={12}>
                <h5>4. Tiêu chí về dịch vụ</h5>
                {renderRule(serviceCriteria)}
            </Grid>
            <Grid item xs={12}>
                <h5>5. Tiêu chí về quy định</h5>
                {renderRule(policyCriteria)}
            </Grid>
        </Grid>
    )

    const dispatch = useDispatch();
    const user = useCurrentUser();

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        if (!farmstay?.id) return;
        if (!user?.id) return;

        dispatch(updateFarmstay(
            user.id,
            farmstay.id,
            {
                status: FARMSTAY_STATUSES.PENDING,
                extras: ""
            },
            {
                loading: setLoading,
                onSuccess: () => {
                    toast.success("Gửi yêu cầu thành công");
                    onClose && onClose();
                    onSuccessCallback && onSuccessCallback();
                },
                onFailure: () => {
                    toast.error("Gửi yêu cầu thất bại");
                }
            }
        ))
    }

    const handleClose = () => {
        onClose && onClose();
    }

    return (
        <Dialog
            open={Boolean(open)}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <CustomizedDialogTitle
                title='Tiêu chí đánh giá'
                onClose={onClose}
            />
            <DialogContent>
                {renderContent()}
            </DialogContent>

            <CustomizedDialogActions>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    disabled={delay}
                >
                    Hủy
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        {delay
                            ? <CircularProgress size={16} thickness={4} sx={{ color: "#fff" }} />
                            : null
                        }
                        Gửi yêu cầu
                    </Box>
                </Button>
            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(SendApproveRequest);