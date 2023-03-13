import { useMemo } from "react";
import json from "../farmstay.json";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createCodeString } from "../../../../../helpers/stringUtils";
import AvatarWrapper from "../../../../General/Wrapper/AvatarWrapper";
import EllipsisWrapper from "../../../../General/Wrapper/EllipsisWrapper";
import TooltipIconAction from "../../../../General/Icon/TooltipIconAction";
import GradingIcon from "@mui/icons-material/Grading";
import MuiTables from "../../../../Mui-Table/MuiTable";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;

export default function FarmstayPreviewTable() {

    const navigate = useNavigate();

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("FR", row.id)
        },
        {
            key: "name",
            label: "Tên gọi",
            render: (row: any) => (
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"
                >
                    <AvatarWrapper
                        src={require("../../../../../assets/img/photos/farmstay.jpg")}
                        name={row.name}
                    />
                    {row.name}
                </Box>
            )
        },
        {
            key: "email",
            label: "Chủ sở hữu",
            render: (row) => (
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
            key: "address",
            label: "Địa chỉ",
            render: (row) => (
                <EllipsisWrapper breakWidth={200}>
                    {row.address}
                </EllipsisWrapper>
            )
        },
        {
            key: "action",
            label: "Thao tác",
            render: (row) => (
                <Box
                    component="div"
                    display="flex"
                >
                    <TooltipIconAction
                        title="Phê duyệt"
                        Icon={GradingIcon}
                        onClick={() => navigate(`/management/farmstay/preview/${row.id}`)}
                    />
                </Box>
            )
        },
    ], [navigate]);


    return (
        <>
            <MuiTables
                data={data}
                columns={columns}
            />
        </>
    );
};
