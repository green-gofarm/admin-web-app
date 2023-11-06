import { Box, CircularProgress, Grid } from '@mui/material'
import Select from 'react-select';
import MuiTables from '../../../../../Mui-Table/MuiTable';
import { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import { Status } from '../../../../../../setting/Status';
import ViewIconAction from '../../../../../General/Action/IconAction/ViewIconAction';
import { LIST_ORDER_STATUS, findOrderStatus } from '../../../../../../setting/order-setting';
import { convertToMoney, createCodeString } from '../../../../../../helpers/stringUtils';
import { formatTimeString, getTimeAgoString } from '../../../../../../helpers/dateUtils';
import SearchIcon from '@mui/icons-material/Search';
import useFarmstayOrders from '../hooks/useFarmstayOrders';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { removeNullProps } from '../../../../../../setting/general-props';
import { useNavigate } from 'react-router-dom';
import useBackUrl from '../../../../../../hooks/useBackUrl';
import useAllCustomers from '../../../Account/hooks/useAllCustomers';
import UserTag from '../../../../../General/Wrapper/UserTag';
import { getCustomerFromList } from '../../../../../../setting/customer-setting';

interface OrderHistoryTabProps {
    detail?: any,
    loading?: boolean,
}

const customControlStyles: CSSProperties = {
    minWidth: 180
};


function OrderHistoryTab({
    detail,
    loading
}: OrderHistoryTabProps) {

    const { allCustomers } = useAllCustomers();

    const [filters, setFilters] = useState<{ status: any }>({
        status: null,
    });

    const [searchText, setSearchText] = useState("");


    const handleOnChange = useCallback((value: any, key: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }, []);

    const {
        data,
        loading: loadingOrder,
        pagination,
        rowsPerPageOptions,
        refresh,
        handleChangePage,
        handleChangeRowsPerPage
    } = useFarmstayOrders(true, detail?.id);

    const delay = useDelayLoading(loading || loadingOrder);

    useEffect(() => {
        const params = {
            Id: searchText || null,
            Status: filters.status?.value ?? null
        }
        refresh(undefined, removeNullProps(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const handleSubmit = () => {
        const params = {
            Id: searchText || null,
            Status: filters.status?.value ?? null
        }
        refresh(undefined, removeNullProps(params));
    }

    const navigate = useNavigate();
    const { createBackUrl } = useBackUrl();

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã đơn",
            render: (row: any) => createCodeString("OD", row.id)
        },
        {
            key: "customerId",
            label: "Khách hàng",
            render: (row: any) => (
                <UserTag
                    user={getCustomerFromList(allCustomers, row.customerId)}
                />
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
            label: "Thời gian tạo đơn",
            render: (row: any) => row.createdDate
                ? `${formatTimeString(row.createdDate)} (${getTimeAgoString(row.createdDate)})`
                : "-"
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
            label: "Thao tác",
            render: (row) => (
                <Box
                    component="div"
                    display="flex"
                    alignItems="center"
                    columnGap="8px"
                    fontSize="13px"
                >
                    <ViewIconAction
                        onClick={() => navigate(`/management/order/${row.id}?backUrl=${createBackUrl()}`)}
                    />
                </Box>
            )
        },
    ], [allCustomers, createBackUrl, navigate]);

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
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value ?? "")}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                    <Box
                        component="span"
                        className="input-group-append"
                        maxHeight="38px"
                    >
                        <button
                            className="btn ripple btn-primary"
                            type="button"
                            onClick={handleSubmit}
                        >
                            {delay
                                ? <CircularProgress
                                    size={16}
                                    thickness={4}
                                    sx={{
                                        color: "inherit"
                                    }}
                                />
                                : <SearchIcon />
                            }
                        </button>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs="auto">
                <Grid container spacing={2}>
                    <Grid item xs="auto">

                        <Select
                            value={filters.status}
                            onChange={(option) => handleOnChange(option, "status")}
                            options={LIST_ORDER_STATUS}
                            placeholder="Trạng thái"
                            isSearchable
                            isClearable
                            styles={{
                                container(base, props) {
                                    return {
                                        ...base,
                                        ...customControlStyles,
                                    }
                                },
                            }}
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
            loadingData={delay}
            filter={renderFilter()}
            pagination={{
                count: pagination.totalItem,
                handleChangePage,
                handleChangeRowsPerPage,
                rowsPerPageOptions,
                page: pagination.page,
                rowsPerPage: pagination.pageSize,
            }}
        />
    )
}

export default OrderHistoryTab