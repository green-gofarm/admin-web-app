import { Box, Grid } from '@mui/material';
import IconLabelDetail from '../../../../General/Item/IconLabelDetail';
import { Status } from '../../../../../setting/Status';
import { findActivityStatus } from '../../../../../setting/activity-status-setting';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/redux-setting';
import { getRoomCategoryLabel } from '../../../../../setting/room-category-setting';
import { convertToMoney } from '../../../../../helpers/stringUtils';
import { useState } from 'react';
import GeneralAvatar from '../../../../General/GeneralAvatar';
import UpdateRoomAvatar from './action/UpdateRoomAvatar';
interface RoomDetailHeaderProps {
    detail?: any,
    loading?: boolean,
    images?: any,
    refresh?: () => void
}

function RoomDetailHeader({
    detail,
    loading,
    images,
    refresh
}: RoomDetailHeaderProps) {

    const categories = useSelector((state: RootState) => state.room.allRoomCategories);

    const [openUpdateAvatar, setOpenUpdateAvatar] = useState<boolean>(false);

    const renderContent = () => (
        <Grid container spacing={0} alignItems="center">
            <Grid item xs={12}>
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"

                    component="h4"
                    className="font-weight-semibold"
                >
                    {detail?.name ?? "NO_NAME"}
                    <Box>
                        <Status statusObject={findActivityStatus(detail?.status)} />
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={6}>
                <IconLabelDetail
                    icon={<i className="fa fa-ticket-alt"></i>}
                    label="Phân loại:"
                    value={getRoomCategoryLabel(categories, detail?.roomCategoryId) ?? "NO_TYPE"}
                />
            </Grid>

            <Grid item xs={6}>
                <IconLabelDetail
                    icon={<i className="fa fa-credit-card"></i>}
                    label="Giá phòng:"
                    value={`${convertToMoney(detail?.price)} / ngày`}
                />
            </Grid>
        </Grid>
    )

    return (

        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" gap="16px">
                        <GeneralAvatar
                            avatar={images?.avatar}
                            onClickCamera={() => setOpenUpdateAvatar(true)}
                        />
                        {renderContent()}
                    </Box>
                </Grid>
            </Grid>

            {openUpdateAvatar
                ? <UpdateRoomAvatar
                    open={openUpdateAvatar}
                    room={detail}
                    onClose={() => setOpenUpdateAvatar(false)}
                    onSuccessCallback={refresh}
                />
                : null
            }
        </>
    )
}

export default RoomDetailHeader;