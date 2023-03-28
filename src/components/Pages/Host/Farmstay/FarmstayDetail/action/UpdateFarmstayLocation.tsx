import { memo, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateFarmstay } from '../../../../../../redux/farmstay/action';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import { Location } from '../../create-farmstay/CreateFarmstay';
import IconLabelDetail from '../../../../../General/Item/IconLabelDetail';
import CustomizedMap from '../../create-farmstay/ui-segment/CustomizedMap';

interface UpdateFarmstayLocationProps {
    open?: boolean,
    farmstay?: any,
    onClose: () => void,
    onSuccessCallback?: any,
}

function UpdateFarmstayLocation({
    open,
    farmstay,
    onClose,
    onSuccessCallback,
}: UpdateFarmstayLocationProps) {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const [location, setLocation] = useState<Location>({
        lat: farmstay?.latitude,
        lng: farmstay?.longitude
    })

    const handleUpdate = () => {
        if (!location.lat || !location.lng) return;
        if (!user?.id) return;
        if (!farmstay?.id) return;


        dispatch(updateFarmstay(
            user.id,
            farmstay.id,
            {
                latitude: location.lat,
                longitude: location.lng
            },
            {
                loading: setLoading,
                onSuccess: (response: any) => {
                    toast.error("Cập nhật vị trí thành công.");
                },
                onFailure: () => {
                    toast.error("Cập nhật vị trí thất bại");
                }
            }))
    }

    const handleClose = () => {
        onClose && onClose();
    }

    const renderContent = () => (
        <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
        >
            <Box className='h5 card-title mb-0'>
                Vị trí farmstay
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        gap="8px"
                        flexWrap="wrap"
                    >
                        <IconLabelDetail
                            icon={<i className='fa fa-map-marker'></i>}
                            label="Kinh độ"
                            value={location.lng ?? <i>Chưa có</i>}
                        />
                        <IconLabelDetail
                            icon={<i className='fa fa-map-marker'></i>}
                            label="Vĩ độ"
                            value={location.lat ?? <i>Chưa có</i>}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <CustomizedMap
                        location={location}
                        onSelect={(location) => setLocation(location)}
                    />
                </Grid>
            </Grid>
        </Box >
    )

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
        >
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
        </Dialog>
    )
}

export default memo(UpdateFarmstayLocation);