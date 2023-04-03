import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Grid, Tooltip } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import EllipsisWrapper from "../../../General/Wrapper/EllipsisWrapper";
import { formatTimeString, getTimeAgoString } from "../../../../helpers/dateUtils";
import { ROOM_CATEGORY_STATUSES, findRoomCategoryStatus } from "../../../../setting/room-category-setting";
import { createCodeString } from "../../../../helpers/stringUtils";
import CreateRoomCategory from "./action/CreateRoomCategory";
import EditIconAction from "../../../General/Action/IconAction/EditIconAction";
import EditRoomCategory from "./action/EditRoomCategory";
import InactivateRoomCategory from "./action/InactivateRoomCategory";
import AddAction from "../../../General/Action/ButtonAction/AddAction";
import useRoomCategories from "./hooks/useRoomCategories";
import useDelayLoading from "../../../../hooks/useDelayLoading";
import { removeNullProps } from "../../../../setting/general-props";
import { Card } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import ActivateRoomCategory from "./action/ActivateRoomCategory";
import ConditionWrapper from "../../../General/Wrapper/ConditionWrapper";
import LockIconAction from "../../../General/Action/IconAction/LockIconAction";
import UnlockIconAction from "../../../General/Action/IconAction/UnlockIconAction";

export default function RoomCategoryTable() {

    // State
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openInactivate, setOpenInactivate] = useState<boolean>(false);
    const [openActivate, setOpenActivate] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const [searchText, setSearchText] = useState("");

    const {
        data,
        loading,
        pagination,
        rowsPerPageOptions,
        refresh,
        handleChangePage,
        handleChangeRowsPerPage
    } = useRoomCategories();

    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        const params = {
            Name: searchText || null,
        }
        refresh(undefined, removeNullProps(params));
    }

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Memorize
    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("RC", row.id)
        },
        {
            key: "name",
            label: "Tên",
            render: (row: any) => (
                <EllipsisWrapper breakWidth={120}>
                    {row.name}
                </EllipsisWrapper>
            )
        },
        {
            key: "description",
            label: "Mô tả",
            render: (row) => (
                <Tooltip title={row.description} enterDelay={1000}>
                    <span>
                        <EllipsisWrapper breakWidth={200}>
                            {row.description}
                        </EllipsisWrapper>
                    </span>
                </Tooltip>
            )
        },
        {
            key: "createdDate",
            label: "Lần cập nhật cuối",
            render: (row: any) => row.updatedDate
                ? `${formatTimeString(row.updatedDate)} (${getTimeAgoString(row.updatedDate)})`
                : "-"
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (row) => (
                <Status statusObject={findRoomCategoryStatus(row.status)} />
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
                    <EditIconAction
                        onClick={() => {
                            setOpenEdit(true);
                            setSelectedCategory(row);
                        }}
                    />

                    <ConditionWrapper isRender={row.status === ROOM_CATEGORY_STATUSES.ACTIVE}>
                        <LockIconAction
                            onClick={() => {
                                setOpenInactivate(true);
                                setSelectedCategory(row);
                            }}
                        />
                    </ConditionWrapper>

                    <ConditionWrapper isRender={row.status === ROOM_CATEGORY_STATUSES.INACTIVE}>
                        <UnlockIconAction
                            onClick={() => {
                                setOpenActivate(true);
                                setSelectedCategory(row);
                            }}
                        />
                    </ConditionWrapper>
                </Box>
            )
        },
    ], []);

    const handleCloseCreate = useCallback(() => {
        setOpenCreate(false);
        setSelectedCategory(null);
    }, []);
    const handleCloseEdit = useCallback(() => {
        setOpenEdit(false);
        setSelectedCategory(null);
    }, []);
    const handleCloseInactivate = useCallback(() => {
        setOpenInactivate(false);
        setSelectedCategory(null);
    }, []);
    const handleCloseActivate = useCallback(() => {
        setOpenActivate(false);
        setSelectedCategory(null);
    }, []);

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
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <MuiTables
                        data={data}
                        columns={columns}
                        loadingData={delay}
                        panel={<AddAction onClick={() => setOpenCreate(true)} />}
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

            <CreateRoomCategory
                open={openCreate}
                onClose={handleCloseCreate}
                refresh={refresh}
            />

            <EditRoomCategory
                open={openEdit}
                roomCategory={selectedCategory}
                onClose={handleCloseEdit}
                refresh={refresh}
            />

            <InactivateRoomCategory
                open={openInactivate}
                roomCategory={selectedCategory}
                onClose={handleCloseInactivate}
                refresh={refresh}
            />

            <ActivateRoomCategory
                open={openActivate}
                roomCategory={selectedCategory}
                onClose={handleCloseActivate}
                refresh={refresh}
            />
        </>
    );
};
