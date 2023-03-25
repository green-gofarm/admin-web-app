import { Box, Grid, Typography } from '@mui/material'
import { Card } from 'react-bootstrap'
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { convertToMoney } from '../../../../../../helpers/stringUtils';
import { Status } from '../../../../../../setting/Status';
import { findActivityStatus } from '../../../../../../setting/activity-status-setting';
import { useNavigate } from 'react-router-dom';
import useBackUrl from '../../../../../../hooks/useBackUrl';
import useActivityImages from '../hooks/useActivityImages';

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
    const { createBackUrl } = useBackUrl();
    const images = useActivityImages(item);

    return (
        <Card className="custom-card customs-cards">
            <Card.Body className="d-flex bg-white">
                <Box
                    minHeight="120px"
                    minWidth="160px"
                >
                    <Box
                        component="img"
                        className="br-5 "
                        src={images?.avatar ?? "../../../../../../assets/img/photos/1.jpg"}
                        alt="Activity img"
                        sx={{
                            position: "relative",
                            height: "120px",
                            width: "160px",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat"
                        }}
                    />
                </Box>
                <Box margin="0 0 4px 24px" flexGrow="1">
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap="8px"
                            >
                                <h5 className="font-weight-semibold mb-0">
                                    {item?.name ?? "No_Name"}
                                </h5>
                                <Status statusObject={findActivityStatus(item?.status)} />
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                width="100%"
                                textAlign="right"
                                className="font-weight-semibold"
                            >
                                {convertToMoney(item?.price)}
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography className={classes.multiLineEllipsis}>
                                {item?.description}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                className="btn btn-primary shadow"
                                onClick={() => navigate(`/management/farmstay/all/${item?.farmstayId}/activity/${item?.id}?backUrl=${createBackUrl()}`)}
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