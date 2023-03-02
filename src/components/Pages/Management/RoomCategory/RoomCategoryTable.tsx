import { useMemo } from "react";
import json from "./room-category.json";
import { Box, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import EllipsisWrapper from "../../../General/EllipsisWrapper";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;

export const RoomCategoryTable = () => {

    const columns = useMemo(() => [
        {
            key: "name",
            label: "Tên",
            render: (row: any) => (
                <EllipsisWrapper breakWidth={120}>
                    {row.farmstay.name}
                </EllipsisWrapper>
            )
        },
        {
            key: "email",
            label: "Chủ sở hữu",
            render: (row) => (
                <EllipsisWrapper breakWidth={120}>
                    {row.host.name}
                </EllipsisWrapper>
            )
        },
        {
            key: "phoneNumber",
            label: "Thông tin liên hệ",
            render: (row) => (
                <EllipsisWrapper breakWidth={200}>
                    {row.farmstay.contactInformation}
                </EllipsisWrapper>
            )
        },
        {
            key: "address",
            label: "Địa chỉ",
            render: (row) => (
                <EllipsisWrapper breakWidth={200}>
                    {row.farmstay.address}
                </EllipsisWrapper>
            )
        },
        {
            key: "rating",
            label: "Đánh giá",
            render: (row) => new Array(row.reviews[0].rating).fill("").map((_, index) => (
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
            key: "farmstay.createdDate",
            label: "Ngày tạo",
            render: (row) => row.farmstay.createdDate
        },
        {
            key: "farmstay.updatedDate",
            label: "Lần cập nhật cuối",
            render: (row) => row.farmstay.updatedDate
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={{}} />
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
        <>
            <MuiTables
                data={data}
                columns={columns}
            />
        </>
    );
};
