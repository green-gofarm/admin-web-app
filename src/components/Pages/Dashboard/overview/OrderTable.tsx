import { useMemo } from "react";
import json from "./order.json";
import { Box } from "@mui/material";
import MuiTables from "../../../Mui-Table/MuiTable";
import AvatarWrapper from "../../../General/Wrapper/AvatarWrapper";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";
import { formatTimeString } from "../../../../helpers/dateUtils";
import { useNavigate } from "react-router-dom";
import { Status } from "../../../../setting/Status";
import { findOrderStatus } from "../../../../setting/order-setting";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;

export default function OrderTable() {

    const navigate = useNavigate();

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
            label: "Thời gian tạo đơn",
            render: (row: any) => formatTimeString(row.createdDate)
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findOrderStatus(row.status)} />
            )
        }
    ], []);

    return (
        <>
            <MuiTables
                title="Danh sách đơn mới"
                data={data}
                columns={columns}
                // noPaging
                panel={
                    <Box
                        className="btn btn-primary shadow"
                        onClick={() => navigate("/management/order")}
                        sx={{
                            padding: "4px 8px !important",
                            fontSize: "12px"
                        }}
                    >
                        Đến quản lý
                    </Box>
                }
            />
        </>
    );
};
