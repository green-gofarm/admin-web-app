import { Box, Grid } from '@mui/material'
import { Card } from 'react-bootstrap'
import AvatarWrapper from '../../../../General/Wrapper/AvatarWrapper'
import IconLabelDetail from '../../../../General/Item/IconLabelDetail'
import { getFeedbackRatingNumber } from './ui-segment/FeedbackItem'
import { Link } from 'react-router-dom'
import useBackUrl from '../../../../../hooks/useBackUrl'
import useContactInfo from './hooks/useContactInfo'
import StringWrapper from '../../../../General/Wrapper/StringWrapper'
import useFarmstayImages from './hooks/useFarmstayImages'
import useFarmstayAddress from './hooks/useFarmstayAddress'
import { findFarmstayStatus, renderAddress } from '../../../../../setting/farmstay-setting'
import { Status } from '../../../../../setting/Status'

interface IFarmstayDetailHeader {
    detail?: any,
    loading?: boolean,
}

function FarmstayDetailHeader({
    detail,
    loading,
}: IFarmstayDetailHeader) {

    const { createBackUrl } = useBackUrl();

    const contactInfo = useContactInfo(detail);
    const images = useFarmstayImages(detail);
    const address = useFarmstayAddress(detail);

    return (
        <Card className="custom-card customs-cards">
            <Card.Body className="d-flex bg-white">
                <div className="">
                    <span className="pos-relative">
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
                    </span>
                </div>
                <Box
                    className="prof-details"
                    margin="0 0 4px 24px"
                    flexGrow="1"
                >
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <IconLabelDetail
                                icon={<i className="fa fa-user me-2"></i>}
                                label="Chủ sở hữu:"
                                value={
                                    <Box
                                        component={Link}
                                        to={`/management/account/host/${detail?.host?.userId}?backUrl=${createBackUrl()}`}
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
                                label="Liên hệ"
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
    )
}

export default FarmstayDetailHeader