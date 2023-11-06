import { memo, useCallback, useMemo, useState } from 'react'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import VALIDATOR from './validator';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateFarmstayServices, uploadImage } from '../../../../../../redux/farmstay/action';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Select from "react-select";
import useAllServiceCategories from '../../../../Management/ServiceCategory/hooks/useAllServiceCategories';
import CustomizedDialogTitle from '../../../../../General/Dialog/CustomizedDialogTitle';
import SingleImageUpdate from '../ui-segment/SingleImageUpdate';
import InvalidFeedback from '../../../../../General/InvalidFeedback';

interface UpdateServiceProps {
    open?: boolean,
    onSuccessCallback?: any,
    onClose: () => void,
    service: any,
}

type Service = {
    name: string | null,
    price: string | null,
    description: string | null,
    serviceCategory: any | null,
}

interface Errors {
    name: string,
    price: string,
    description: string,
    file: string,
    serviceCategory: string,
}

const initialErrors: Errors = {
    name: '',
    price: '',
    description: '',
    file: '',
    serviceCategory: ''
};

function UpdateService({
    open,
    onSuccessCallback,
    onClose,
    service,
}: UpdateServiceProps) {

    const dispatch = useDispatch();
    const categories = useAllServiceCategories();

    const categoryOptions = useMemo(() => {
        if (!isAvailableArray(categories)) return [];
        return categories.map((item: any) => ({ label: item.name, value: item.id }));
    }, [categories]);

    // State
    const [avatar, setAvatar] = useState<string | null>(service?.image ?? null);
    const [file, setFile] = useState<File | null | any>(null);

    // Redux
    const user = useSelector((state: RootState) => state.auth.user);

    const [data, setData] = useState<Service>({
        name: service?.name ?? "",
        price: "" + (service?.price ?? ""),
        description: service?.description ?? "",
        serviceCategory: categoryOptions.find((item: any) => item.value === service?.categoryId) ?? null,
    })

    const [errors, setErrors] = useState<Errors>(initialErrors);

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleOnChange = useCallback((key: keyof Service, value: any) => {
        setData(prev => ({
            ...prev,
            [key]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [key]: "",
        }));
    }, []);

    const validate = (data: Service, file: File | null) => {
        const tempErrors: Errors = {
            name: VALIDATOR.isRequired(data.name),
            description: VALIDATOR.isRequired(data.description) || VALIDATOR.isValidContentLength(data.description),
            price: VALIDATOR.isValidServicePrice(data.price),
            serviceCategory: VALIDATOR.isRequired(data.serviceCategory?.value) || VALIDATOR.isNumberString(data.serviceCategory?.value),
            file: (() => {
                if (avatar) return VALIDATOR.NO_ERROR;
                if (file) return VALIDATOR.NO_ERROR;
                return VALIDATOR.REQUIRED_MESSAGE;
            })(),
        }

        setErrors(tempErrors);

        return Object.values(tempErrors).every(i => i === VALIDATOR.NO_ERROR);
    }

    const getNewFileLink = async (file: File | null) => {
        return new Promise<any>((resolve, rj) => {
            if (avatar) {
                resolve(avatar);
                return
            }
            if (!file) {
                rj("Error");
                return;
            }

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
        if (!service?.id) return;
        if (!service?.farmstayId) return;
        if (!validate(data, file)) return;

        const price = data.price;
        if (!price) return;

        try {
            const newLink = await getNewFileLink(file);

            const preparedData = {
                image: newLink,
                name: data.name,
                price: parseFloat(price),
                categoryId: data.serviceCategory?.value,
                description: data.description,
            }

            dispatch(updateFarmstayServices(
                user.id,
                service.farmstayId,
                service.id,
                preparedData,
                {
                    loading: setLoading,
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
        } catch (error) {
            console.log(error);
            toast.error("Cập nhật thất bại");
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
            <CustomizedDialogTitle
                title='Cập nhật'
                onClose={onClose}
            />

            <DialogContent>
                <Grid container spacing={0} columnSpacing={2}>
                    <Grid item xs={12}>
                        <FormGroup className="has-danger">
                            <Form.Label>
                                Ảnh đại diện *
                            </Form.Label>
                            <SingleImageUpdate
                                file={file}
                                setFile={setFile}
                                link={avatar}
                                clear={() => setAvatar(null)}
                            />
                            {errors.file || file?.error
                                ? <InvalidFeedback message={file?.error || errors.file} />
                                : null
                            }
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <FormGroup className="has-danger">
                            <Form.Label>
                                Tên dịch vụ *
                            </Form.Label>
                            <Form.Control
                                aria-label="name"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                type="text"
                                value={data.name ?? ""}
                                onChange={(e) => handleOnChange("name", e.target.value ?? "")}
                            />
                            {errors.name
                                ? <InvalidFeedback message={errors.name} />
                                : null
                            }
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormGroup className="has-danger">
                            <Form.Label>
                                Loại dịch vụ *
                            </Form.Label>
                            <Select
                                value={data.serviceCategory}
                                onChange={(option) => handleOnChange("serviceCategory", option)}
                                options={categoryOptions}
                                placeholder=""
                                isSearchable
                                isClearable
                                menuPosition="fixed"
                                className="formselect"
                            // menuPortalTarget={document.body}
                            />
                            {errors.serviceCategory
                                ? <InvalidFeedback />
                                : null
                            }
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormGroup className="has-danger">
                            <Form.Label>
                                Giá dịch vụ *
                            </Form.Label>
                            <InputGroup className="input-group mb-3">
                                <Form.Control
                                    aria-label=""
                                    className={`form-control ${errors.price ? "is-invalid" : ""}`}
                                    type="number"
                                    value={data.price ?? ""}
                                    onChange={(e) => handleOnChange("price", e.target.value ?? "")}
                                />
                                <InputGroup.Text className="input-group-text">
                                    đ
                                </InputGroup.Text>
                            </InputGroup>
                            {errors.price
                                ? <InvalidFeedback message={errors.price} />
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
                                onChange={(e) => handleOnChange("description", e.target.value ?? "")}
                            />
                            {errors.description
                                ? <InvalidFeedback message={errors.description} />
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
                    disabled={delay || file?.error}
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

export default memo(UpdateService);