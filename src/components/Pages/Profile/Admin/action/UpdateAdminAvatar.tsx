import { memo, useMemo, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useCurrentUser from '../../../../../hooks/useCurrentUser';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { updateAdminMyProfile } from '../../../../../redux/user/action';
import SingleImageUpdate from '../../../Host/Farmstay/FarmstayDetail/ui-segment/SingleImageUpdate';
import { uploadImage } from '../../../../../redux/farmstay/action';
import { isAvailableArray } from '../../../../../helpers/arrayUtils';
import InvalidFeedback from '../../../../General/InvalidFeedback';
import CustomizedDialogTitle from '../../../../General/Dialog/CustomizedDialogTitle';
import CustomizedDialogActions from '../../../../General/Dialog/CustomizedDialogActions';

interface UpdateAdminAvatarProps {
    open?: boolean,
    onClose: () => void,
    onSuccessCallback?: any,
}

function UpdateAdminAvatar({
    open,
    onClose,
    onSuccessCallback,
}: UpdateAdminAvatarProps) {

    const dispatch = useDispatch();
    const user = useCurrentUser();

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const [file, setFile] = useState<File | null | any>(null);
    const [avatar, setAvatar] = useState<string | null>(user.avatar ?? null);

    const isDisableSubmit = useMemo(() => {
        if (delay) return true;
        if (avatar) return true;
        if (!file || file.error) return true;
        return false;
    }, [avatar, delay, file]);

    const processUpdate = (link: any) => {

        dispatch(updateAdminMyProfile(
            { avatar: link },
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
            }
        ))
    };

    const handleUpdate = () => {
        if (!file) return;

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
        <>
            <SingleImageUpdate
                file={file}
                setFile={setFile}
                link={avatar}
                clear={() => setAvatar(null)}
            />
            {file?.error
                ? <InvalidFeedback message={file.error} />
                : null
            }
        </>
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
                    disabled={isDisableSubmit}
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

export default memo(UpdateAdminAvatar);