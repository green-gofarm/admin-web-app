import { Box, Grid } from '@mui/material'
import { Card } from 'react-bootstrap'
import IconLabelDetail from '../../../../General/Item/IconLabelDetail'
import StringWrapper from '../../../../General/Wrapper/StringWrapper'
import { Status } from '../../../../../setting/Status'
import SendIcon from "@mui/icons-material/Send";
import { FARMSTAY_STATUSES, findFarmstayStatus, renderAddress } from '../../../../../setting/farmstay-setting'
import useContactInfo from '../../../Management/Farmstay/FarmstayDetail/hooks/useContactInfo'
import useFarmstayImages from '../../../Management/Farmstay/FarmstayDetail/hooks/useFarmstayImages'
import useFarmstayAddress from '../../../Management/Farmstay/FarmstayDetail/hooks/useFarmstayAddress'
import UpdateFarmstayAvatar from './action/UpdateFarmstayAvatar'
import { useState } from 'react'
import SendApproveRequest from './action/SendApproveRequest'
import ConditionWrapper from '../../../../General/Wrapper/ConditionWrapper'
import GeneralAvatar from '../../../../General/GeneralAvatar'
import UserTag from '../../../../General/Wrapper/UserTag'
import Rating from '../../../../General/Rating'

interface IFarmstayDetailHeader {
    detail?: any,
    loading?: boolean,
    refresh?: () => void
}

function FarmstayDetailHeader({
    detail,
    loading,
    refresh
}: IFarmstayDetailHeader) {

    const contactInfo = useContactInfo(detail);
    const images = useFarmstayImages(detail);
    const address = useFarmstayAddress(detail);

    const [openUpdateAvatar, setOpenUpdateAvatar] = useState<boolean>(false);
    const [openSendRequest, setOpenSendRequest] = useState<boolean>(false);

    return (
        <>
            <Card className="custom-card customs-cards">
                <Card.Body className="d-flex bg-white">
                    <GeneralAvatar
                        avatar={images?.avatar}
                        onClickCamera={() => setOpenUpdateAvatar(true)}
                    />
                    <Box
                        className="prof-details"
                        margin="0 0 4px 24px"
                        flexGrow="1"
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Box
                                        component="h4"
                                        className="font-weight-semibold"
                                        display="flex"
                                        justifyContent="space-between"
                                        gap="8px"
                                        textTransform="capitalize"
                                    >
                                        {detail?.name}
                                        <Status statusObject={findFarmstayStatus(detail?.status)} />
                                    </Box>

                                    <ConditionWrapper isRender={detail?.status === FARMSTAY_STATUSES.DRAFT}>
                                        <Box position="relative">
                                            <Box
                                                position="absolute"
                                                right="0"
                                                top="-8px"
                                                width="200px"
                                                className="btn btn-info shadow"
                                                onClick={() => setOpenSendRequest(true)}
                                            >
                                                <SendIcon />
                                                <Box marginLeft="8px" display="inline-block">
                                                    Gửi yêu cầu phê duyệt
                                                </Box>
                                            </Box>
                                        </Box>
                                    </ConditionWrapper>
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <IconLabelDetail
                                    icon={<i className="fa fa-user me-2"></i>}
                                    label="Chủ sở hữu:"
                                    value={<UserTag user={detail?.host} />}
                                />
                                <IconLabelDetail
                                    icon={<i className="fa fa-star me-2"></i>}
                                    label="Đánh giá:"
                                    value={<Rating rating={detail?.rating} />}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <IconLabelDetail
                                    icon={<i className="fa fa-location-arrow me-2"></i>}
                                    label="Địa chỉ:"
                                    value={renderAddress(address)}
                                />
                                <IconLabelDetail
                                    icon={<i className="fa fa-address-book me-2"></i>}
                                    label="Liên hệ:"
                                    value={
                                        contactInfo[0]
                                            ? <StringWrapper text={contactInfo[0].value} />
                                            : <i>Chưa có thông tin liên hệ</i>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Card.Body>
            </Card>

            {openUpdateAvatar
                ? <UpdateFarmstayAvatar
                    open={openUpdateAvatar}
                    farmstay={detail}
                    onClose={() => setOpenUpdateAvatar(false)}
                    onSuccessCallback={refresh}
                />
                : null
            }

            <SendApproveRequest
                open={openSendRequest}
                onClose={() => setOpenSendRequest(false)}
                onSuccessCallback={refresh}
                farmstay={detail}
            />
        </>
    )
}

export default FarmstayDetailHeader