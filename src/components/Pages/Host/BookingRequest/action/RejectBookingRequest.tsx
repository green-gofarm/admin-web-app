import { memo, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent } from '@mui/material';
import CustomizedDialogTitle from '../../../../General/Dialog/CustomizedDialogTitle';
import CustomizedDialogActions from '../../../../General/Dialog/CustomizedDialogActions';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import InvalidFeedback from '../../../../General/InvalidFeedback';
import { reviewBooking } from '../../../../../redux/order/action';
import { ORDER_STATUSES } from '../../../../../setting/order-setting';
import useCurrentUser from '../../../../../hooks/useCurrentUser';
interface RejectBookingProps {
    open?: boolean,
    booking?: any,
    onSuccessCallback?: any,
    onClose: Function
}

function RejectBooking({
    open,
    booking,
    onSuccessCallback,
    onClose,
}: RejectBookingProps) {

    const dispatch = useDispatch();

    const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
    const delayCreate = useDelayLoading(loadingCreate);

    const user = useCurrentUser();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            extras: "",
        }
    });

    const handleUpdate = (data: any) => {
        dispatch(reviewBooking(
            user.id,
            booking?.id,
            {
                extras: data.extras,
                bookingStatus: ORDER_STATUSES.REJECTED
            },
            {
                loading: setLoadingCreate,
                onSuccess: () => {
                    toast.success("Cập nhật thành công.");
                    onClose && onClose();
                    onSuccessCallback && onSuccessCallback();
                },
                onFailure: () => {
                    toast.error("Cập nhật thất bại");
                }
            })
        )
    }

    const handleClose = () => {
        reset({ extras: "" })
        onClose && onClose();
    }

    const renderContent = () => (
        <Form className="">
            <FormGroup
                className={`form-group ${errors.extras ? "has-danger" : ""}`}
            >
                <Form.Label className="form-label">
                    Lý do từ chối
                </Form.Label>

                <textarea
                    className={`form-control ${errors.extras ? "is-invalid" : ""}`}
                    autoFocus
                    rows={4}
                    {...register("extras", { required: true })}
                />

                {errors.extras
                    ? <InvalidFeedback />
                    : null
                }
            </FormGroup>
        </Form>
    )

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <CustomizedDialogTitle
                title="Từ chối booking"
                onClose={handleClose}
            />
            <DialogContent>
                {renderContent()}
            </DialogContent>

            <CustomizedDialogActions>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    disabled={delayCreate}
                >
                    Hủy
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit(handleUpdate)}
                    disabled={delayCreate}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        {delayCreate
                            ? <CircularProgress size={16} thickness={4} sx={{ color: "#fff" }} />
                            : null
                        }
                        Xác nhận
                    </Box>

                </Button>
            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(RejectBooking);