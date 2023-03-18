import { useCallback, useMemo, useState } from "react";
import json from "./order.json";
import { Box } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import AvatarWrapper from "../../../General/Wrapper/AvatarWrapper";
import InactivateIconAction from "../../../General/Action/IconAction/InactivateIconAction";
import ViewIconAction from "../../../General/Action/IconAction/ViewIconAction";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";
import { formatTimeString } from "../../../../helpers/dateUtils";
import { findOrderStatus } from "../../../../setting/order-setting";
import CancelOrder from "./action/CancelOrder";
import { useLocation, useNavigate } from "react-router-dom";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;

export default function OrderTable() {

    const navigate = useNavigate();
    const location = useLocation();

    const [openCancel, setOpenCancel] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

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
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findOrderStatus(row.status)} />
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
                        onClick={() => navigate(`/management/order/${row.id}?backUrl=${location.pathname + location.search}`)}
                    />
                    <InactivateIconAction
                        title="Hủy"
                        onClick={() => {
                            setSelectedOrder(row);
                            setOpenCancel(true);
                        }}
                    />
                </Box>
            )
        },
    ], [location, navigate]);

    const handleCloseCancel = useCallback(() => setOpenCancel(false), []);

    return (
        <>
            <MuiTables
                data={data}
                columns={columns}
            />

            <CancelOrder
                open={openCancel}
                onClose={handleCloseCancel}
                order={selectedOrder}
            />
        </>
    );
};
