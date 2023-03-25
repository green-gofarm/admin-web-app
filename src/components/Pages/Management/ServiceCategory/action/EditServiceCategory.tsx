import { memo, useEffect, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent } from '@mui/material';
import CustomizedDialogTitle from '../../../../General/Dialog/CustomizedDialogTitle';
import CustomizedDialogActions from '../../../../General/Dialog/CustomizedDialogActions';
import useServiceCategoryDetail from '../hooks/useServiceCategoryDetail';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { updateServiceCategory } from '../../../../../redux/service/action';
import { toast } from 'react-toastify';
interface _IEditServiceCategory {
    open?: boolean,
    serviceCategory?: any,
    refresh?: any,
    onClose: Function
}

function EditServiceCategory({
    open,
    serviceCategory,
    refresh,
    onClose,
}: _IEditServiceCategory) {

    const dispatch = useDispatch();

    const { detail, loading } = useServiceCategoryDetail(serviceCategory?.id);
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
        dispatch(updateServiceCategory(detail.id, data, {
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
        <Form className="">
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
                    {...register("name", { required: true })}
                />
                {errors.name
                    ? <div className="invalid-feedback">Thông tin bắt buộc.</div>
                    : null
                }
            </FormGroup>

            <FormGroup className="form-group ">
                <Form.Label className="form-label">
                    Mô tả
                </Form.Label>


                <textarea
                    className="form-control"
                    rows={4}
                    {...register("description")}
                />
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
                        Xác nhận
                    </Box>

                </Button>
            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(EditServiceCategory);