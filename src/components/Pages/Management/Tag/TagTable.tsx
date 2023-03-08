import { useCallback, useMemo, useState } from "react";
import json from "./tag.json";
import { Box, Tooltip } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import EllipsisWrapper from "../../../General/Wrapper/EllipsisWrapper";
import DeleteIconAction from "../../../General/Action/IconAction/DeleteIconAction";
import { findActivityTagStatus } from "../../../../setting/activity-tags-setting";
import { formatTimeString } from "../../../../helpers/dateUtils";
import { createCodeString } from "../../../../helpers/stringUtils";
import EditIconAction from "../../../General/Action/IconAction/EditIconAction";
import InactivateIconAction from "../../../General/Action/IconAction/InactivateIconAction";
import CreateTag from "./action/CreateTag";
import EditTag from "./action/EditTag";
import InactivateTag from "./action/InactivateTag";
import DeleteTag from "./action/DeleteTag";
import AddAction from "../../../General/Action/ButtonAction/AddAction";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;

export default function TagTable() {

    // State
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [openInactivate, setOpenInactivate] = useState<boolean>(false);
    const [selectedTag, setSelectedTag] = useState<any>(null);

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("TG", row.id)
        },
        {
            key: "name",
            label: "Thẻ",
            render: (row: any) => (
                <Box className="tag tag-rounded">
                    {row.name}
                </Box>
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
                <Status statusObject={findActivityTagStatus(row.status)} />
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
                            setSelectedTag(row);
                        }}
                    />
                    <InactivateIconAction
                        onClick={() => {
                            setOpenInactivate(true);
                            setSelectedTag(row);
                        }}
                    />
                    <DeleteIconAction
                        onClick={() => {
                            setOpenDelete(true);
                            setSelectedTag(row);
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

            <CreateTag
                open={openCreate}
                onClose={handleCloseCreate}
            />

            <EditTag
                open={openEdit}
                tag={selectedTag}
                onClose={handleCloseEdit}
            />

            <InactivateTag
                open={openInactivate}
                tag={selectedTag}
                onClose={handleCloseInactivate}
            />

            <DeleteTag
                open={openDelete}
                tag={selectedTag}
                onClose={handleCloseDelete}
            />
        </>
    );
};
