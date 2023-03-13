import { Box, Grid } from '@mui/material'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';

interface IActivityItem {
    item: any
}

function ActivityItem({ item }: IActivityItem) {
    return (
        <Card className="custom-card customs-cards">
            <Card.Body className=" d-md-flex bg-white">
                <div className="">
                    <span className="pos-relative">
                        <Box
                            component="img"
                            className="br-5 "
                            src={require("../../../../../../assets/img/png/fishing.jpg")}
                            alt="Activity img"
                            sx={{
                                position: "relative",
                                width: "80px",
                                height: "80px",
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
                                {item?.name}
                            </h4>
                        </Grid>
                        <Grid item xs={12} lg={6}>

                        </Grid>
                        <Grid item xs={12} lg={6}>
                            {/* <IconLabelDetail
                                icon={<i className="fa fa-location-arrow me-2"></i>}
                                label="Địa chỉ:"
                                value={detail?.address}
                            />
                            <IconLabelDetail
                                icon={<i className="fa fa-phone me-2"></i>}
                                label="Liên hệ"
                                value={detail?.contactInformation}
                            /> */}
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                gap="8px"
                                height="42px"
                                className="ms-md-4 ms-0 mb-2"
                            >
                                <Link to="#" className="new ms-3">
                                    <VisibilityIcon />
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>


                </Box>
            </Card.Body>
        </Card>
    )
}

export default ActivityItem