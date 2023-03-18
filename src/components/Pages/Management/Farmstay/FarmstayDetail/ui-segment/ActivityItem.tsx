import { Box, Grid, Typography } from '@mui/material'
import { Card } from 'react-bootstrap'
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { convertToMoney } from '../../../../../../helpers/stringUtils';
import { Status } from '../../../../../../setting/Status';
import { findActivityStatus } from '../../../../../../setting/activity-status-setting';
import { useLocation, useNavigate } from 'react-router-dom';

const useStylesEllipsis = makeStyles({
    multiLineEllipsis: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
        fontSize: "13px"
    }
});
interface IActivityItem {
    item: any
}

function ActivityItem({ item }: IActivityItem) {
    const classes = useStylesEllipsis();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Card className="custom-card customs-cards">
            <Card.Body className="d-md-flex bg-white">
                <Box
                    minWidth="fit-content"
                >
                    <Box
                        component="img"
                        className="br-5 "
                        src={require("../../../../../../assets/img/png/fishing.jpg")}
                        alt="Activity img"
                        sx={{
                            position: "relative",
                            height: "140px",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat"
                        }}
                    />
                </Box>
                <Box margin="0 0 4px 24px">
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <h5 className="font-weight-semibold">
                                {item?.name}
                            </h5>
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                width="100%"
                                textAlign="right"
                                className="font-weight-semibold"
                            >
                                {convertToMoney(item?.defaultPrice)}
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography className={classes.multiLineEllipsis}>
                                {item?.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Status statusObject={findActivityStatus(item?.status)} />
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                className="btn btn-primary shadow"
                                onClick={() => navigate(`/management/farmstay/all/${item?.farmstayId}/activity/${item?.id}?backUrl=${location.pathname + location.search}`)}
                            >
                                Xem chi tiết
                            </Box>
                        </Grid>
                    </Grid>


                </Box>
            </Card.Body>
        </Card>
    )
}

export default ActivityItem