import { memo, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent } from '@mui/material';
import CustomizedDialogTitle from '../../../../General/Dialog/CustomizedDialogTitle';
import CustomizedDialogActions from '../../../../General/Dialog/CustomizedDialogActions';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { createServiceCategory } from '../../../../../redux/service/action';
import { toast } from 'react-toastify';
interface _IEditServiceCategory {
    open?: boolean,
    refresh?: any,
    onClose: Function
}

function CreateServiceCategory({
    open,
    refresh,
    onClose,
}: _IEditServiceCategory) {

    const dispatch = useDispatch();

    const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
    const delayCreate = useDelayLoading(loadingCreate);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            description: "",
        }
    });

    const handleUpdate = (data: any) => {
        dispatch(createServiceCategory(data, {
            loading: setLoadingCreate,
            onSuccess: () => {
                toast.success("Thêm mới thành công.");
                onClose && onClose();
                refresh && refresh();
            },
            onFailure: () => {
                toast.error("Thêm mới thất bại");
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
                title="Thêm mới loại dịch vụ"
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

export default memo(CreateServiceCategory);