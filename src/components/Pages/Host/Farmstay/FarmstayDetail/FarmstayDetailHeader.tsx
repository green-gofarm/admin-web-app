import { Box, Grid } from '@mui/material'
import { Card } from 'react-bootstrap'
import { formatTimeString } from '../../../../../helpers/dateUtils'
import IconLabelDetail from '../../../../General/Item/IconLabelDetail'
import { getFeedbackRatingNumber } from './ui-segment/FeedbackItem'
import { Status } from '../../../../../setting/Status'
import { findFarmstayStatus } from '../../../../../setting/farmstay-setting'
import SendIcon from '@mui/icons-material/Send';

interface IFarmstayDetailHeader {
    detail?: any,
}

function FarmstayDetailHeader({
    detail
}: IFarmstayDetailHeader) {

    return (
        <Card className="custom-card customs-cards">
            <Card.Body className=" d-md-flex bg-white">
                <Box className="" flexGrow={0}>
                    <span className="pos-relative">
                        <Box
                            component="img"
                            className="br-5 "
                            src={require("../../../../../assets/img/photos/farmstay.jpg")}
                            alt="Farmstay logo"
                            sx={{
                                position: "relative",
                                width: "80px",
                                height: "80px",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                    </span>
                </Box>
                <Box className="prof-details" margin="0 0 4px 24px" flexGrow={1}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Box
                                component="h4"
                                className="font-weight-semibold"
                                display="flex"
                                justifyContent="space-between"
                            >
                                <Box
                                    component="h4"
                                    className="font-weight-semibold"
                                    display="flex"
                                    justifyContent="space-between"
                                    gap="8px"
                                >
                                    {detail?.name}
                                    <Status statusObject={findFarmstayStatus(detail?.status)} />
                                </Box>

                                <Box position="relative">
                                    <Box
                                        position="absolute"
                                        right="0"
                                        width="200px"
                                        className="btn btn-info shadow"
                                    >
                                        <SendIcon /> Gửi yêu cầu duyệt
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
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
                    </Grid>


                </Box>
            </Card.Body>
        </Card>
    )
}

export default FarmstayDetailHeader