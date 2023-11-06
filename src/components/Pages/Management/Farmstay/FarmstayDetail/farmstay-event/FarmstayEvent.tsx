import { Close } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Grid, Popover } from "@mui/material";
import TooltipIconAction from "../../../../../General/Icon/TooltipIconAction";
import { EventDef } from "@fullcalendar/react";
import IconLabelDetail from "../../../../../General/Item/IconLabelDetail";
import { ItemType, getStatus } from "./setting";
import ConditionWrapper from "../../../../../General/Wrapper/ConditionWrapper";
import { Status } from "../../../../../../setting/Status";
import { STATUS_COLORS } from "../../../../../../setting/color";

interface FarmstayEventProps {
    open: boolean,
    onClose: () => void,
    anchorEl: any,
    event: EventDef | null,
}

const FarmstayEvent = ({
    event,
    open,
    onClose = () => { },
    anchorEl,
}: FarmstayEventProps) => {

    return (
        <Popover
            elevation={5}
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
        >
            <Card style={{ width: "fit-content", maxWidth: "500px" }}>
                <CardHeader
                    title={
                        <Box
                            fontWeight="600"
                            fontSize="1.125rem"
                            marginRight="8px"
                        >
                            {`Thông tin ngày ${event?.extendedProps?.dateStr}`}
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
                        <ConditionWrapper isRender={event?.extendedProps?.itemType === ItemType.ROOM}>
                            <Grid item xs={12}>
                                <IconLabelDetail
                                    icon={<i className="fa fa-home"></i>}
                                    label="Phòng:"
                                    value={event?.extendedProps?.itemName ?? "-"}
                                />
                            </Grid>
                        </ConditionWrapper>
                        <ConditionWrapper isRender={event?.extendedProps?.itemType === ItemType.ACTIVITY}>
                            <Grid item xs={12}>
                                <IconLabelDetail
                                    icon={<i className="fa fa-hiking"></i>}
                                    label="Hoạt động:"
                                    value={event?.extendedProps?.itemName ?? "-"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <IconLabelDetail
                                    icon={<i className="fa fa-ticket-alt"></i>}
                                    label="Số vé còn trống:"
                                    value={`${event?.extendedProps.availableItem} / ${event?.extendedProps.totalItem}`}
                                />
                            </Grid>
                        </ConditionWrapper>

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
                                            Đã đặt hết
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

export default FarmstayEvent;
