import { useCallback, useMemo, useState } from "react";
import json from "./service-category.json";
import { Box, Tooltip } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import EllipsisWrapper from "../../../General/Wrapper/EllipsisWrapper";
import { findServiceCategoryStatus } from "../../../../setting/service-category-setting";
import { formatTimeString } from "../../../../helpers/dateUtils";
import DeleteIconAction from "../../../General/Action/IconAction/DeleteIconAction";
import { createCodeString } from "../../../../helpers/stringUtils";
import CreateServiceCategory from "./action/CreateServiceCategory";
import EditServiceCategory from "./action/EditServiceCategory";
import InactivateServiceCategory from "./action/InactivateServiceCategory";
import DeleteServiceCategory from "./action/DeleteServiceCategory";
import EditIconAction from "../../../General/Action/IconAction/EditIconAction";
import InactivateIconAction from "../../../General/Action/IconAction/InactivateIconAction";
import AddAction from "../../../General/Action/ButtonAction/AddAction";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;

export default function ServiceCategoryTable() {

    // State
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [openInactivate, setOpenInactivate] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);


    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("SC", row.id)
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
                <Status statusObject={findServiceCategoryStatus(row.status)} />
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

            <CreateServiceCategory
                open={openCreate}
                onClose={handleCloseCreate}
            />

            <EditServiceCategory
                open={openEdit}
                serviceCategory={selectedCategory}
                onClose={handleCloseEdit}
            />

            <InactivateServiceCategory
                open={openInactivate}
                serviceCategory={selectedCategory}
                onClose={handleCloseInactivate}
            />

            <DeleteServiceCategory
                open={openDelete}
                serviceCategory={selectedCategory}
                onClose={handleCloseDelete}
            />
        </>
    );
};
