import { memo, useCallback, useState } from 'react'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import VALIDATOR from './validator';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { createFarmstayActivities, updateFarmstayActivities, uploadImage } from '../../../../../../redux/farmstay/action';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

interface UpdateActivityBasicInfoProps {
    open?: boolean,
    onSuccessCallback?: any,
    onClose: Function,
    activity: any,
}

type Activity = {
    name: string | null,
    price: string | null,
    description: string | null,
    slot: string | null
}

interface Errors {
    name: string,
    price: string,
    slot: string | null,
    description: string,
}

const initialErrors: Errors = {
    name: '',
    price: '',
    slot: '',
    description: '',
};

function UpdateActivityBasicInfo({
    open,
    onSuccessCallback,
    onClose,
    activity,
}: UpdateActivityBasicInfoProps) {

    const dispatch = useDispatch();

    // Redux
    const user = useSelector((state: RootState) => state.auth.user);

    const [data, setData] = useState<Activity>({
        name: "",
        price: "",
        slot: "",
        description: "",
    })

    const [errors, setErrors] = useState<Errors>(initialErrors);

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleOnChangeAddress = useCallback((key: keyof Activity, value: any) => {
        setData(prev => ({
            ...prev,
            [key]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [key]: "",
        }));
    }, []);

    const validate = (data: Activity) => {
        const tempActivityError: Errors = {
            name: VALIDATOR.isRequired(data.name),
            description: VALIDATOR.isRequired(data.description),
            price: VALIDATOR.isRequired(data.price) || VALIDATOR.isNumberString(data.price),
            slot: VALIDATOR.isRequired(data.price) || VALIDATOR.isNumberString(data.price),
        }

        setErrors(tempActivityError);

        return Object.values(tempActivityError).every(i => i === VALIDATOR.NO_ERROR);
    }

    const handleSubmit = async () => {
        if (!user?.id) return;
        if (!activity?.farmstayId) return;
        if (!activity?.id) return;
        if (!validate(data)) return;

        const price = data.price;
        const slot = data.slot;
        if (!price) return;
        if (!slot) return;

        try {

            const preparedData = {
                name: data.name,
                price: parseFloat(price),
                slot: parseInt(slot),
                description: data.description,
            }

            dispatch(updateFarmstayActivities(
                user.id,
                activity.farmstayId,
                activity.id,
                preparedData,
                {
                    loading: setLoading,
                    onSuccess: () => {
                        toast.success("Thêm mới thành công.");
                        onClose && onClose();
                        onSuccessCallback && onSuccessCallback();
                    },
                    onFailure: () => {
                        toast.error("Thêm mới thất bại");
                    }
                })
            )
        } catch (error) {
            console.log(error);
            toast.error("Thêm mới thất bại");
        }
    }

    const handleClose = () => {
        onClose && onClose();
    }

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >
            <DialogContent>
                <Box className='card-title mb-2'>
                    Cập nhật thông tin
                </Box>
                <Grid container spacing={0} columnSpacing={2}>
                    <Grid item xs={12}>
                        <FormGroup className="has-danger">
                            <Form.Label>
                                Tên hoạt động *
                            </Form.Label>
                            <Form.Control
                                aria-label="Activity name"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                type="text"
                                value={data.name ?? ""}
                                onChange={(e) => handleOnChangeAddress("name", e.target.value ?? "")}
                            />
                            {errors.name
                                ? <div className="invalid-feedback">Thông tin bắt buộc.</div>
                                : null
                            }
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormGroup className="has-danger">
                            <Form.Label>
                                Số người trên 1 lượt *
                            </Form.Label>
                            <InputGroup className="input-group mb-3">
                                <Form.Control
                                    aria-label=""
                                    className={`form-control ${errors.slot ? "is-invalid" : ""}`}
                                    type="number"
                                    value={data.slot ?? ""}
                                    onChange={(e) => handleOnChangeAddress("slot", e.target.value ?? "")}
                                />
                            </InputGroup>
                            {errors.slot
                                ? <div className="invalid-feedback">Thông tin bắt buộc.</div>
                                : null
                            }
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormGroup className="has-danger">
                            <Form.Label>
                                Đơn giá *
                            </Form.Label>
                            <InputGroup className="input-group mb-3">
                                <Form.Control
                                    aria-label=""
                                    className={`form-control ${errors.price ? "is-invalid" : ""}`}
                                    type="number"
                                    value={data.price ?? ""}
                                    onChange={(e) => handleOnChangeAddress("price", e.target.value ?? "")}
                                />
                                <InputGroup.Text className="input-group-text">
                                    đ
                                </InputGroup.Text>
                            </InputGroup>
                            {errors.price
                                ? <div className="invalid-feedback">Thông tin bắt buộc.</div>
                                : null
                            }
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <FormGroup className="has-danger">
                            <Form.Label>
                                Mô tả *
                            </Form.Label>
                            <textarea
                                rows={3}
                                required
                                placeholder='Mô tả'
                                value={data.description ?? ""}
                                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                onChange={(e) => handleOnChangeAddress("description", e.target.value ?? "")}
                            />
                            {errors.description
                                ? <div className="invalid-feedback">Thông tin bắt buộc.</div>
                                : null
                            }
                        </FormGroup>
                    </Grid>
                </Grid>
            </DialogContent >

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
                    disabled={delay}
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
                        Lưu lại
                    </Box>

                </Button>
            </CustomizedDialogActions>
        </Dialog >
    )
}

export default memo(UpdateActivityBasicInfo);