import { memo, useCallback, useMemo, useState } from 'react'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import SingleImageDropzone from '../ui-segment/SingleImageDropzone';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import VALIDATOR from './validator';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { createFarmstayServices, uploadImage } from '../../../../../../redux/farmstay/action';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Select from "react-select";
import useAllServiceCategories from '../../../../Management/ServiceCategory/hooks/useAllServiceCategories';
import CustomizedDialogTitle from '../../../../../General/Dialog/CustomizedDialogTitle';
import InvalidFeedback from '../../../../../General/InvalidFeedback';
import { SERVICE_CATEGORY_STATUSES } from '../../../../../../setting/service-category-setting';

interface CreateServiceProps {
    open?: boolean,
    onSuccessCallback?: any,
    onClose: () => void,
    farmstayId: any,
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

function CreateService({
    open,
    onSuccessCallback,
    onClose,
    farmstayId,
}: CreateServiceProps) {

    const dispatch = useDispatch();
    const categories = useAllServiceCategories();

    const categoryOptions = useMemo(() => {
        if (!isAvailableArray(categories)) return [];
        return categories
            .filter(item => item.status === SERVICE_CATEGORY_STATUSES.ACTIVE)
            .map((item: any) => ({ label: item.name, value: item.id }));
    }, [categories]);

    // State
    const [file, setFile] = useState<File | null>(null);

    // Redux
    const user = useSelector((state: RootState) => state.auth.user);

    const [service, setService] = useState<Service>({
        name: "",
        price: "",
        description: "",
        serviceCategory: null,
    })

    const [errors, setErrors] = useState<Errors>(initialErrors);

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleOnChange = useCallback((key: keyof Service, value: any) => {
        setService(prev => ({
            ...prev,
            [key]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [key]: "",
        }));
    }, []);

    const validate = (service: Service, file: File | null) => {
        const tempErrors: Errors = {
            name: VALIDATOR.isRequired(service.name) || VALIDATOR.isValidNameLength(service.name),
            description: VALIDATOR.isRequired(service.description) || VALIDATOR.isValidContentLength(service.description),
            price: VALIDATOR.isValidServicePrice(service.price),
            serviceCategory: VALIDATOR.isRequired(service.serviceCategory?.value) || VALIDATOR.isNumberString(service.serviceCategory?.value),
            file: file != null ? VALIDATOR.NO_ERROR : VALIDATOR.REQUIRED_MESSAGE,
        }

        setErrors(tempErrors);

        return Object.values(tempErrors).every(i => i === VALIDATOR.NO_ERROR);
    }

    const getNewFileLink = async (file: File) => {
        return new Promise<any>((resolve, rj) => {
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
        if (!validate(service, file)) return;
        if (!file) return;

        const price = service.price;
        if (!price) return;

        try {
            const linkNewFile = await getNewFileLink(file);

            const data = {
                image: linkNewFile,
                name: service.name,
                price: parseFloat(price),
                categoryId: service.serviceCategory?.value,
                description: service.description,
            }

            dispatch(createFarmstayServices(
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
            <CustomizedDialogTitle
                title='Thêm Dịch vụ'
                onClose={onClose}
            />

            <DialogContent>
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
                                ? <InvalidFeedback />
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
                                value={service.name ?? ""}
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
                                value={service.serviceCategory}
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
                                    value={service.price ?? ""}
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
                                value={service.description ?? ""}
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

export default memo(CreateService);