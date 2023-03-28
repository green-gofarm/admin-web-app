import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import ViewIconAction from "../../../General/Action/IconAction/ViewIconAction";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";
import { formatTimeString, getTimeAgoString } from "../../../../helpers/dateUtils";
import { LIST_ORDER_STATUS, ORDER_SORT_BY_OPTIONS, findOrderStatus } from "../../../../setting/order-setting";
import { useNavigate } from "react-router-dom";
import useOrders, { defaultOrdersPagination } from "./hooks/useOrders";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import useDelayLoading from "../../../../hooks/useDelayLoading";
import { removeNullProps } from "../../../../setting/general-props";
import { Card, FormGroup } from "react-bootstrap";
import useBackUrl from "../../../../hooks/useBackUrl";
import { getCustomerFromList } from "../../../../setting/customer-setting";
import DisplayLinkUser from "../../../General/DisplayLinkUser";
import useAllCustomers from "../../Management/Account/hooks/useAllCustomers";
import DisplayLinkFarmstay from "../../../General/Link/DisplayLinkFarmstay";
import useAllFarmstays from "../../Management/Farmstay/hooks/useAllFarmstay";
import { getFarmstayFromList } from "../../../../setting/farmstay-setting";

interface FilterProps {
    status: any
}

export default function OrderTable() {

    const { allCustomers } = useAllCustomers();
    const { allFarmstays } = useAllFarmstays();

    const [filters, setFilters] = useState<FilterProps>({
        status: null,
    });

    const [searchText, setSearchText] = useState("");

    const [sort, setSort] = useState<any>(() => {
        const result = ORDER_SORT_BY_OPTIONS.find(item =>
            item.sortValue.orderBy === defaultOrdersPagination.orderBy
            && item.sortValue.orderDirection === defaultOrdersPagination.orderDirection
        ) ?? ORDER_SORT_BY_OPTIONS[0];
        return result;
    })

    const handleOnChange = useCallback((value: any, key: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }, []);

    const {
        data,
        loading,
        pagination,
        rowsPerPageOptions,
        refresh,
        handleChangePage,
        handleChangeRowsPerPage
    } = useOrders(true);

    const delay = useDelayLoading(loading);

    useEffect(() => {
        const params = {
            Id: searchText || null,
            Status: filters.status?.value ?? null
        }
        refresh(undefined, removeNullProps(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    useEffect(() => {
        if (sort) {
            refresh({
                ...pagination,
                orderBy: sort.sortValue?.orderBy,
                orderDirection: sort.sortValue?.orderDirection
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort]);

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
                <DisplayLinkUser
                    user={getCustomerFromList(allCustomers, row.customerId)}
                />
            )
        },
        {
            key: "farmstayId",
            label: "Farmstay",
            render: (row: any) => (
                <DisplayLinkFarmstay
                    farmstayPath="/management/farmstay"
                    farmstay={getFarmstayFromList(allFarmstays, row?.farmstayId)}
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
    ], [allCustomers, allFarmstays, createBackUrl, navigate]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            <div className="input-group mb-0">
                                <input
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value ?? "")}
                                    type="text"
                                    className="form-control"
                                    autoFocus
                                    placeholder="Tìm kiếm theo mã đơn hàng"
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                />
                                <span className="input-group-append">
                                    <button
                                        disabled={delay}
                                        className="btn ripple btn-primary"
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        <Box display="flex" gap="4px" alignItems="center">
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
                                            <Box>
                                                Tìm kiếm
                                            </Box>
                                        </Box>
                                    </button>
                                </span>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="main-content-body-profile mt-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md="auto">
                                        <FormGroup className="form-group">
                                            <Box minWidth="160px">
                                                <Select
                                                    value={filters.status}
                                                    onChange={(option) => handleOnChange(option, "status")}
                                                    options={LIST_ORDER_STATUS}
                                                    placeholder="Trạng thái"
                                                    isSearchable
                                                    isClearable
                                                />
                                            </Box>
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={6} md="auto">
                                        <FormGroup className="form-group">
                                            <Select
                                                value={sort}
                                                onChange={(option) => setSort(option)}
                                                options={ORDER_SORT_BY_OPTIONS}
                                                placeholder="Sắp xếp theo"
                                                isSearchable
                                            />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            </div>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <MuiTables
                        data={data}
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

                </Grid>
            </Grid>
        </>
    );
};
