import { useMemo } from "react";
import json from "./withdrawal-request.json";
import { Box } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import AvatarWrapper from "../../../General/Wrapper/AvatarWrapper";
import { WITHDRAWAL_REQUEST_STATUSES, findWithdrawalRequestStatus } from "../../../../setting/withdrawl-request-setting";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";

//Mui icon
import { formatTimeString, getTimeAgoString } from "../../../../helpers/dateUtils";
import ViewIconAction from "../../../General/Action/IconAction/ViewIconAction";
import ApproveIconAction from "../../../General/Action/IconAction/ApproveIconAction";
import RejectIconAction from "../../../General/Action/IconAction/RejectIconAction";
import useBackUrl from "../../../../hooks/useBackUrl";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;


export default function WithdrawalRequestTable() {

    const { handleNavigateWithBackUrl } = useBackUrl();

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã đơn",
            render: (row: any) => createCodeString("WR", row.orderId)
        },
        {
            key: "host",
            label: "Người yêu cầu",
            render: (row: any) => (
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"
                >
                    <AvatarWrapper
                        src={row.host.avatarURL}
                        name={row.host.name}
                    />
                    {row.host.name}
                </Box>
            )
        },
        {
            key: "amount",
            label: "Số tiền thanh toán",
            align: "right",
            render: (row: any) => convertToMoney(row.amount) ?? "-"
        },
        {
            key: "createdDate",
            label: "Thời gian",
            render: (row: any) => row.createdDate
                ? `${formatTimeString(row.createdDate)} (${getTimeAgoString(row.createdDate)})`
                : "-"
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findWithdrawalRequestStatus(row.status)} />
            )
        },
        {
            key: "action",
            label: "Thao tác",
            render: (row) => (
                <Box
                    display="flex"
                    alignItems="center"
                    columnGap="8px"
                >
                    <ViewIconAction
                        onClick={() => handleNavigateWithBackUrl(`/management/withdrawal-request/${row.id}`)}
                    />
                    {row.status === WITHDRAWAL_REQUEST_STATUSES.PENDING
                        ? <>
                            <ApproveIconAction />
                            <RejectIconAction />
                        </>
                        : null
                    }
                </Box>
            )
        },
    ], [handleNavigateWithBackUrl]);

    return (
        <>
            <MuiTables
                data={data}
                columns={columns}
            />
        </>
    );
};
