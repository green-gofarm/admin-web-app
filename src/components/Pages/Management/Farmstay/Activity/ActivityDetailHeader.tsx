import { Box, Grid } from '@mui/material';
import IconLabelDetail from '../../../../General/Item/IconLabelDetail';
import { Status } from '../../../../../setting/Status';
import { findActivityStatus } from '../../../../../setting/activity-status-setting';
import { convertToMoney } from '../../../../../helpers/stringUtils';
import GeneralAvatar from '../../../../General/GeneralAvatar';
import { formatTimeString, getTimeAgoString } from '../../../../../helpers/dateUtils';

interface IActivityDetailHeader {
    detail?: any,
    loading?: boolean,
    images?: any,
}

function ActivityDetailHeader({
    detail,
    loading,
    images,
}: IActivityDetailHeader) {

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
                    label="Sức chứa"
                    value={detail?.slot ?? 0}
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
                    label="Giá vé:"
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
                    <GeneralAvatar
                        avatar={images?.avatar}
                        noCamera
                    />
                    {renderContent()}
                </Box>
            </Grid>
        </Grid>
    )
}

export default ActivityDetailHeader;