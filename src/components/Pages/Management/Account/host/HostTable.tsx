import { useCallback, useMemo, useState } from "react";
import json from "./host.json";
import { UserData } from "../account-interface";
import MuiTables from "../../../../Mui-Table/MuiTable";
import { Box } from "@mui/material";
import { Status } from "../../../../../setting/Status";
import AvatarWrapper from "../../../../General/Wrapper/AvatarWrapper";
import { findHostStatus } from "../../../../../setting/host-setting";
import ViewIconAction from "../../../../General/Action/IconAction/ViewIconAction";
import LockIconAction from "../../../../General/Action/IconAction/LockIconAction";
import UnlockIconAction from "../../../../General/Action/IconAction/UnlockIconAction";
import { createCodeString } from "../../../../../helpers/stringUtils";
import BanHost from "./action/BanHost";
import UnbanHost from "./action/UnbanHost";
import { useNavigate } from "react-router-dom";

const dataObject = JSON.parse(JSON.stringify(json));
const userData: UserData = dataObject.data;

export default function HostTable() {

    const navigate = useNavigate();

    // State
    const [openBan, setOpenBan] = useState<boolean>(false);
    const [openUnban, setOpenUnban] = useState<boolean>(false);
    const [selectedHost, setSelectedHost] = useState<any>(null);

    // Memorize
    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("HO", row.id)
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
                <Status statusObject={findHostStatus(row.status)} />
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
                        onClick={() => navigate(`/management/account/host/${row.id}`)}
                    />
                    <LockIconAction
                        onClick={() => {
                            setOpenBan(true);
                            setSelectedHost(row);
                        }}
                    />
                    <UnlockIconAction
                        onClick={() => {
                            setOpenUnban(true);
                            setSelectedHost(row);
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
            />

            <BanHost
                open={openBan}
                onClose={handleCloseBan}
                host={selectedHost}
            />
            <UnbanHost
                open={openUnban}
                onClose={handleCloseUnban}
                host={selectedHost}
            />
        </>
    );
};
