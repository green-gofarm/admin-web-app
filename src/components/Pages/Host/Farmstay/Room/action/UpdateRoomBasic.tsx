import { memo, useCallback, useMemo, useState } from 'react'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateFarmstayRooms } from '../../../../../../redux/farmstay/action';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import useAllRoomCategories from '../../../../Management/RoomCategory/hooks/useAllRoomCategories';
import Select from "react-select";
import CustomizedDialogTitle from '../../../../../General/Dialog/CustomizedDialogTitle';
import InvalidFeedback from '../../../../../General/InvalidFeedback';
import VALIDATOR from '../../FarmstayDetail/action/validator';

interface CreateRoomProps {
    open?: boolean,
    onSuccessCallback?: any,
    onClose: () => void,
    room: any,
}

type Room = {
    name: string | null,
    price: string | null,
    description: string | null,
    roomCategory: any | null,
}

interface Errors {
    name: string,
    price: string,
    description: string,
    roomCategory: string,
}

const initialErrors: Errors = {
    name: '',
    price: '',
    description: '',
    roomCategory: ''
};

function UpdateRoomBasic({
    open,
    onSuccessCallback,
    onClose,
    room,
}: CreateRoomProps) {

    const dispatch = useDispatch();
    const categories = useAllRoomCategories();

    const categoryOptions = useMemo(() => {
        if (!isAvailableArray(categories)) return [];
        return categories.map((item: any) => ({ label: item.name, value: item.id }));
    }, [categories]);

    // Redux
    const user = useSelector((state: RootState) => state.auth.user);

    const [data, setData] = useState<Room>({
        name: room?.name ?? "",
        price: "" + (room?.price ?? ""),
        description: room?.description ?? "",
        roomCategory: categoryOptions.find((item: any) => item.value === room?.roomCategoryId) ?? null,
    })

    const [errors, setErrors] = useState<Errors>(initialErrors);

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleOnChange = useCallback((key: keyof Room, value: any) => {
        setData(prev => ({
            ...prev,
            [key]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [key]: "",
        }));
    }, []);

    const validate = (data: Room) => {
        const tempErrors: Errors = {
            name: VALIDATOR.isRequired(data.name) || VALIDATOR.isValidNameLength(data.name),
            description: VALIDATOR.isRequired(data.description) || VALIDATOR.isValidContentLength(data.description),
            price: VALIDATOR.isValidRoomPrice(data.price),
            roomCategory: VALIDATOR.isRequired(data.roomCategory?.value) || VALIDATOR.isNumberString(data.roomCategory?.value),
        }

        setErrors(tempErrors);

        return Object.values(tempErrors).every(i => i === VALIDATOR.NO_ERROR);
    }

    const handleSubmit = async () => {
        if (!user?.id) return;
        if (!room?.farmstayId) return;
        if (!room?.id) return;
        if (!validate(data)) return;

        const price = data.price;
        if (!price) return;

        try {
            const prepareData = {
                name: data.name,
                price: parseFloat(price),
                roomCategoryId: data.roomCategory?.value,
                description: data.description,
            }

            dispatch(updateFarmstayRooms(
                user.id,
                room.farmstayId,
                room.id,
                prepareData,
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
                title='Cập nhật thông tin'
                onClose={onClose}
            />
            <DialogContent>
                <Grid container spacing={0} columnSpacing={2}>
                    <Grid item xs={12}>
                        <FormGroup className="has-danger">
                            <Form.Label>
                                Tên phòng *
                            </Form.Label>
                            <Form.Control
                                aria-label="name"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                type="text"
                                autoFocus
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
                                Loại phòng *
                            </Form.Label>
                            <Select
                                value={data.roomCategory}
                                onChange={(option) => handleOnChange("roomCategory", option)}
                                options={categoryOptions}
                                placeholder=""
                                isSearchable
                                isClearable
                                menuPosition="fixed"
                                className="formselect"
                            // menuPortalTarget={document.body}
                            />
                            {errors.roomCategory
                                ? <InvalidFeedback />
                                : null
                            }
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormGroup className="has-danger">
                            <Form.Label>
                                Giá phòng * (1 ngày)
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

export default memo(UpdateRoomBasic);