import { Box, Grid } from '@mui/material'
import { Card, Dropdown } from 'react-bootstrap'
import IconLabelDetail from '../../../../General/Item/IconLabelDetail'
import StringWrapper from '../../../../General/Wrapper/StringWrapper'
import { Status } from '../../../../../setting/Status'
import SendIcon from "@mui/icons-material/Send";
import { FARMSTAY_STATUSES, findFarmstayStatus, renderAddress } from '../../../../../setting/farmstay-setting'
import useContactInfo from '../../../Management/Farmstay/FarmstayDetail/hooks/useContactInfo'
import useFarmstayImages from '../../../Management/Farmstay/FarmstayDetail/hooks/useFarmstayImages'
import useFarmstayAddress from '../../../Management/Farmstay/FarmstayDetail/hooks/useFarmstayAddress'
import UpdateFarmstayAvatar from './action/UpdateFarmstayAvatar'
import { useEffect, useRef, useState } from 'react'
// import SendApproveRequest from './action/SendApproveRequest'
import ConditionWrapper from '../../../../General/Wrapper/ConditionWrapper'
import GeneralAvatar from '../../../../General/GeneralAvatar'
import UserTag from '../../../../General/Wrapper/UserTag'
import Rating from '../../../../General/Rating'
import { Message } from '@mui/icons-material'
import SendApproveRequest from './SendApproveRequest'
import ViewNotArchiveRule from './ViewNotArchiveRule'

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
    const [openViewReason, setOpenViewReason] = useState<boolean>(false);

    const initialized = useRef<boolean>(false);

    useEffect(() => {
        if (initialized.current) {
            return;
        }
        if (detail) {
            if (detail.status === FARMSTAY_STATUSES.DRAFT && detail.extras) {
                setOpenViewReason(true);
                initialized.current = true;
            }
        }
    }, [detail]);

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
                                    position="relative"
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
                                        <Box height="36px">
                                            <Status statusObject={findFarmstayStatus(detail?.status)} />
                                        </Box>
                                    </Box>

                                    <ConditionWrapper isRender={detail?.status === FARMSTAY_STATUSES.DRAFT}>
                                        <Box
                                            position="absolute"
                                            top="-8px"
                                            right="0"
                                            display="flex"
                                            alignItems="center"
                                            gap="8px"
                                        >
                                            {!!detail?.extras
                                                ? <Dropdown.Toggle
                                                    variant="danger"
                                                    onClick={() => setOpenViewReason(prev => !prev)}
                                                >
                                                    <Message />
                                                </Dropdown.Toggle>
                                                : null
                                            }
                                            <Box
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

            {openSendRequest
                ? <SendApproveRequest
                    open={openSendRequest}
                    onClose={() => setOpenSendRequest(false)}
                    onSuccessCallback={refresh}
                    farmstay={detail}
                />
                : null
            }

            {openViewReason
                ? <ViewNotArchiveRule
                    open={openViewReason}
                    farmstay={detail}
                    onClose={() => setOpenViewReason(false)}
                />
                : null
            }
        </>
    )
}

export default FarmstayDetailHeader