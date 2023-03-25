import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, FormGroup, Grid } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import { LIST_WITHDRAWAL_REQUEST_STATUS, WITHDRAWAL_REQUEST_SORT_BY_OPTIONS, findWithdrawalRequestStatus } from "../../../../setting/withdrawl-request-setting";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";

//Mui icon
import { formatTimeString, getTimeAgoString } from "../../../../helpers/dateUtils";
import ViewIconAction from "../../../General/Action/IconAction/ViewIconAction";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import { Card } from "react-bootstrap";
import useDisbursement, { defaultDisbursementsPagination } from "./hooks/useDisbursement";
import useDelayLoading from "../../../../hooks/useDelayLoading";
import { removeNullProps } from "../../../../setting/general-props";
import { Link, useNavigate } from "react-router-dom";
import useBackUrl from "../../../../hooks/useBackUrl";

export default function WithdrawalRequestTable() {

    const [filters, setFilters] = useState<{ status: any }>({
        status: null,
    });

    const [searchText, setSearchText] = useState("");

    const [sort, setSort] = useState<any>(() => {
        const result = WITHDRAWAL_REQUEST_SORT_BY_OPTIONS.find(item =>
            item.sortValue.orderBy === defaultDisbursementsPagination.orderBy
            && item.sortValue.orderDirection === defaultDisbursementsPagination.orderDirection
        ) ?? WITHDRAWAL_REQUEST_SORT_BY_OPTIONS[0];
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
    } = useDisbursement(true);

    const delay = useDelayLoading(loading);

    useEffect(() => {
        const params = {
            OrderId: searchText || null,
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
            OrderId: searchText || null,
            Status: filters.status?.value ?? null
        }
        refresh(undefined, removeNullProps(params));
    }

    const navigate = useNavigate();
    const { createBackUrl } = useBackUrl();

    const columns = useMemo(() => [
        {
            key: "id",
            label: "Mã",
            render: (row: any) => createCodeString("WR", row.id)
        },
        {
            key: "orderId",
            label: "Mã đơn hàng",
            render: (row: any) => (
                <Box
                    component={Link}
                    to={`/management/order/${row.orderId}?backUrl=${createBackUrl()}`}
                    display="flex"
                    alignItems="center"
                    gap="8px"
                    className="tag tag-rounded"
                >
                    {createCodeString("OR", row.orderId)}
                </Box>
            )
        },
        {
            key: "amount",
            label: "Số tiền giải ngân",
            align: "right",
            render: (row: any) => convertToMoney(row.amount) ?? "-"
        },
        {
            key: "createdDate",
            label: "Thời gian",
            render: (row: any) => row.createdDate
                ? `${formatTimeString(row.createdDate)} (${getTimeAgoString(row.createdDate)})`
                : "-"
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findWithdrawalRequestStatus(row.status)} />
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
                        onClick={() => navigate(`/management/withdrawal-request/${row.id}?backUrl=${createBackUrl()}`)}
                    />
                </Box>
            )
        },
    ], [createBackUrl, navigate]);

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
                                    placeholder="Tìm kiếm theo tên mã tài khoản chủ farmstay"
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
                                                    options={LIST_WITHDRAWAL_REQUEST_STATUS}
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
                                                options={WITHDRAWAL_REQUEST_SORT_BY_OPTIONS}
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
