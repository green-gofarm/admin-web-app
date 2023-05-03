import { Close } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Grid, Popover } from "@mui/material";
import TooltipIconAction from "../../../../../General/Icon/TooltipIconAction";
import { EventDef } from "@fullcalendar/react";
import IconLabelDetail from "../../../../../General/Item/IconLabelDetail";
import { STATUS_COLORS } from "../../../../../../setting/color";
import { Status } from "../../../../../../setting/Status";
import { getStatus } from "../setting";
interface ActivityEventDialogProps {
    open: boolean,
    onClose: () => void,
    anchorEl: any,
    event: EventDef | null,
}

const RoomEvent = ({
    event,
    open,
    onClose = () => { },
    anchorEl,
}: ActivityEventDialogProps) => {

    return (
        <Popover
            elevation={5}
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
        >

            <Card style={{ width: "fit-content" }}>
                <CardHeader
                    title={
                        <Box
                            fontWeight="600"
                            fontSize="1.125rem"
                            marginRight="8px"
                        >
                            {`Xuất sử dụng ngày ${event?.extendedProps?.dateStr}`}
                        </Box>
                    }
                    action={
                        <TooltipIconAction
                            Icon={Close}
                            title="Đóng"
                            onClick={onClose}
                        />
                    }
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <IconLabelDetail
                                icon={<i className="fa fa-ticket-alt"></i>}
                                label="Trạng thái:"
                                value={
                                    event?.extendedProps.available
                                        ? <Box
                                            color={STATUS_COLORS.ACTIVE.textColor}
                                        >
                                            Còn trống
                                        </Box>
                                        : <Box
                                            color={STATUS_COLORS.BANNED.textColor}
                                        >
                                            Đã đặt
                                        </Box>
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Status statusObject={getStatus(event)} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Popover>
    );
};

export default RoomEvent;
