import { memo, useCallback, useMemo, useState } from 'react'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import SingleImageDropzone from '../ui-segment/SingleImageDropzone';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import VALIDATOR from './validator';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { createFarmstayRooms, uploadImage } from '../../../../../../redux/farmstay/action';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import useAllRoomCategories from '../../../../Management/RoomCategory/hooks/useAllRoomCategories';
import Select from "react-select";
import CustomizedDialogTitle from '../../../../../General/Dialog/CustomizedDialogTitle';
import InvalidFeedback from '../../../../../General/InvalidFeedback';
import { ROOM_STATUSES } from '../../../../../../setting/room-setting';

interface CreateRoomProps {
    open?: boolean,
    onSuccessCallback?: any,
    onClose: () => void,
    farmstayId: any,
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
    file: string,
    roomCategory: string,
}

const initialErrors: Errors = {
    name: '',
    price: '',
    description: '',
    file: '',
    roomCategory: ''
};

function CreateRoom({
    open,
    onSuccessCallback,
    onClose,
    farmstayId,
}: CreateRoomProps) {

    const dispatch = useDispatch();
    const categories = useAllRoomCategories();

    const categoryOptions: any[] = useMemo(() => {
        if (!isAvailableArray(categories)) return [];
        return categories
            .filter(item => item.status === ROOM_STATUSES.ACTIVE)
            .map((item: any) => ({ label: item.name, value: item.id }));
    }, [categories]);

    // State
    const [file, setFile] = useState<File | null>(null);

    // Redux
    const user = useSelector((state: RootState) => state.auth.user);

    const [room, setRoom] = useState<Room>({
        name: "",
        price: "",
        description: "",
        roomCategory: null,
    })

    const [errors, setErrors] = useState<Errors>(initialErrors);

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleOnChange = useCallback((key: keyof Room, value: any) => {
        setRoom(prev => ({
            ...prev,
            [key]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [key]: "",
        }));
    }, []);

    const validate = (room: Room, file: File | null) => {
        const tempErrors: Errors = {
            name: VALIDATOR.isRequired(room.name),
            description: VALIDATOR.isRequired(room.description),
            price: VALIDATOR.isValidRoomPrice(room.price),
            roomCategory: VALIDATOR.isRequired(room.roomCategory?.value) || VALIDATOR.isNumberString(room.roomCategory?.value),
            file: file != null ? VALIDATOR.NO_ERROR : VALIDATOR.REQUIRED_MESSAGE,
        }

        setErrors(tempErrors);

        return Object.values(tempErrors).every(i => i === VALIDATOR.NO_ERROR);
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
        if (!validate(room, file)) return;
        if (!file) return;

        const price = room.price;
        if (!price) return;

        try {
            const linkNewFile = await getNewFileLink(file);
            const images = preparedImagesData(linkNewFile);

            const data = {
                images,
                name: room.name,
                price: parseFloat(price),
                roomCategoryId: room.roomCategory?.value,
                description: room.description,
            }

            dispatch(createFarmstayRooms(
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
                title='Thêm phòng'
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
                                Tên phòng *
                            </Form.Label>
                            <Form.Control
                                aria-label="name"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                type="text"
                                autoFocus
                                value={room.name ?? ""}
                                onChange={(e) => handleOnChange("name", e.target.value ?? "")}
                            />
                            {errors.name
                                ? <InvalidFeedback />
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
                                value={room.roomCategory}
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
                                    value={room.price ?? ""}
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
                                value={room.description ?? ""}
                                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                onChange={(e) => handleOnChange("description", e.target.value ?? "")}
                            />
                            {errors.description
                                ? <InvalidFeedback />
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

export default memo(CreateRoom);