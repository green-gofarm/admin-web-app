import { memo, useCallback, useState } from 'react'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import SingleImageDropzone from '../ui-segment/SingleImageDropzone';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import VALIDATOR from './validator';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { createFarmstayActivities, uploadImage } from '../../../../../../redux/farmstay/action';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

interface CreateActivityProps {
    open?: boolean,
    onSuccessCallback?: any,
    onClose: Function,
    farmstayId: any,
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
    file: string
}

const initialErrors: Errors = {
    name: '',
    price: '',
    slot: '',
    description: '',
    file: ''
};

function CreateActivity({
    open,
    onSuccessCallback,
    onClose,
    farmstayId,
}: CreateActivityProps) {

    const dispatch = useDispatch();

    // State
    const [file, setFile] = useState<File | null>(null);

    // Redux
    const user = useSelector((state: RootState) => state.auth.user);

    const [activity, setActivity] = useState<Activity>({
        name: "",
        price: "",
        slot: "",
        description: "",
    })

    const [errors, setErrors] = useState<Errors>(initialErrors);

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleOnChangeAddress = useCallback((key: keyof Activity, value: any) => {
        setActivity(prev => ({
            ...prev,
            [key]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [key]: "",
        }));
    }, []);

    const validate = (activity: Activity, file: File | null) => {
        const tempActivityError: Errors = {
            name: VALIDATOR.isRequired(activity.name),
            description: VALIDATOR.isRequired(activity.description),
            price: VALIDATOR.isRequired(activity.price) || VALIDATOR.isNumberString(activity.price),
            slot: VALIDATOR.isRequired(activity.price) || VALIDATOR.isNumberString(activity.price),
            file: file != null ? VALIDATOR.NO_ERROR : VALIDATOR.REQUIRED_MESSAGE,
        }

        setErrors(tempActivityError);

        return Object.values(tempActivityError).every(i => i === VALIDATOR.NO_ERROR);
    }

    const preparedImagesData = (link: any) => {
        const newData = {
            avatar: link,
            others: []
        }

        return JSON.stringify(newData);
    }

    const getNewFileLink = async (file: File) => {
        return new Promise<any[]>((resolve, rj) => {
            const formData = new FormData();
            formData.append("files", file);

            dispatch(uploadImage(
                formData,
                {
                    loading: setLoading,
                    onSuccess: (response: any) => {
                        if (isAvailableArray(response?.data)) {
                            const link = response.data[0];
                            resolve(link);
                            return;
                        }
                    },
                    onFailure: (error: any) => {
                        rj("Có lỗi xảy ra: Upload failed");
                    }
                }
            ));
        })
    }

    const handleSubmit = async () => {
        if (!user?.id) return;
        if (!farmstayId) return;
        if (!validate(activity, file)) return;
        if (!file) return;

        const price = activity.price;
        const slot = activity.slot;
        if (!price) return;
        if (!slot) return;

        try {
            const linkNewFile = await getNewFileLink(file);
            const images = preparedImagesData(linkNewFile);

            const data = {
                images,
                name: activity.name,
                price: parseFloat(price),
                slot: parseInt(slot),
                description: activity.description,
                tags: []
            }

            dispatch(createFarmstayActivities(
                user.id,
                farmstayId,
                data,
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
                    Thêm hoạt động mới
                </Box>
                <Grid container spacing={0} columnSpacing={2}>
                    <Grid item xs={12}>
                        <FormGroup className="has-danger">
                            <Form.Label>
                                Ảnh đại diện *
                            </Form.Label>
                            <SingleImageDropzone
                                file={file}
                                setFile={setFile}
                            />
                            {errors.file
                                ? <div className="invalid-feedback">Thông tin bắt buộc.</div>
                                : null
                            }
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <FormGroup className="has-danger">
                            <Form.Label>
                                Tên hoạt động *
                            </Form.Label>
                            <Form.Control
                                aria-label="Activity name"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                type="text"
                                value={activity.name ?? ""}
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
                                    value={activity.slot ?? ""}
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
                                    value={activity.price ?? ""}
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
                                value={activity.description ?? ""}
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

export default memo(CreateActivity);