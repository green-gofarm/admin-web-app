import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Grid, Tooltip } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import EllipsisWrapper from "../../../General/Wrapper/EllipsisWrapper";
import ViewIconAction from "../../../General/Action/IconAction/ViewIconAction";
import { FEEDBACK_SORT_BY_OPTIONS, FEEDBACK_STATUSES, LIST_FEEDBACK_STATUS, findFeedbackStatus } from "../../../../setting/feedback-setting";
import { createCodeString } from "../../../../helpers/stringUtils";
import { Card, FormGroup } from "react-bootstrap";
import LockIconAction from "../../../General/Action/IconAction/LockIconAction";
import ViewFeedback from "./action/ViewFeedback";
import UnbanFeedback from "./action/UnbanFeedback";
import BanFeedback from "./action/BanFeedback";
import UnlockIconAction from "../../../General/Action/IconAction/UnlockIconAction";
import useFeedbacks, { defaultFeedbacksPagination } from "./hooks/useFeedbacks";
import useDelayLoading from "../../../../hooks/useDelayLoading";
import { removeNullProps } from "../../../../setting/general-props";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import useAllCustomers from "../Account/hooks/useAllCustomers";
import { Link } from "react-router-dom";
import useBackUrl from "../../../../hooks/useBackUrl";
import DisplayUser from "../../../General/DisplayUser";
import { getCustomerFromList } from "../../../../setting/customer-setting";
import ConditionWrapper from "../../../General/Wrapper/ConditionWrapper";

interface FilterProps {
    status: any,
}

export default function FeedbackTable() {

    const { allCustomers } = useAllCustomers();
    const { createBackUrl } = useBackUrl();

    // State
    const [openView, setOpenView] = useState<boolean>(false);
    const [openBan, setOpenBan] = useState<boolean>(false);
    const [openUnban, setOpenUnban] = useState<boolean>(false);
    const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

    const [filters, setFilters] = useState<FilterProps>({
        status: null,
    });

    const [searchText, setSearchText] = useState("");

    const [sort, setSort] = useState<any>(() => {
        const result = FEEDBACK_SORT_BY_OPTIONS.find(item =>
            item.sortValue.orderBy === defaultFeedbacksPagination.orderBy
            && item.sortValue.orderDirection === defaultFeedbacksPagination.orderDirection
        ) ?? FEEDBACK_SORT_BY_OPTIONS[0];
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
    } = useFeedbacks(true);

    const delay = useDelayLoading(loading);

    useEffect(() => {
        const params = {
            Comment: searchText || null,
            Status: filters.status?.value ?? null,
        };
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
        };
        refresh(undefined, removeNullProps(params));
    }

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("FB", row.id)
        },
        {
            key: "orderId",
            label: "Đơn hàng",
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
            key: "user",
            label: "Người phản hồi",
            render: (row: any) => (
                <DisplayUser user={getCustomerFromList(allCustomers, row?.customerId)} />
            )
        },
        {
            key: "comment",
            label: "Nội dung",
            render: (row) => (
                <Tooltip title={row.comment} enterDelay={1000}>
                    <span>
                        <EllipsisWrapper breakWidth={200}>
                            {row.comment}
                        </EllipsisWrapper>
                    </span>
                </Tooltip>
            )
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findFeedbackStatus(row.status)} />
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
                        onClick={() => {
                            setOpenView(true);
                            setSelectedFeedback(row);
                        }}
                    />

                    <ConditionWrapper isRender={row.status === FEEDBACK_STATUSES.ACTIVE}>
                        <LockIconAction
                            onClick={() => {
                                setOpenBan(true);
                                setSelectedFeedback(row);
                            }}
                        />
                    </ConditionWrapper>

                    <ConditionWrapper isRender={row.status === FEEDBACK_STATUSES.BANNED}>
                        <UnlockIconAction
                            onClick={() => {
                                setOpenUnban(true);
                                setSelectedFeedback(row);
                            }}
                        />
                    </ConditionWrapper>
                </Box>
            )
        },
    ], [allCustomers, createBackUrl]);

    const handleCloseView = useCallback(() => setOpenView(false), []);
    const handleCloseUnban = useCallback(() => setOpenUnban(false), []);
    const handleCloseBan = useCallback(() => setOpenBan(false), []);

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
                                    placeholder="Tìm kiếm theo từ khóa"
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
                                                    options={LIST_FEEDBACK_STATUS}
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
                                                options={FEEDBACK_SORT_BY_OPTIONS}
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

            <ViewFeedback
                open={openView}
                feedback={selectedFeedback}
                onClose={handleCloseView}
            />

            <UnbanFeedback
                open={openUnban}
                feedback={selectedFeedback}
                onClose={handleCloseUnban}
                refresh={refresh}
            />

            <BanFeedback
                open={openBan}
                feedback={selectedFeedback}
                onClose={handleCloseBan}
                refresh={refresh}
            />
        </>
    );
};
