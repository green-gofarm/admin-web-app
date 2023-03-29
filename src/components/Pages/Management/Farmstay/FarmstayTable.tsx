import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import ViewIconAction from "../../../General/Action/IconAction/ViewIconAction";
import { FARMSTAY_SORT_BY_OPTIONS, LIST_FARMSTAY_STATUS, findFarmstayStatus, isActiveFarmstay, isInActiveFarmstay, isPendingApproveFarmstay } from "../../../../setting/farmstay-setting";
import { createCodeString } from "../../../../helpers/stringUtils";
import { useNavigate } from "react-router-dom";
import ActivateFarmstay from "./action/ActivateFarmstay";
import InactivateFarmstay from "./action/InactivateFarmstay";
import LockIconAction from "../../../General/Action/IconAction/LockIconAction";
import UnlockIconAction from "../../../General/Action/IconAction/UnlockIconAction";
import useFarmstays, { defaultFarmstaysPagination } from "./hooks/useFarmstays";
import { Card, FormGroup } from "react-bootstrap";
import Select from 'react-select';
import useDelayLoading from "../../../../hooks/useDelayLoading";
import { removeNullProps } from "../../../../setting/general-props";
import SearchIcon from "@mui/icons-material/Search";
import useBackUrl from "../../../../hooks/useBackUrl";
import { getHostFromList } from "../../../../setting/host-setting";
import useAllHosts from "../Account/hooks/useAllHosts";
import ConditionWrapper from "../../../General/Wrapper/ConditionWrapper";

import GradingIcon from "@mui/icons-material/Grading";
import TooltipIconAction from "../../../General/Icon/TooltipIconAction";
import UserLinkTag from "../../../General/Wrapper/UserLinkTag";

interface FilterProps {
    status: any,
}

export default function FarmstayTable() {

    const navigate = useNavigate();
    const { createBackUrl } = useBackUrl();
    const { allHosts } = useAllHosts();

    const [filters, setFilters] = useState<FilterProps>({
        status: null,
    });

    const [searchText, setSearchText] = useState("");

    const [sort, setSort] = useState<any>(() => {
        const result = FARMSTAY_SORT_BY_OPTIONS.find(item =>
            item.sortValue.orderBy === defaultFarmstaysPagination.orderBy
            && item.sortValue.orderDirection === defaultFarmstaysPagination.orderDirection
        ) ?? FARMSTAY_SORT_BY_OPTIONS[0];
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
    } = useFarmstays(true);

    const delay = useDelayLoading(loading);

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

    const handleSubmit = () => {
        const params = {
            Name: searchText || null,
            Status: filters.status?.value ?? null
        }
        refresh(undefined, removeNullProps(params));
    }

    // State
    const [openInactivate, setOpenInactivate] = useState<boolean>(false);
    const [openActive, setOpenActive] = useState<boolean>(false);
    const [selectedFarmstay, setSelectedFarmstay] = useState<any>(null);

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("FR", row.id)
        },
        {
            key: "name",
            label: "Tên",
        },
        {
            key: "hostId",
            label: "Chủ sở hữu",
            render: (row) => (
                <UserLinkTag user={getHostFromList(allHosts, row?.hostId)} />
            )
        },
        {
            key: "rating",
            label: "Đánh giá",
            render: (row) => new Array(row.rating).fill("").map((_, index) => (
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
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findFarmstayStatus(row.status)} />
            )
        },
        {
            key: "action",
            label: "Thao tác",
            render: (row) => (
                <Box
                    component="div"
                    display="flex"
                >
                    <ConditionWrapper isRender={isPendingApproveFarmstay(row.status)}>
                        <TooltipIconAction
                            title="Phê duyệt"
                            Icon={GradingIcon}
                            onClick={() => navigate(`/management/farmstay/preview/${row.id}?backUrl=${createBackUrl()}`)}
                        />
                    </ConditionWrapper>

                    <ConditionWrapper isRender={isActiveFarmstay(row.status) || isInActiveFarmstay(row.status)}>
                        <ViewIconAction
                            onClick={() => navigate(`/management/farmstay/all/${row.id}?backUrl=${createBackUrl()}`)}
                        />
                    </ConditionWrapper>

                    <ConditionWrapper isRender={isActiveFarmstay(row.status)}>
                        <LockIconAction
                            onClick={() => {
                                setOpenInactivate(true);
                                setSelectedFarmstay(row);
                            }}
                        />
                    </ConditionWrapper>

                    <ConditionWrapper isRender={isInActiveFarmstay(row.status)}>
                        <UnlockIconAction
                            onClick={() => {
                                setOpenActive(true);
                                setSelectedFarmstay(row);
                            }}
                        />
                    </ConditionWrapper>
                </Box>
            )
        },
    ], [allHosts, createBackUrl, navigate]);

    const handleCloseActive = useCallback(() => setOpenActive(false), []);
    const handleCloseInactivate = useCallback(() => setOpenInactivate(false), []);

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
                                                    options={LIST_FARMSTAY_STATUS}
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
                                                options={FARMSTAY_SORT_BY_OPTIONS}
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

            <ActivateFarmstay
                open={openActive}
                farmstay={selectedFarmstay}
                onClose={handleCloseActive}
                refresh={refresh}
            />

            <InactivateFarmstay
                open={openInactivate}
                farmstay={selectedFarmstay}
                onClose={handleCloseInactivate}
                refresh={refresh}
            />
        </>
    );
};
