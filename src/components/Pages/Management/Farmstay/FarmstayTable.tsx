import { useCallback, useMemo, useState } from "react";
import json from "./farmstay.json";
import { Box } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import EllipsisWrapper from "../../../General/Wrapper/EllipsisWrapper";
import ViewIconAction from "../../../General/Action/IconAction/ViewIconAction";
import { findFarmstayStatus } from "../../../../setting/farmstay-setting";
import { createCodeString } from "../../../../helpers/stringUtils";
import { useNavigate } from "react-router-dom";
import ActivateFarmstay from "./action/ActivateFarmstay";
import InactivateFarmstay from "./action/InactivateFarmstay";
import LockIconAction from "../../../General/Action/IconAction/LockIconAction";
import UnlockIconAction from "../../../General/Action/IconAction/UnlockIconAction";
import AvatarWrapper from "../../../General/Wrapper/AvatarWrapper";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;

export default function FarmstayTable() {

    const navigate = useNavigate();

    // State
    const [openInactivate, setOpenInactivate] = useState<boolean>(false);
    const [openActive, setOpenActive] = useState<boolean>(false);
    const [selectedFarmstay, setSelectedFarmstay] = useState<any>(null);

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
                        src={require("../../../../assets/img/photos/farmstay.jpg")}
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
            key: "rating",
            label: "Đánh giá",
            render: (row) => new Array(row.rating).fill("").map((_, index) => (
                <Box
                    key={index}
                    component="span"
                    className="text-warning"
                    fontSize="20px"
                >
                    &#8902;
                </Box>
            ))
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findFarmstayStatus(row.status)} />
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
                    <ViewIconAction
                        onClick={() => navigate(`/management/farmstay/all/${row.id}`)}
                    />
                    <LockIconAction
                        onClick={() => {
                            setOpenInactivate(true);
                            setSelectedFarmstay(row);
                        }}
                    />
                    <UnlockIconAction
                        onClick={() => {
                            setOpenActive(true);
                            setSelectedFarmstay(row);
                        }}
                    />
                </Box>
            )
        },
    ], [navigate]);

    const handleCloseActive = useCallback(() => setOpenActive(false), []);
    const handleCloseInactivate = useCallback(() => setOpenInactivate(false), []);


    return (
        <>
            <MuiTables
                data={data}
                columns={columns}
            />

            <ActivateFarmstay
                open={openActive}
                farmstay={selectedFarmstay}
                onClose={handleCloseActive}
            />

            <InactivateFarmstay
                open={openInactivate}
                farmstay={selectedFarmstay}
                onClose={handleCloseInactivate}
            />
        </>
    );
};
