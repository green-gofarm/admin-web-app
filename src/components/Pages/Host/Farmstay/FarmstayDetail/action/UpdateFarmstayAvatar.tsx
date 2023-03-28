import { memo, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateFarmstay, uploadImage } from '../../../../../../redux/farmstay/action';
import useFarmstayImages from '../../../../Management/Farmstay/FarmstayDetail/hooks/useFarmstayImages';
import { cloneDeep } from 'lodash';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import SingleImageDropzone from '../ui-segment/SingleImageDropzone';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import CustomizedDialogTitle from '../../../../../General/Dialog/CustomizedDialogTitle';

interface UpdateFarmstayAvatarProps {
    open?: boolean,
    farmstay?: any,
    onClose: () => void,
    onSuccessCallback?: any,
}

function UpdateFarmstayAvatar({
    open,
    farmstay,
    onClose,
    onSuccessCallback,
}: UpdateFarmstayAvatarProps) {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const images = useFarmstayImages(farmstay);

    const [file, setFile] = useState<File | null>(null);

    const preparedImages = (link: any) => {
        const newData = images ? cloneDeep(images) : {
            avatar: null,
            others: []
        }

        newData.avatar = link;
        return JSON.stringify(newData);
    }

    const processUpdate = (link: any) => {
        const json = preparedImages(link);

        dispatch(updateFarmstay(
            user?.id,
            farmstay?.id,
            { images: json },
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
    };

    const handleUpdate = () => {
        if (!file) return;
        if (!user?.id) return;
        if (!farmstay?.id) return;

        const formData = new FormData();
        formData.set("files", file);

        dispatch(uploadImage(formData, {
            loading: setLoading,
            onSuccess: (response: any) => {
                if (isAvailableArray(response?.data)) {
                    const avatar = response.data[0];
                    processUpdate(avatar);
                    return;
                }
                toast.error("Có lỗi xảy ra");
            },
            onFailure: () => {
                toast.error("Có lỗi xảy ra");
            }
        }))
    }

    const handleClose = () => {
        onClose && onClose();
    }

    const renderContent = () => (
        <SingleImageDropzone
            file={file}
            setFile={setFile}
        />
    )

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <CustomizedDialogTitle
                title='Ảnh đại diện'
                onClose={onClose}
            />
            <DialogContent>
                {renderContent()}
            </DialogContent>

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
                    onClick={handleUpdate}
                    disabled={delay || !file}
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
        </Dialog>
    )
}

export default memo(UpdateFarmstayAvatar);