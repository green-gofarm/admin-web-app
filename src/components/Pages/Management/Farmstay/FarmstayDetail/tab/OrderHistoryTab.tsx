import { Box, Grid } from '@mui/material'
import Select from 'react-select';
import MuiTables from '../../../../../Mui-Table/MuiTable';
import { useMemo } from 'react';
import AvatarWrapper from '../../../../../General/Wrapper/AvatarWrapper';
import { Status } from '../../../../../../setting/Status';
import ViewIconAction from '../../../../../General/Action/IconAction/ViewIconAction';
import { findOrderStatus } from '../../../../../../setting/order-setting';
import { convertToMoney, createCodeString } from '../../../../../../helpers/stringUtils';
import { formatTimeString } from '../../../../../../helpers/dateUtils';
import SearchIcon from '@mui/icons-material/Search';
import json from "../../../Order/order.json";

const dataObject = JSON.parse(JSON.stringify(json));
const data = dataObject.data;

function OrderHistoryTab() {

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã đơn",
            render: (row: any) => createCodeString("OD", row.id)
        },
        {
            key: "user",
            label: "Khách hàng",
            render: (row: any) => (
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"
                >
                    <AvatarWrapper
                        src={row.customer.avatarURL}
                        name={row.customer.name}
                    />
                    {row.customer.name}
                </Box>
            )
        },
        {
            key: "totalPrice",
            label: "Tổng tiền",
            align: "right",
            render: (row: any) => convertToMoney(row.totalPrice)
        },
        {
            key: "createdDate",
            label: "Ngày tạo đơn",
            render: (row: any) => formatTimeString(row.createdDate)
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findOrderStatus(row.status)} />
            )
        },
        {
            key: "action",
            label: "",
            render: (row) => (
                <Box
                    component="div"
                    display="flex"
                    alignItems="center"
                    columnGap="8px"
                    fontSize="13px"
                >
                    <ViewIconAction />
                </Box>
            )
        },
    ], []);

    const renderFilter = () => (
        <Box
            component={Grid}
            container
            spacing={2}
        >
            <Grid item xs={12} sm="auto">
                <Box className="input-group mb-0">
                    <Box
                        component="input"
                        type="text"
                        className="form-control"
                        autoFocus
                        placeholder="Tìm kiếm theo mã đơn"
                        maxHeight="38px"
                        width="260px !important"
                        maxWidth="100%"
                    />
                    <Box
                        component="span"
                        className="input-group-append"
                        maxHeight="38px"
                    >
                        <button className="btn ripple btn-primary" type="button">
                            <SearchIcon />
                        </button>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs="auto">
                <Grid container spacing={2}>
                    <Grid item xs="auto">
                        <Select
                            // value={filters.status}
                            // onChange={(value) => handleOnChange(value, "status")}
                            options={[]}
                            classNamePrefix="selectproduct"
                            placeholder="Trạng thái"
                            isSearchable
                            isMulti
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )

    return (
        <MuiTables
            data={data}
            columns={columns}
            filter={renderFilter()}
        />
    )
}

export default OrderHistoryTab