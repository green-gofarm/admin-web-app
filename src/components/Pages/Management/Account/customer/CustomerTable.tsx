import { useMemo } from "react";
import json from "./customer.json";
import { UserData } from "../account-interface";
import MuiTables from "../../../../Mui-Table/MuiTable";
import { Box, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Status } from "../../../../../setting/Status";
import AvatarWrapper from "../../../../General/AvatarWrapper";
import { findCustomerStatus } from "../../../../../setting/customer-setting";

const dataObject = JSON.parse(JSON.stringify(json));
const userData: UserData = dataObject.data;

export const CustomerTable = () => {

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
            key: "createdDate",
            label: "Ngày tham gia",
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
