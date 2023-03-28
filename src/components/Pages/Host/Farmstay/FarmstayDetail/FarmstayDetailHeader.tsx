import { Box, Grid, IconButton, Tooltip } from '@mui/material'
import { Card } from 'react-bootstrap'
import AvatarWrapper from '../../../../General/Wrapper/AvatarWrapper'
import IconLabelDetail from '../../../../General/Item/IconLabelDetail'
import { getFeedbackRatingNumber } from './ui-segment/FeedbackItem'
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
import makeStyles from '@mui/styles/makeStyles/makeStyles'
import ConditionWrapper from '../../../../General/Wrapper/ConditionWrapper'

const useStyles = makeStyles((theme) => ({
    cameraIcon: {
        alignItems: 'center',
        backgroundColor: '#7987a1',
        borderRadius: '100%',
        boxShadow: '0 0 0 2px #fff',
        color: '#fff',
        display: 'flex',
        fontSize: 18,
        height: 32,
        justifyContent: 'center',
        lineHeight: 0.9,
        position: 'absolute',
        right: -8,
        bottom: -8,
        width: 32,
    },
}));

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

    const classes = useStyles();
    const contactInfo = useContactInfo(detail);
    const images = useFarmstayImages(detail);
    const address = useFarmstayAddress(detail);

    const [openUpdateAvatar, setOpenUpdateAvatar] = useState<boolean>(false);
    const [openSendRequest, setOpenSendRequest] = useState<boolean>(false);

    return (
        <>
            <Card className="custom-card customs-cards">
                <Card.Body className="d-flex bg-white">
                    <div className="">
                        <Box
                            position="relative"
                            minWidth="120px"
                            minHeight="120px"
                        >
                            <Box
                                component="img"
                                src={images?.avatar ?? require("../../../../../assets/img/photos/1.jpg")}
                                alt="Farmstay logo"
                                boxShadow="0 1px 2px #ececec"
                                className="br-5"
                                sx={{
                                    position: "relative",
                                    width: "120px",
                                    height: "120px",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat"
                                }}
                            />
                            <Box
                                className={classes.cameraIcon}
                            >
                                <Tooltip
                                    title="Thay ảnh đại diện"
                                >
                                    <IconButton onClick={() => setOpenUpdateAvatar(true)}>
                                        <i className="fe fe-camera text-white"></i>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </div>
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
                                    value={
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap="8px"
                                            className="tag tag-rounded"
                                        >
                                            <AvatarWrapper
                                                name={detail?.host.name}
                                                avatarProps={{
                                                    width: "22px !important",
                                                    height: "22px !important",
                                                    fontSize: "12px !important"
                                                }}
                                            />
                                            {detail?.host.name}
                                        </Box>
                                    }
                                />
                                <IconLabelDetail
                                    icon={<i className="fa fa-star me-2"></i>}
                                    label="Đánh giá:"
                                    value={
                                        <div className="text-warning">
                                            {new Array(getFeedbackRatingNumber(detail)).fill("").map((_, index) => (
                                                <i className="bx bxs-star active" key={index}></i>
                                            ))}
                                            {new Array(getFeedbackRatingNumber(detail) < 5 ? (5 - getFeedbackRatingNumber(detail)) : 0).fill("").map((_, index) => (
                                                <i className="bx bxs-star text-light" key={index}></i>
                                            ))}
                                            {` (${getFeedbackRatingNumber(detail)} sao)`}
                                        </div>
                                    }
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