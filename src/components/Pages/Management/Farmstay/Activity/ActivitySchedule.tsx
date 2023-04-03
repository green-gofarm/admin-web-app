import FullCalendar, { DatesSetArg, EventClickArg, EventDef } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import viLocale from '@fullcalendar/core/locales/vi';
import useActivitySchedule from "./hooks/useActivitySchedule";
import { useCallback, useMemo, useState } from "react";
import { formatDate, isThePast } from "../../../../../helpers/dateUtils";
import ActivityEvent from "./activity-event/ActivityEvent";
import { STATUS_COLORS } from "../../../../../setting/color";
import CustomizedCard from "../../../../General/Card/CustomizedCard";

const getColorProps = (date: string | null) => {
    if (!date) return null;
    if (isThePast(new Date(date))) {
        return {
            textColor: STATUS_COLORS.DISABLED.textColor,
            backgroundColor: STATUS_COLORS.DISABLED.bgColor,
            borderColor: STATUS_COLORS.DISABLED.bgColor,
        }
    }

    return {
        textColor: STATUS_COLORS.ACTIVE.textColor,
        backgroundColor: STATUS_COLORS.ACTIVE.bgColor,
        borderColor: STATUS_COLORS.ACTIVE.bgColor,
    }
}


interface ActivityScheduleProps {
    detail?: any,
    loading?: boolean,
}

const dateFormat = "YYYY-MM-DD";

function ActivitySchedule({
    detail,
    loading,
}: ActivityScheduleProps) {

    const [date, setDate] = useState(formatDate(new Date(), dateFormat));
    const { activitySchedule } = useActivitySchedule(detail?.id, detail?.farmstayId, date);

    const scheduleItems: any[] = useMemo(() => {
        if (!activitySchedule?.schedule) return [];
        return Object.keys(activitySchedule.schedule).map((dateStr) => {
            const value = activitySchedule.schedule[dateStr];
            return {
                ...value ?? {},
                id: dateStr,
                start: dateStr,
                end: dateStr,
                title: value?.available ? "Còn vé" : "Hết vé",
                ...getColorProps(dateStr) ?? {}
            }
        })
    }, [activitySchedule]);

    const handleChangeDate = useCallback((dateSet: DatesSetArg) => {
        const centerDate = new Date((dateSet.start.getTime() + dateSet.end.getTime()) / 2);
        setDate(formatDate(centerDate, dateFormat));
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
            <CustomizedCard
                title="Lịch hoạt động"
                content={
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
                }
            />

            <ActivityEvent
                open={!!anchorEl && !!selectedEvent}
                anchorEl={anchorEl}
                event={selectedEvent}
                onClose={() => setAnchorEl(null)}
            />
        </>
    )
}

export default ActivitySchedule