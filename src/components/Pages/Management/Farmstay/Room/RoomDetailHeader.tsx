import { Box, Grid } from '@mui/material';
import IconLabelDetail from '../../../../General/Item/IconLabelDetail';
import { Status } from '../../../../../setting/Status';
import { findActivityStatus } from '../../../../../setting/activity-status-setting';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/redux-setting';
import { getRoomCategoryLabel } from '../../../../../setting/room-category-setting';
import { convertToMoney } from '../../../../../helpers/stringUtils';
import { formatTimeString, getTimeAgoString } from '../../../../../helpers/dateUtils';

interface RoomDetailHeaderProps {
    detail?: any,
    loading?: boolean,
    images?: any,
}

function RoomDetailHeader({
    detail,
    loading,
    images,
}: RoomDetailHeaderProps) {

    const categories = useSelector((state: RootState) => state.room.allRoomCategories);

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

            <Grid item xs={12} md={6}>
                <IconLabelDetail
                    icon={<i className="fa fa-ticket-alt"></i>}
                    label="Phân loại:"
                    value={getRoomCategoryLabel(categories, detail?.roomCategoryId) ?? "NO_TYPE"}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <IconLabelDetail
                    icon={<i className="fa fa-clock"></i>}
                    label="Ngày tạo:"
                    value={formatTimeString(detail?.createdDate) ?? "-"}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <IconLabelDetail
                    icon={<i className="fa fa-credit-card"></i>}
                    label="Giá phòng:"
                    value={`${convertToMoney(detail?.price)} / ngày`}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <IconLabelDetail
                    icon={<i className="fa fa-clock"></i>}
                    label="Lần cập nhật cuối:"
                    value={`${formatTimeString(detail?.updatedDate)} (${getTimeAgoString(detail?.updatedDate)})` ?? "-"}
                />
            </Grid>
        </Grid>
    )

    return (

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" gap="16px">
                    <Box
                        className="pos-relative"
                        minWidth="96px !important"
                        minHeight="96px !important"
                    >
                        <Box
                            component="img"
                            className="br-5 "
                            src={images?.avatar ?? require("../../../../../assets/img/photos/1.jpg")}
                            alt="Farmstay logo"
                            sx={{
                                position: "relative",
                                width: "96px",
                                height: "96px",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                        <span className="bg-success text-white wd-1 ht-1 rounded-pill profile-online"></span>
                    </Box>
                    {renderContent()}
                </Box>
            </Grid>
        </Grid>
    )
}

export default RoomDetailHeader;