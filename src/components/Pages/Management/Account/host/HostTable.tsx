import { useCallback, useEffect, useMemo, useState } from "react";
import MuiTables from "../../../../Mui-Table/MuiTable";
import { Box, CircularProgress, Grid } from "@mui/material";
import { Status } from "../../../../../setting/Status";
import { HOST_SORT_BY_OPTIONS, LIST_HOST_STATUS, findHostStatus } from "../../../../../setting/host-setting";
import ViewIconAction from "../../../../General/Action/IconAction/ViewIconAction";
import LockIconAction from "../../../../General/Action/IconAction/LockIconAction";
import UnlockIconAction from "../../../../General/Action/IconAction/UnlockIconAction";
import { createCodeString } from "../../../../../helpers/stringUtils";
import BanHost from "./action/BanHost";
import UnbanHost from "./action/UnbanHost";
import { useNavigate } from "react-router-dom";
import { Card, FormGroup } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import useHosts from "../hooks/useHosts";
import useDelayLoading from "../../../../../hooks/useDelayLoading";
import { ROLES } from "../../../../../setting/setting";
import { defaultHostsPagination } from "../hooks/useAdmins";
import { removeNullProps } from "../../../../../setting/general-props";
import StringWrapper from "../../../../General/Wrapper/StringWrapper";
import { isActiveUser, isBannedUser } from "../../../../../setting/user-setting";
import ConditionWrapper from "../../../../General/Wrapper/ConditionWrapper";
import useBackUrl from "../../../../../hooks/useBackUrl";
import UserTag from "../../../../General/Wrapper/UserTag";


interface FilterProps {
    status: any,
}

export default function HostTable() {

    const navigate = useNavigate();
    const { createBackUrl } = useBackUrl();

    const [filters, setFilters] = useState<FilterProps>({
        status: null,
    });

    const [searchText, setSearchText] = useState("");

    const [sort, setSort] = useState<any>(() => {
        const result = HOST_SORT_BY_OPTIONS.find(item =>
            item.sortValue.orderBy === defaultHostsPagination.orderBy
            && item.sortValue.orderDirection === defaultHostsPagination.orderDirection
        ) ?? HOST_SORT_BY_OPTIONS[0];
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
    } = useHosts();

    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        const params = {
            Name: searchText || null,
            Status: filters.status?.value ?? null
        }
        refresh(undefined, removeNullProps(params));
    }

    useEffect(() => {
        const params = {
            Name: searchText || null,
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


    // State
    const [openBan, setOpenBan] = useState<boolean>(false);
    const [openUnban, setOpenUnban] = useState<boolean>(false);
    const [selectedHost, setSelectedHost] = useState<any>(null);

    // Memorize
    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("HO", row.id)
        },
        {
            key: "name",
            label: "Họ và tên",
            render: (row: any) => (
                <UserTag user={row} />
            )
        },
        {
            key: "email",
            label: "Email",
            render: (row) => <StringWrapper text={row.email} />
        },
        {
            key: "phoneNumber",
            label: "Số điện thoại",
            render: (row) => <StringWrapper text={row.phoneNumber} />
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findHostStatus(row.status)} />
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
                        onClick={() => navigate(`/management/account/host/${row.id}?backUrl=${createBackUrl()}`)}
                    />

                    <ConditionWrapper isRender={isActiveUser(row.status)}>
                        <LockIconAction
                            onClick={() => {
                                setOpenBan(true);
                                setSelectedHost(row);
                            }}
                        />
                    </ConditionWrapper>

                    <ConditionWrapper isRender={isBannedUser(row.status)}>

                        <UnlockIconAction
                            onClick={() => {
                                setOpenUnban(true);
                                setSelectedHost(row);
                            }}
                        />
                    </ConditionWrapper>
                </Box>
            )
        },
    ], [createBackUrl, navigate]);

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
                                                    options={LIST_HOST_STATUS}
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
                                                options={HOST_SORT_BY_OPTIONS}
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
                        data={data.filter(item => item.role === ROLES.HOST)}
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

            <BanHost
                open={openBan}
                onClose={handleCloseBan}
                host={selectedHost}
                refresh={refresh}
            />
            <UnbanHost
                open={openUnban}
                onClose={handleCloseUnban}
                host={selectedHost}
                refresh={refresh}
            />
        </>
    );
};
