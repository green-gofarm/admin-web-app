import { useCallback, useMemo, useState } from "react";
import json from "./feedback.json";
import { Box, Grid, Tooltip } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import EllipsisWrapper from "../../../General/Wrapper/EllipsisWrapper";
import AvatarWrapper from "../../../General/Wrapper/AvatarWrapper";
import ViewIconAction from "../../../General/Action/IconAction/ViewIconAction";
import { findFeedbackStatus } from "../../../../setting/feedback-setting";
import { createCodeString } from "../../../../helpers/stringUtils";
import HomeIcon from '@mui/icons-material/Home';
import { OverlayTrigger, Popover } from "react-bootstrap";
import LockIconAction from "../../../General/Action/IconAction/LockIconAction";
import ViewFeedback from "./action/ViewFeedback";
import UnbanFeedback from "./action/UnbanFeedback";
import BanFeedback from "./action/BanFeedback";
import UnlockIconAction from "../../../General/Action/IconAction/UnlockIconAction";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;


const FEEDBACK_TYPE = {
    CUSTOMER_FEEDBACK: 1,
    HOST_FEEDBACK: 2,
    REPLY: 3,
}

const FEEDBACK_OPTIONS = [
    { label: "Phản hồi từ khách hàng", value: FEEDBACK_TYPE.CUSTOMER_FEEDBACK },
    { label: "Phản hồi từ chủ farmstay", value: FEEDBACK_TYPE.HOST_FEEDBACK },
    { label: "Hồi đáp", value: FEEDBACK_TYPE.REPLY },
]

const getFeedbackTypeLabel = (type?: number | null) => {
    return FEEDBACK_OPTIONS.find(item => item.value === type)?.label ?? "Không xác định"
}

export default function FeedbackTable() {

    // State
    const [openView, setOpenView] = useState<boolean>(false);
    const [openBan, setOpenBan] = useState<boolean>(false);
    const [openUnban, setOpenUnban] = useState<boolean>(false);
    const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("FB", row.id)
        },
        {
            key: "user",
            label: "Người gửi",
            render: (row: any) => (
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"
                >
                    <AvatarWrapper
                        src={row.user.avatarURL}
                        name={row.user.name}
                    />
                    {row.user.name}
                </Box>
            )
        },
        {
            key: "farmstay",
            label: "Đối tượng đánh giá",
            render: (row: any) => (
                <OverlayTrigger
                    placement="bottom-start"
                    trigger="click"
                    overlay={
                        <Popover style={{ margin: "0px" }}>
                            <Popover.Header as="h3">{row.farmstay.name}</Popover.Header>
                            <Popover.Body>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <Box
                                            color="inherit !important"
                                        >
                                            {row.farmstay.contactInformation}
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <Box
                                            color="inherit !important"
                                            className="form-control"
                                        >
                                            {row.farmstay.description}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <Box className="tag tag-rounded btn">
                        <Box
                            display="flex"
                            alignItems="center"
                            gap="8px"
                        >
                            <HomeIcon />
                            {row.farmstay.name}
                        </Box>
                    </Box>
                </OverlayTrigger>
            )
        },
        {
            key: "type",
            label: "Loại",
            render: (row) => getFeedbackTypeLabel(row.type)
        },
        {
            key: "comment",
            label: "Nội dung",
            render: (row) => (
                <Tooltip title={row.comment} enterDelay={1000}>
                    <span>
                        <EllipsisWrapper breakWidth={200}>
                            {row.comment}
                        </EllipsisWrapper>
                    </span>
                </Tooltip>
            )
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findFeedbackStatus(row.status)} />
            )
        },
        {
            key: "action",
            label: "Thao tác",
            render: (row) => (
                <Box
                    component="div"
                    display="flex"
                    alignItems="center"
                    columnGap="8px"
                    fontSize="13px"
                >
                    <ViewIconAction
                        onClick={() => {
                            setOpenView(true);
                            setSelectedFeedback(row);
                        }}
                    />

                    <LockIconAction
                        onClick={() => {
                            setOpenBan(true);
                            setSelectedFeedback(row);
                        }}
                    />

                    <UnlockIconAction
                        onClick={() => {
                            setOpenUnban(true);
                            setSelectedFeedback(row);
                        }}
                    />
                </Box>
            )
        },
    ], []);

    const handleCloseView = useCallback(() => setOpenView(false), []);
    const handleCloseUnban = useCallback(() => setOpenUnban(false), []);
    const handleCloseBan = useCallback(() => setOpenBan(false), []);

    return (
        <>
            <MuiTables
                data={data}
                columns={columns}
            />

            <ViewFeedback
                open={openView}
                feedback={selectedFeedback}
                onClose={handleCloseView}
            />

            <UnbanFeedback
                open={openUnban}
                feedback={selectedFeedback}
                onClose={handleCloseUnban}
            />

            <BanFeedback
                open={openBan}
                feedback={selectedFeedback}
                onClose={handleCloseBan}
            />
        </>
    );
};
