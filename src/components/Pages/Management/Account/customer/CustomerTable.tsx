import { useCallback, useEffect, useMemo, useState } from "react";
import MuiTables from "../../../../Mui-Table/MuiTable";
import { Box, CircularProgress, Grid } from "@mui/material";
import { Status } from "../../../../../setting/Status";
import AvatarWrapper from "../../../../General/Wrapper/AvatarWrapper";
import { CUSTOMER_SORT_BY_OPTIONS, LIST_CUSTOMER_STATUS, findCustomerStatus } from "../../../../../setting/customer-setting";
import ViewIconAction from "../../../../General/Action/IconAction/ViewIconAction";
import LockIconAction from "../../../../General/Action/IconAction/LockIconAction";
import UnlockIconAction from "../../../../General/Action/IconAction/UnlockIconAction";
import { createCodeString } from "../../../../../helpers/stringUtils";
import BanCustomer from "./action/BanCustomer";
import UnbanCustomer from "./action/UnbanCustomer";
import { useNavigate } from "react-router-dom";
import useCustomers, { defaultCustomersPagination } from "../hooks/useCustomers";
import useDelayLoading from "../../../../../hooks/useDelayLoading";
import { removeNullProps } from "../../../../../setting/general-props";
import { Card, FormGroup } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import { ROLES } from "../../../../../setting/setting";
import { convertISOToNaturalFormat } from "../../../../../helpers/dateUtils";

interface FilterProps {
    status: any,
}

export default function CustomerTable() {

    const navigate = useNavigate();

    const [filters, setFilters] = useState<FilterProps>({
        status: null,
    });

    const [searchText, setSearchText] = useState("");

    const [sort, setSort] = useState<any>(() => {
        const result = CUSTOMER_SORT_BY_OPTIONS.find(item =>
            item.sortValue.orderBy === defaultCustomersPagination.orderBy
            && item.sortValue.orderDirection === defaultCustomersPagination.orderDirection
        ) ?? CUSTOMER_SORT_BY_OPTIONS[0];
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
    } = useCustomers();

    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        const params = {
            name: searchText || null,
            status: filters.status?.value ?? null
        }
        refresh(undefined, removeNullProps(params));
    }

    useEffect(() => {
        const params = {
            name: searchText || null,
            status: filters.status?.value ?? null
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

    // State
    const [openBan, setOpenBan] = useState<boolean>(false);
    const [openUnban, setOpenUnban] = useState<boolean>(false);
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

    // Memorize
    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("CU", row.id)
        },
        {
            key: "name",
            label: "Họ và tên",
            render: (row: any) => (
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"
                >
                    <AvatarWrapper
                        src={row.avatarURL}
                        name={row.name}
                    />
                    {row.name}
                </Box>
            )
        },
        {
            key: "email",
            label: "Email",
        },
        {
            key: "phoneNumber",
            label: "Số điện thoại",
        },
        {
            key: "updatedDate",
            label: "Lần cập nhật cuối",
            render: (row) => row.updatedDate
                ? `${convertISOToNaturalFormat(row.updatedDate)}`
                : "-"
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findCustomerStatus(row.status)} />
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
                        onClick={() => navigate(`/management/account/customer/${row.id}`)}
                    />
                    <LockIconAction
                        onClick={() => {
                            setOpenBan(true);
                            setSelectedCustomer(row);
                        }}
                    />
                    <UnlockIconAction
                        onClick={() => {
                            setOpenUnban(true);
                            setSelectedCustomer(row);
                        }}
                    />
                </Box>
            )
        },
    ], [navigate]);

    const handleCloseBan = useCallback(() => setOpenBan(false), []);
    const handleCloseUnban = useCallback(() => setOpenUnban(false), []);

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
                                    placeholder="Tìm kiếm theo tên"
                                    disabled={delay}
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
                                                    options={LIST_CUSTOMER_STATUS}
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
                                                options={CUSTOMER_SORT_BY_OPTIONS}
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
                        data={data.filter(item => item.role === ROLES.CUSTOMER)}
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

            <BanCustomer
                open={openBan}
                onClose={handleCloseBan}
                customer={selectedCustomer}
            />
            <UnbanCustomer
                open={openUnban}
                onClose={handleCloseUnban}
                customer={selectedCustomer}
            />
        </>
    );
};
