import { memo, useEffect, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent } from '@mui/material';
import CustomizedDialogTitle from '../../../../General/Dialog/CustomizedDialogTitle';
import CustomizedDialogActions from '../../../../General/Dialog/CustomizedDialogActions';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import useRoomCategoryDetail from '../hooks/useRoomCategoryDetail';
import { updateRoomCategory } from '../../../../../redux/room/action';
import InvalidFeedback from '../../../../General/InvalidFeedback';
import VALIDATOR from '../../../Host/Farmstay/FarmstayDetail/action/validator';
interface EditRoomCategoryProps {
    open?: boolean,
    roomCategory?: any,
    refresh?: any,
    onClose: Function
}

function EditRoomCategory({
    open,
    roomCategory,
    refresh,
    onClose,
}: EditRoomCategoryProps) {

    const dispatch = useDispatch();

    const { detail, loading } = useRoomCategoryDetail(roomCategory?.id);
    const delay = useDelayLoading(loading);

    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const delayUpdate = useDelayLoading(loadingUpdate);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            description: "",
        }
    });

    const handleUpdate = (data: any) => {
        dispatch(updateRoomCategory(detail.id, data, {
            loading: setLoadingUpdate,
            onSuccess: () => {
                toast.success("Cập nhật thành công.");
                onClose && onClose();
                refresh && refresh();
            },
            onFailure: () => {
                toast.error("Cập nhật thất bại");
            }
        }))
    }

    const handleClose = () => {
        reset({
            name: "",
            description: "",
        })
        onClose && onClose();
    }

    useEffect(() => {
        if (detail) {
            reset({
                name: detail.name,
                description: detail.description
            })
        }
    }, [detail, reset, open])


    const renderSkeleton = () => (
        <Box height="258.6px">
            <img src={require("../../../../../assets/img/loader.svg").default} className="loader-img" alt="Loader" />
        </Box>
    )

    const renderContent = () => (
        <Form onSubmit={handleSubmit(handleUpdate)}>
            <FormGroup
                className={`form-group ${errors.name ? "has-danger" : ""}`}
            >
                <Form.Label className="form-label">
                    Tên
                </Form.Label>

                <Form.Control
                    autoFocus
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    {...register("name", {
                        validate: {
                            length: (value) => {
                                const message = VALIDATOR.isRequired(value) || VALIDATOR.isValidNameLength(value);

                                return message === VALIDATOR.NO_ERROR ? true : message;
                            }
                        }
                    })}
                />
                {errors.name
                    ? <InvalidFeedback message={errors.name.message} />
                    : null
                }
            </FormGroup>

            <FormGroup
                className={`form-group ${errors.description ? "has-danger" : ""}`}
            >
                <Form.Label className="form-label">
                    Mô tả
                </Form.Label>


                <textarea
                    rows={4}
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    {...register("description", {
                        validate: {
                            length: (value) => {
                                const message = VALIDATOR.isValidContentLength(value);

                                return message === VALIDATOR.NO_ERROR ? true : message;
                            }
                        }
                    })}
                />
                {errors.description
                    ? <InvalidFeedback message={errors.description.message} />
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
                title="Chỉnh sửa"
                onClose={handleClose}
            />
            <DialogContent>
                {delay ? renderSkeleton() : renderContent()}
            </DialogContent>

            <CustomizedDialogActions>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    disabled={delayUpdate}
                >
                    Hủy
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit(handleUpdate)}
                    disabled={delayUpdate}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        {delayUpdate
                            ? <CircularProgress size={16} thickness={4} sx={{ color: "#fff" }} />
                            : null
                        }
                        Lưu
                    </Box>

                </Button>
            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(EditRoomCategory);