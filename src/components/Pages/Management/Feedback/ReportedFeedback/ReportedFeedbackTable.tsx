import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Grid, Tooltip } from "@mui/material";
import { Card, FormGroup } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import { FEEDBACK_SORT_BY_OPTIONS } from "../../../../../setting/feedback-setting";
import useReportedFeedback, { defaultReportedFeedbacksPagination } from "../hooks/useReportedFeedback";
import useDelayLoading from "../../../../../hooks/useDelayLoading";
import { removeNullProps } from "../../../../../setting/general-props";
import { createCodeString } from "../../../../../helpers/stringUtils";
import EllipsisWrapper from "../../../../General/Wrapper/EllipsisWrapper";
import ViewIconAction from "../../../../General/Action/IconAction/ViewIconAction";
import LockIconAction from "../../../../General/Action/IconAction/LockIconAction";
import UnlockIconAction from "../../../../General/Action/IconAction/UnlockIconAction";
import MuiTables from "../../../../Mui-Table/MuiTable";
import ViewFeedback from "../action/ViewFeedback";
import UnbanFeedback from "../action/UnbanFeedback";
import BanFeedback from "../action/BanFeedback";
import DisplayUser from "../../../../General/DisplayUser";
import { Link } from "react-router-dom";
import useBackUrl from "../../../../../hooks/useBackUrl";
import { getCustomerFromList } from "../../../../../setting/customer-setting";
import useAllCustomers from "../../Account/hooks/useAllCustomers";

export default function FeedbackTable() {

    const { allCustomers } = useAllCustomers();
    const { createBackUrl } = useBackUrl();

    // State
    const [openView, setOpenView] = useState<boolean>(false);
    const [openBan, setOpenBan] = useState<boolean>(false);
    const [openUnban, setOpenUnban] = useState<boolean>(false);
    const [selectedFeedback, setSelectedFeedback] = useState<any>(null);


    const [searchText, setSearchText] = useState("");

    const [sort, setSort] = useState<any>(() => {
        const result = FEEDBACK_SORT_BY_OPTIONS.find(item =>
            item.sortValue.orderBy === defaultReportedFeedbacksPagination.orderBy
            && item.sortValue.orderDirection === defaultReportedFeedbacksPagination.orderDirection
        ) ?? FEEDBACK_SORT_BY_OPTIONS[0];
        return result;
    })

    const {
        data,
        loading,
        pagination,
        rowsPerPageOptions,
        refresh,
        handleChangePage,
        handleChangeRowsPerPage
    } = useReportedFeedback(true);

    const delay = useDelayLoading(loading);

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

                    <LockIconAction
                        onClick={() => {
                            setOpenBan(true);
                            setSelectedFeedback(row);
                        }}
                    />

                    <UnlockIconAction
                        onClick={() => {
                            setOpenUnban(true);
                            setSelectedFeedback(row);
                        }}
                    />
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
            />

            <BanFeedback
                open={openBan}
                feedback={selectedFeedback}
                onClose={handleCloseBan}
            />
        </>
    );
};
