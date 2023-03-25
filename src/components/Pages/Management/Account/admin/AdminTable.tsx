import { useMemo } from "react";
import MuiTables from "../../../../Mui-Table/MuiTable";
import { Box } from "@mui/material";
import { findAdminStatus } from "../../../../../setting/admin-setting";
import { Status } from "../../../../../setting/Status";
import AvatarWrapper from "../../../../General/Wrapper/AvatarWrapper";
import ViewIconAction from "../../../../General/Action/IconAction/ViewIconAction";
import { createCodeString } from "../../../../../helpers/stringUtils";
import { useNavigate } from "react-router-dom";
import useAdmins from "../hooks/useAdmins";
import useDelayLoading from "../../../../../hooks/useDelayLoading";
import { ROLES } from "../../../../../setting/setting";
import StringWrapper from "../../../../General/Wrapper/StringWrapper";

export default function AdminTable() {

    const navigate = useNavigate();

    const {
        data,
        loading,
        pagination,
        rowsPerPageOptions,
        handleChangePage,
        handleChangeRowsPerPage
    } = useAdmins();

    const delay = useDelayLoading(loading);

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
            render: (row) => <StringWrapper text={row.email} />
        },
        {
            key: "phoneNumber",
            label: "Số điện thoại",
            render: (row) => <StringWrapper text={row.phoneNumber} />
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
            data={data.filter(item => item.role === ROLES.ADMIN)}
            columns={columns}
            loadingData={delay}
            pagination={{
                count: pagination.totalItem,
                handleChangePage,
                handleChangeRowsPerPage,
                rowsPerPageOptions,
                page: pagination.page,
                rowsPerPage: pagination.pageSize,
            }}
        />
    );
};
