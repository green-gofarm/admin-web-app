import { useCallback, useMemo, useState } from "react";
import json from "./room-category.json";
import { Box, Tooltip } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import EllipsisWrapper from "../../../General/Wrapper/EllipsisWrapper";
import { formatTimeString } from "../../../../helpers/dateUtils";
import { findRoomCategoryStatus } from "../../../../setting/room-category-setting";
import DeleteIconAction from "../../../General/Action/IconAction/DeleteIconAction";
import { createCodeString } from "../../../../helpers/stringUtils";
import InactivateIconAction from "../../../General/Action/IconAction/InactivateIconAction";
import CreateRoomCategory from "./action/CreateRoomCategory";
import EditIconAction from "../../../General/Action/IconAction/EditIconAction";
import EditRoomCategory from "./action/EditRoomCategory";
import InactivateRoomCategory from "./action/InactivateRoomCategory";
import DeleteRoomCategory from "./action/DeleteRoomCategory";
import AddAction from "../../../General/Action/ButtonAction/AddAction";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;

export default function RoomCategoryTable() {

    // State
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [openInactivate, setOpenInactivate] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    // Memorize
    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("RC", row.id)
        },
        {
            key: "name",
            label: "Tên",
            render: (row: any) => (
                <EllipsisWrapper breakWidth={120}>
                    {row.name}
                </EllipsisWrapper>
            )
        },
        {
            key: "description",
            label: "Mô tả",
            render: (row) => (
                <Tooltip title={row.description} enterDelay={1000}>
                    <span>
                        <EllipsisWrapper breakWidth={200}>
                            {row.description}
                        </EllipsisWrapper>
                    </span>
                </Tooltip>
            )
        },
        {
            key: "createdDate",
            label: "Ngày tạo",
            render: (row: any) => formatTimeString(row.createdDate)
        },
        {
            key: "updatedDate",
            label: "Lần cập nhật cuối",
            render: (row: any) => formatTimeString(row.updatedDate)
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findRoomCategoryStatus(row.status)} />
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
                    <EditIconAction
                        onClick={() => {
                            setOpenEdit(true);
                            setSelectedCategory(row);
                        }}
                    />
                    <InactivateIconAction
                        onClick={() => {
                            setOpenInactivate(true);
                            setSelectedCategory(row);
                        }}
                    />
                    <DeleteIconAction
                        onClick={() => {
                            setOpenDelete(true);
                            setSelectedCategory(row);
                        }}
                    />
                </Box>
            )
        },
    ], []);

    const handleCloseCreate = useCallback(() => setOpenCreate(false), []);
    const handleCloseEdit = useCallback(() => setOpenEdit(false), []);
    const handleCloseInactivate = useCallback(() => setOpenInactivate(false), []);
    const handleCloseDelete = useCallback(() => setOpenDelete(false), []);

    return (
        <>
            <MuiTables
                data={data}
                columns={columns}
                panel={<AddAction onClick={() => setOpenCreate(true)} />}
            />

            <CreateRoomCategory
                open={openCreate}
                onClose={handleCloseCreate}
            />

            <EditRoomCategory
                open={openEdit}
                roomCategory={selectedCategory}
                onClose={handleCloseEdit}
            />

            <InactivateRoomCategory
                open={openInactivate}
                roomCategory={selectedCategory}
                onClose={handleCloseInactivate}
            />

            <DeleteRoomCategory
                open={openDelete}
                roomCategory={selectedCategory}
                onClose={handleCloseDelete}
            />
        </>
    );
};
