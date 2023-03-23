import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Grid, Tooltip } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import EllipsisWrapper from "../../../General/Wrapper/EllipsisWrapper";
import AvatarWrapper from "../../../General/Wrapper/AvatarWrapper";
import ViewIconAction from "../../../General/Action/IconAction/ViewIconAction";
import { FEEDBACK_SORT_BY_OPTIONS, FEEDBACK_TYPE_OPTIONS, LIST_FEEDBACK_STATUS, findFeedbackStatus } from "../../../../setting/feedback-setting";
import { createCodeString } from "../../../../helpers/stringUtils";
import HomeIcon from '@mui/icons-material/Home';
import { Card, FormGroup, OverlayTrigger, Popover } from "react-bootstrap";
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
import useAllFarmstays from "../Farmstay/hooks/useAllFarmstay";

const getFeedbackTypeLabel = (type?: number | null) => {
    return FEEDBACK_TYPE_OPTIONS.find(item => item.value === type)?.label ?? "Không xác định"
}

interface FilterProps {
    status: any,
    type: any
}

export default function FeedbackTable() {

    const { allFarmstays } = useAllFarmstays();

    console.log(allFarmstays);

    // State
    const [openView, setOpenView] = useState<boolean>(false);
    const [openBan, setOpenBan] = useState<boolean>(false);
    const [openUnban, setOpenUnban] = useState<boolean>(false);
    const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

    const [filters, setFilters] = useState<FilterProps>({
        status: null,
        type: null,
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
            name: searchText || null,
            status: filters.status?.value ?? null,
            type: filters.type?.value ?? null
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
            name: searchText || null,
            status: filters.status?.value ?? null
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
            key: "user",
            label: "Người gửi",
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
            key: "farmstay",
            label: "Đối tượng đánh giá",
            render: (row: any) => (
                <OverlayTrigger
                    placement="bottom-start"
                    trigger="click"
                    overlay={
                        <Popover style={{ margin: "0px" }}>
                            <Popover.Header as="h3">{row.name}</Popover.Header>
                            <Popover.Body>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <Box
                                            color="inherit !important"
                                        >
                                            {row.contactInformation}
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <Box
                                            color="inherit !important"
                                            className="form-control"
                                        >
                                            {row.description}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <Box className="tag tag-rounded btn">
                        <Box
                            display="flex"
                            alignItems="center"
                            gap="8px"
                        >
                            <HomeIcon />
                            {row.name}
                        </Box>
                    </Box>
                </OverlayTrigger>
            )
        },
        {
            key: "type",
            label: "Loại",
            render: (row) => getFeedbackTypeLabel(row.type)
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
    ], []);

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
                                                value={filters.type}
                                                onChange={(option) => handleOnChange(option, "type")}
                                                options={FEEDBACK_TYPE_OPTIONS}
                                                placeholder="Loại phản hồi"
                                                isSearchable
                                            />
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
            />

            <BanFeedback
                open={openBan}
                feedback={selectedFeedback}
                onClose={handleCloseBan}
            />
        </>
    );
};
