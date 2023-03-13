import { Box, Button, Grid } from '@mui/material'
import { Card } from 'react-bootstrap'
import AvatarWrapper from '../../../../General/Wrapper/AvatarWrapper'
import { formatTimeString } from '../../../../../helpers/dateUtils'
import IconLabelDetail from '../../../../General/Item/IconLabelDetail'
import { getFeedbackRatingNumber } from './ui-segment/FeedbackItem'
import LockIcon from "@mui/icons-material/Lock";
import { Link, useLocation } from 'react-router-dom'

interface IFarmstayDetailHeader {
    detail?: any,
}

function FarmstayDetailHeader({
    detail
}: IFarmstayDetailHeader) {

    const location = useLocation();

    return (
        <Card className="custom-card customs-cards">
            <Card.Body className=" d-md-flex bg-white">
                <div className="">
                    <span className="pos-relative">
                        <Box
                            component="img"
                            className="br-5 "
                            src={require("../../../../../assets/img/photos/farmstay.jpg")}
                            alt="Farmstay logo"
                            sx={{
                                position: "relative",
                                width: "160px",
                                height: "160px",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                        <span className="bg-success text-white wd-1 ht-1 rounded-pill profile-online"></span>
                    </span>
                </div>
                <Box className="prof-details" margin="0 0 4px 24px">
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <h4 className="font-weight-semibold">
                                {detail?.name}
                            </h4>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <IconLabelDetail
                                icon={<i className="fa fa-user me-2"></i>}
                                label="Chủ sở hửu:"
                                value={
                                    <Box
                                        component={Link}
                                        to={`/management/account/host/${detail?.host?.userId}?backUrl=${location.pathname + location.search}`}
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
                                icon={<i className="fa fa-window-restore me-2"></i>}
                                label="Ngày tạo:"
                                value={formatTimeString(detail?.createdDate)}
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
                                    </div>
                                }
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <IconLabelDetail
                                icon={<i className="fa fa-location-arrow me-2"></i>}
                                label="Địa chỉ:"
                                value={detail?.address}
                            />
                            <IconLabelDetail
                                icon={<i className="fa fa-phone me-2"></i>}
                                label="Liên hệ"
                                value={detail?.contactInformation}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                gap="8px"
                                height="42px"
                                className="ms-md-4 ms-0 mb-2"
                            >
                                <Button
                                    sx={{
                                        marginLeft: "auto"
                                    }}
                                    color="error"
                                    variant="contained"
                                    size="small"
                                    startIcon={<LockIcon fontSize="small" />}
                                >
                                    Khóa farmstay
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>


                </Box>
            </Card.Body>
        </Card>
    )
}

export default FarmstayDetailHeader