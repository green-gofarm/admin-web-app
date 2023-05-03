import FullCalendar, { DatesSetArg, EventClickArg, EventDef } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import viLocale from '@fullcalendar/core/locales/vi';
import { Card } from "react-bootstrap";
import { useCallback, useMemo, useState } from "react";
import { formatDate } from "../../../../../helpers/dateUtils";
import ActivityEvent from "./event/RoomEvent";
import useRoomSchedule from "../../../Management/Farmstay/Room/hooks/useRoomSchedule";
import { getColorProps, getStatusString } from "./setting";

interface RoomScheduleProps {
    detail?: any,
    loading?: boolean,
}

const dateFormat = "YYYY-MM-DD";

function RoomSchedule({
    detail,
    loading,
}: RoomScheduleProps) {

    const [date, setDate] = useState(formatDate(new Date(), dateFormat));
    const [limit, setLimit] = useState<number>(20);
    const { roomSchedule } = useRoomSchedule({
        roomId: detail?.id,
        farmstayId: detail?.farmstayId,
        date,
        limit,
    });

    const scheduleItems: any[] = useMemo(() => {
        if (!roomSchedule?.schedule) return [];
        return Object.keys(roomSchedule.schedule).map((dateStr) => {
            const value = roomSchedule.schedule[dateStr];
            return {
                ...value ?? {},
                id: dateStr,
                start: dateStr,
                dateStr,
                title: getStatusString(dateStr, value.available),
                ...getColorProps(dateStr, value.available) ?? {}
            }
        })
    }, [roomSchedule]);

    const handleChangeDate = useCallback((dateSet: DatesSetArg) => {
        const start = dateSet.start;
        const end = dateSet.end;
        const centerDate = new Date((start.getTime() + end.getTime()) / 2);
        setDate(formatDate(centerDate, dateFormat));

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 2));
        setLimit(diffDays);
    }, []);

    // State
    const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<EventDef | null>(null);

    const handleEventClick = useCallback((arg: EventClickArg) => {
        setAnchorEl(arg.jsEvent.target);
        setSelectedEvent(arg.event._def);
    }, []);

    return (
        <>
            <Card>
                <Card.Body className="border-0">
                    <h5 className="mb-2 mt-1 fw-semibold">Lịch hoạt động</h5>

                    <Box
                        textTransform="capitalize"
                        id="calendar2"
                    >
                        <FullCalendar
                            locale={viLocale}
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                            ]}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay",
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            events={scheduleItems}
                            height="500px"
                            eventClick={handleEventClick}
                            datesSet={handleChangeDate}
                        />
                    </Box>
                </Card.Body>
            </Card>

            <ActivityEvent
                open={!!anchorEl && !!selectedEvent}
                anchorEl={anchorEl}
                event={selectedEvent}
                onClose={() => setAnchorEl(null)}
            />
        </>
    )
}

export default RoomSchedule