import { useCallback, useMemo, useState } from "react";
import json from "./order.json";
import { Box } from "@mui/material";
import MuiTables from "../../../Mui-Table/MuiTable";
import AvatarWrapper from "../../../General/Wrapper/AvatarWrapper";
import ViewIconAction from "../../../General/Action/IconAction/ViewIconAction";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";
import { formatTimeString, isValidDate } from "../../../../helpers/dateUtils";
import { useLocation, useNavigate } from "react-router-dom";
import ApproveIconAction from "../../../General/Action/IconAction/ApproveIconAction";
import RejectIconAction from "../../../General/Action/IconAction/RejectIconAction";
import { BookingCountdown } from "./ui-segment/BookingCountdown";
import ApproveBookingRequest from "./action/ApproveBookingRequest";
import RejectBookingRequest from "./action/RejectBookingRequest";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;

const isExpire = (dateString: string | any) => {
    console.log(isValidDate(dateString));
    if (!isValidDate(dateString)) return true;
    return new Date(dateString).getTime() <= Date.now();
}

export default function BookingRequestTable() {

    const navigate = useNavigate();
    const location = useLocation();

    const [openApprove, setOpenApprove] = useState<boolean>(false);
    const [openReject, setOpenReject] = useState<boolean>(false);
    const [selectedBookingRequest, setSelectedBookingRequest] = useState<any>(null);

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã đơn",
            render: (row: any) => createCodeString("OD", row.id)
        },
        {
            key: "user",
            label: "Khách hàng",
            render: (row: any) => (
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"
                >
                    <AvatarWrapper
                        src={row.customer.avatarURL}
                        name={row.customer.name}
                    />
                    {row.customer.name}
                </Box>
            )
        },
        {
            key: "totalPrice",
            label: "Tổng tiền",
            align: "right",
            render: (row: any) => convertToMoney(row.totalPrice)
        },
        {
            key: "createdDate",
            label: "Ngày tạo đơn",
            render: (row: any) => formatTimeString(row.createdDate)
        },
        {
            key: "expiredTime",
            label: "Thời hạn duyệt",
            render: (row: any) => <BookingCountdown dateString={row.expiredTime} />
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
                        onClick={() => navigate(`/management/booking-request/${row.id}?backUrl=${location.pathname + location.search}`)}
                    />
                    {isExpire(row.expiredTime)
                        ? null
                        : <>
                            <ApproveIconAction
                                onClick={() => {
                                    setSelectedBookingRequest(row);
                                    setOpenApprove(true);
                                }}
                            />
                            <RejectIconAction
                                onClick={() => {
                                    setSelectedBookingRequest(row);
                                    setOpenReject(true);
                                }}
                            />
                        </>
                    }
                </Box>
            )
        },
    ], [location, navigate]);

    const handleCloseApprove = useCallback(() => setOpenApprove(false), []);
    const handleCloseReject = useCallback(() => setOpenReject(false), []);

    return (
        <>
            <MuiTables
                data={data}
                columns={columns}
            />

            <ApproveBookingRequest
                open={openApprove}
                onClose={handleCloseApprove}
                request={selectedBookingRequest}
            />

            <RejectBookingRequest
                open={openReject}
                onClose={handleCloseReject}
                request={selectedBookingRequest}
            />
        </>
    );
};
