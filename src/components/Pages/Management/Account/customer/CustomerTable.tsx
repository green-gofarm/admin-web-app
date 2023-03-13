import { useCallback, useMemo, useState } from "react";
import json from "./customer.json";
import { UserData } from "../account-interface";
import MuiTables from "../../../../Mui-Table/MuiTable";
import { Box } from "@mui/material";
import { Status } from "../../../../../setting/Status";
import AvatarWrapper from "../../../../General/Wrapper/AvatarWrapper";
import { findCustomerStatus } from "../../../../../setting/customer-setting";
import ViewIconAction from "../../../../General/Action/IconAction/ViewIconAction";
import LockIconAction from "../../../../General/Action/IconAction/LockIconAction";
import UnlockIconAction from "../../../../General/Action/IconAction/UnlockIconAction";
import { createCodeString } from "../../../../../helpers/stringUtils";
import BanCustomer from "./action/BanCustomer";
import UnbanCustomer from "./action/UnbanCustomer";
import { useNavigate } from "react-router-dom";

const dataObject = JSON.parse(JSON.stringify(json));
const userData: UserData = dataObject.data;

export default function CustomerTable() {

    const navigate = useNavigate();

    // State
    const [openBan, setOpenBan] = useState<boolean>(false);
    const [openUnban, setOpenUnban] = useState<boolean>(false);
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

    // Memorize
    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("CU", row.id)
        },
        {
            key: "name",
            label: "Họ và tên",
            render: (row: any) => (
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"
                >
                    <AvatarWrapper
                        src={row.avatarURL}
                        name={row.name}
                    />
                    {row.name}
                </Box>
            )
        },
        {
            key: "email",
            label: "Email",
            render: (row) => row.email
        },
        {
            key: "phoneNumber",
            label: "Số điện thoại",
            render: (row) => row.phoneNumber
        },
        {
            key: "updatedDate",
            label: "Lần cập nhật cuối",
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findCustomerStatus(row.status)} />
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
                        onClick={() => navigate(`/management/account/customer/${row.id}`)}
                    />
                    <LockIconAction
                        onClick={() => {
                            setOpenBan(true);
                            setSelectedCustomer(row);
                        }}
                    />
                    <UnlockIconAction
                        onClick={() => {
                            setOpenUnban(true);
                            setSelectedCustomer(row);
                        }}
                    />
                </Box>
            )
        },
    ], [navigate]);

    const handleCloseBan = useCallback(() => setOpenBan(false), []);
    const handleCloseUnban = useCallback(() => setOpenUnban(false), []);

    return (
        <>
            <MuiTables
                data={userData}
                columns={columns}
                fixedColumns={{ right: 1 }}
            />

            <BanCustomer
                open={openBan}
                onClose={handleCloseBan}
                customer={selectedCustomer}
            />
            <UnbanCustomer
                open={openUnban}
                onClose={handleCloseUnban}
                customer={selectedCustomer}
            />
        </>
    );
};
