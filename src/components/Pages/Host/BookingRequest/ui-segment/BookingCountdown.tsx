import { Box } from "@mui/material";
import Countdown from "react-countdown-now";
import { STATUS_COLORS } from "../../../../../setting/color";

const AfterCompletion = () => (
    <Box
        padding="6px"
        borderRadius="4px"
        width="140px"
        textAlign="center"
        fontSize="0.75rem"
        fontWeight={600}
        bgcolor={STATUS_COLORS.DISABLED.bgColor}
    >
        <span>Đơn đã quá hạn!</span>
    </Box>
)

const Renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
        return <AfterCompletion />;
    }

    return (
        <Box
            padding="6px"
            borderRadius="4px"
            width="140px"
            textAlign="center"
            fontSize="0.75rem"
            fontWeight={600}
            bgcolor={STATUS_COLORS.PENDING.bgColor}
        >
            <span>
                {days} ngày {hours}:{minutes}:{seconds}
            </span>
        </Box>
    );
};

interface BookingCountdownProps {
    dateString: string | any,
}
export function BookingCountdown({
    dateString
}: BookingCountdownProps) {

    return <Countdown date={new Date(dateString).getTime()} renderer={Renderer} />;
}