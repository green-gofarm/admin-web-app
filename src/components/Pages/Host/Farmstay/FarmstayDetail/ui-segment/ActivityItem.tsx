import { Box, Grid, Typography } from '@mui/material'
import { Card } from 'react-bootstrap'
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { convertToMoney } from '../../../../../../helpers/stringUtils';
import { Status } from '../../../../../../setting/Status';
import { ACTIVITY_STATUSES, findActivityStatus } from '../../../../../../setting/activity-status-setting';
import { useNavigate } from 'react-router-dom';
import useBackUrl from '../../../../../../hooks/useBackUrl';
import useActivityImages from '../../../../Management/Farmstay/FarmstayDetail/hooks/useActivityImages';
import { DeleteForever, Lock, LockOpen } from '@mui/icons-material';
import { useState } from 'react';
import ConditionWrapper from '../../../../../General/Wrapper/ConditionWrapper';
import LockActivity from '../action/LockActivity';
import UnLockActivity from '../action/UnLockActivity';
import DeleteActivity from '../action/DeleteActivity';

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
    item: any,
    refresh?: () => void,
}

function ActivityItem({ item, refresh }: IActivityItem) {
    const classes = useStylesEllipsis();
    const navigate = useNavigate();
    const { createBackUrl } = useBackUrl();
    const images = useActivityImages(item);

    const [openLock, setOpenLock] = useState<boolean>(false);
    const [openUnlock, setOpenUnlock] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    return (
        <>
            <Card className="custom-card customs-cards">
                <Card.Body className="d-flex bg-white">
                    <Box
                        height="120px"
                        width="120px"
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

                            <Grid item xs={12} marginTop="auto">
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    marginTop="auto"
                                >
                                    <Box
                                        className="btn btn-primary shadow"
                                        onClick={() => navigate(`/management/farmstay/${item?.farmstayId}/activity/${item?.id}?backUrl=${createBackUrl()}`)}
                                    >
                                        Xem chi tiết
                                    </Box>

                                    <Box
                                        display="flex"
                                        gap="8px"
                                    >
                                        <ConditionWrapper isRender={item.status === ACTIVITY_STATUSES.ACTIVE}>
                                            <Box
                                                className="btn btn-warning shadow"
                                                onClick={() => setOpenLock(true)}
                                            >
                                                <Box
                                                    display="flex"
                                                    gap="4px"
                                                    alignItems="center"
                                                >
                                                    <Lock /> Khóa
                                                </Box>
                                            </Box>
                                        </ConditionWrapper>

                                        <ConditionWrapper isRender={item.status === ACTIVITY_STATUSES.INACTIVE}>
                                            <Box
                                                className="btn btn-primary shadow"
                                                onClick={() => setOpenUnlock(true)}
                                            >
                                                <Box
                                                    display="flex"
                                                    gap="4px"
                                                    alignItems="center"
                                                >
                                                    <LockOpen /> Mở khóa
                                                </Box>
                                            </Box>
                                        </ConditionWrapper>

                                        <Box
                                            className="btn btn-secondary shadow"
                                            onClick={() => setOpenDelete(true)}
                                        >
                                            <Box
                                                display="flex"
                                                gap="4px"
                                                alignItems="center"
                                            >
                                                <DeleteForever /> Xóa
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Card.Body>
            </Card>

            {openLock
                ? <LockActivity
                    open={openLock}
                    onClose={() => setOpenLock(false)}
                    activity={item}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openUnlock
                ? <UnLockActivity
                    open={openUnlock}
                    onClose={() => setOpenUnlock(false)}
                    activity={item}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openDelete
                ? <DeleteActivity
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    activity={item}
                    onSuccessCallback={refresh}
                />
                : null
            }
        </>
    )
}

export default ActivityItem;