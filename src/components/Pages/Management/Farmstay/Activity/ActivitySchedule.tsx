import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import viLocale from '@fullcalendar/core/locales/vi';

let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
let nextDateStr = (function getDateStr(): string {
    let today = new Date();
    let nextDate = new Date(today.setDate(today.getDate() + 1));
    return nextDate.toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
})();

const INITIAL_EVENTS = [
    {
        id: "1",
        title: "Hết vé",
        start: todayStr,
        backgroundColor: '#f34343', // background color of the event
        borderColor: '#f34343', // border color of the event
        textColor: '#FFFFFF', // 
    },
    {
        id: "2",
        title: "Còn vé",
        start: nextDateStr,
    },
];

function ActivitySchedule() {

    return (
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
                events={INITIAL_EVENTS}
                height="500px"
            />
        </Box>
    )
}

export default ActivitySchedule