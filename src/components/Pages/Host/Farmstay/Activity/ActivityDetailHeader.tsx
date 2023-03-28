import { Box, Grid } from '@mui/material';
import IconLabelDetail from '../../../../General/Item/IconLabelDetail';
import { Status } from '../../../../../setting/Status';
import { findActivityStatus } from '../../../../../setting/activity-status-setting';
import { convertToMoney } from '../../../../../helpers/stringUtils';
import GeneralAvatar from '../../../../General/GeneralAvatar';
import { useState } from 'react';
import UpdateActivityAvatar from './action/UpdateActivityAvatar';

interface ActivityDetailHeaderProps {
    detail?: any,
    loading?: boolean,
    images?: any,
    refresh?: () => void
}

function ActivityDetailHeader({
    detail,
    loading,
    images,
    refresh,
}: ActivityDetailHeaderProps) {

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

            <Grid item xs={12}>
                <IconLabelDetail
                    icon={<i className="fa fa-ticket-alt"></i>}
                    label="Sức chứa:"
                    value={detail?.slot}
                />
            </Grid>

            <Grid item xs={12}>
                <IconLabelDetail
                    icon={<i className="fa fa-credit-card"></i>}
                    label="Giá vé:"
                    value={convertToMoney(detail?.price)}
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
                ? <UpdateActivityAvatar
                    open={openUpdateAvatar}
                    activity={detail}
                    onClose={() => setOpenUpdateAvatar(false)}
                    onSuccessCallback={refresh}
                />
                : null
            }
        </>
    )
}

export default ActivityDetailHeader;