import { useCallback, useMemo, useState } from 'react'
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import useFarmstaySchedule from '../hooks/useFarmstaySchedule';
import { formatDate } from '../../../../../../helpers/dateUtils';
import FullCalendar, { DatesSetArg, EventClickArg, EventDef } from '@fullcalendar/react';
import CustomizedCard from '../../../../../General/Card/CustomizedCard';
import { Box } from '@mui/material';
import viLocale from '@fullcalendar/core/locales/vi';
import dayGridPlugin from "@fullcalendar/daygrid";
import { dateFormat, generateTitle, getColorProps } from '../farmstay-event/setting';
import FarmstayEvent from '../farmstay-event/FarmstayEvent';

interface ScheduleTabProps {
    detail?: any,
    loading?: boolean,
}

function ScheduleTab({
    detail,
    loading
}: ScheduleTabProps) {

    const [date, setDate] = useState(formatDate(new Date(), dateFormat));
    const { schedule } = useFarmstaySchedule(detail?.id, date);

    const scheduleItems: any[] = useMemo(() => {
        if (!schedule?.schedule) return [];

        const result: any[] = [];

        Object.keys(schedule.schedule).forEach((dateStr) => {
            const value = schedule.schedule[dateStr];
            if (isAvailableArray(value)) {
                value.forEach(item => {
                    result.push({
                        ...item,
                        id: item.itemId,
                        start: dateStr,
                        dateStr: dateStr,
                        title: generateTitle(item, dateStr),
                        ...getColorProps(dateStr, item.available) ?? {}
                    })
                })
            }
        })

        return result;
    }, [schedule]);

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
                            plugins={[dayGridPlugin]}
                            initialView="dayGridDay"
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridDay,dayGridWeek",
                            }}
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

            <FarmstayEvent
                open={!!anchorEl && !!selectedEvent}
                anchorEl={anchorEl}
                event={selectedEvent}
                onClose={() => setAnchorEl(null)}
            />
        </>
    )
}

export default ScheduleTab;