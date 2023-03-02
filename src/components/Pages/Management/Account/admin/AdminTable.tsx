import { useMemo } from "react";
import json from "./admin.json";
import { UserData } from "../account-interface";
import MuiTables from "../../../../Mui-Table/MuiTable";
import { Box, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { findAdminStatus } from "../../../../../setting/admin-setting";
import { Status } from "../../../../../setting/Status";
import AvatarWrapper from "../../../../General/AvatarWrapper";

const dataObject = JSON.parse(JSON.stringify(json));
const userData: UserData = dataObject.data;

export const AdminTable = () => {

    const columns = useMemo(() => [
        {
            key: "name",
            label: "Họ và tên",
            render: (row: any) => (
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"
                    width="140px"
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
            render: (row) => (
                <Box width="120px">
                    {row.email}
                </Box>
            )
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
                    component="div"
                    display="flex"
                    alignItems="center"
                    columnGap="8px"
                    fontSize="13px"
                >
                    <span>
                        <IconButton
                            style={{ padding: 5 }}
                        >
                            <EditIcon />
                        </IconButton>
                    </span>

                    <span>
                        <IconButton
                            style={{ padding: 5 }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </span>
                </Box>
            )
        },
    ], []);

    return (
        <MuiTables
            data={userData}
            columns={columns}
        />
    );
};
