import { Box, Grid, Typography } from '@mui/material'
import { Card } from 'react-bootstrap'
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { convertToMoney } from '../../../../../../helpers/stringUtils';
import { Status } from '../../../../../../setting/Status';
import { useNavigate } from 'react-router-dom';
import useBackUrl from '../../../../../../hooks/useBackUrl';
import useRoomImages from '../../../../Management/Farmstay/FarmstayDetail/hooks/useRoomImages';
import IconLabelDetail from '../../../../../General/Item/IconLabelDetail';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import { getRoomCategoryLabel } from '../../../../../../setting/room-category-setting';
import { findRoomStatus } from '../../../../../../setting/room-setting';

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
interface RoomItemProps {
    item: any,
}

function RoomItem({ item }: RoomItemProps) {
    const classes = useStylesEllipsis();
    const navigate = useNavigate();
    const { createBackUrl } = useBackUrl();
    const images = useRoomImages(item);

    const categories = useSelector((state: RootState) => state.room.allRoomCategories);

    return (
        <>
            <Card className="custom-card customs-cards">
                <Card.Body className="d-flex bg-white">
                    <Box
                        height="120px"
                        width="120px"
                        minWidth="120px"
                    >
                        <Box
                            component="img"
                            className="br-5 "
                            src={images?.avatar ?? "../../../../../../assets/img/photos/1.jpg"}
                            alt="Activity img"
                            sx={{
                                position: "relative",
                                height: "120px !important",
                                width: "120px !important",
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
                                    <Status statusObject={findRoomStatus(item?.status)} />
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box
                                    width="100%"
                                    textAlign="right"
                                    className="font-weight-semibold"
                                >
                                    {`${convertToMoney(item?.price)}`}
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <IconLabelDetail
                                    icon={<i className='fa fa-list-alt'></i>}
                                    value={getRoomCategoryLabel(categories, item?.roomCategoryId)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.multiLineEllipsis}>
                                    {item?.description}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} marginTop="auto">
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    marginTop="auto"
                                >
                                    <Box
                                        className="btn btn-primary shadow"
                                        onClick={() => navigate(`/management/farmstay/${item?.farmstayId}/room/${item?.id}?backUrl=${createBackUrl()}`)}
                                    >
                                        Xem chi tiết
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Card.Body>
            </Card>
        </>
    )
}

export default RoomItem;