import { useMemo } from "react";
import json from "./admin.json";
import { UserData } from "../account-interface";
import MuiTables from "../../../../Mui-Table/MuiTable";
import { Box } from "@mui/material";
import { findAdminStatus } from "../../../../../setting/admin-setting";
import { Status } from "../../../../../setting/Status";
import AvatarWrapper from "../../../../General/Wrapper/AvatarWrapper";
import ViewIconAction from "../../../../General/Action/IconAction/ViewIconAction";
import { createCodeString } from "../../../../../helpers/stringUtils";
import { useNavigate } from "react-router-dom";

const dataObject = JSON.parse(JSON.stringify(json));
const userData: UserData = dataObject.data;

export default function AdminTable() {

    const navigate = useNavigate();

    // Memorize
    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã tài khoản",
            render: (row: any) => createCodeString("AD", row.id)
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
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findAdminStatus(row.status)} />
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
                        onClick={() => navigate(`/management/account/admin/${row.id}`)}
                    />
                </Box>
            )
        },
    ], [navigate]);

    return (
        <MuiTables
            data={userData}
            columns={columns}
        />
    );
};
