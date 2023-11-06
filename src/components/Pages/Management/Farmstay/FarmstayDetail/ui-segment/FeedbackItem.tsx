import { useMemo, useState } from "react";
import { formatTimeString } from "../../../../../../helpers/dateUtils"
import Rating from "../../../../../General/Rating";
import { Box, IconButton, Tooltip } from "@mui/material";
import FlagIcon from '@mui/icons-material/Flag';
import HostReportFeedback from "../../../Feedback/action/HostReportFeedback";
import { Status } from "../../../../../../setting/Status";
import { FEEDBACK_STATUSES, findFeedbackStatus } from "../../../../../../setting/feedback-setting";
import ConditionWrapper from "../../../../../General/Wrapper/ConditionWrapper";

const getOnlineAvatar = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
}

interface IFeedbackItem {
    item: any,
    hasReport?: boolean,
    refresh?: () => void,
}

function FeedbackItem({
    item,
    hasReport,
    refresh
}: IFeedbackItem) {

    const [openReport, setOpenReport] = useState<boolean>(false);

    const avatarUrl = useMemo(() => {
        if (item?.customerAvatar) {
            return item.customerAvatar;
        }

        return getOnlineAvatar(item.customerName ? encodeURIComponent(item.customerName) : "unknown");
    }, [item.customerAvatar, item.customerName]);

    return (
        <Box
            display="flex"
            className="mt-0 p-3 border-bottom"
        >
            <div className="d-flex me-3">
                <img
                    className="media-image avatar avatar-md rounded-circle"
                    alt="64x64"
                    src={avatarUrl}
                    width="128px"
                    height="128px"
                />
            </div>
            <div className="media-body">
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="1rem"
                    >
                        <h4 className="mt-0 font-weight-semibold tx-16">
                            {item.customerName}
                        </h4>
                    </Box>

                    <ConditionWrapper isRender={item.status === FEEDBACK_STATUSES.REPORTED}>
                        <Status statusObject={findFeedbackStatus(item.status)} />
                    </ConditionWrapper>

                    {hasReport && item.status !== FEEDBACK_STATUSES.REPORTED ?
                        <Tooltip title="Báo cáo">
                            <IconButton
                                sx={{
                                    padding: "6px !important"
                                }}
                                onClick={() => setOpenReport(true)}
                            >
                                <FlagIcon />
                            </IconButton>
                        </Tooltip>
                        : null
                    }
                </Box>
                <span className="text-muted tx-13">{formatTimeString(item?.createdDate)}</span>
                <Rating rating={item?.rating} />
                <p className="font-13  mb-2 mt-2">
                    {item?.comment}
                </p>
            </div>

            {openReport
                ? <HostReportFeedback
                    open={openReport}
                    onClose={() => setOpenReport(false)}
                    refresh={refresh}
                    feedback={item}
                />
                : null
            }
        </Box>
    )
}

export default FeedbackItem;