import { useMemo } from "react";
import { Box } from "@mui/material";
import MuiTables from "../../../Mui-Table/MuiTable";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";
import { formatTimeString } from "../../../../helpers/dateUtils";
import { useNavigate } from "react-router-dom";
import { Status } from "../../../../setting/Status";
import { findOrderStatus } from "../../../../setting/order-setting";
import useOrders from "../../Management/Order/hooks/useOrders";
import UserLinkTag from "../../../General/Wrapper/UserLinkTag";
import useAllCustomers from "../../Management/Account/hooks/useAllCustomers";
import { getCustomerFromList } from "../../../../setting/customer-setting";


export default function OrderTable() {

    const navigate = useNavigate();
    const { allCustomers } = useAllCustomers();

    const {
        data
    } = useOrders();

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã đơn",
            render: (row: any) => createCodeString("OD", row.id)
        },
        {
            key: "customerId",
            label: "Khách hàng",
            render: (row: any) => (
                <UserLinkTag
                    user={getCustomerFromList(allCustomers, row.customerId)}
                />
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
    ], [allCustomers]);

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
