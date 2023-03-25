import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Grid, Tooltip } from "@mui/material";
import { Status } from "../../../../setting/Status";
import MuiTables from "../../../Mui-Table/MuiTable";
import EllipsisWrapper from "../../../General/Wrapper/EllipsisWrapper";
import { formatTimeString, getTimeAgoString } from "../../../../helpers/dateUtils";
import { createCodeString } from "../../../../helpers/stringUtils";
import EditIconAction from "../../../General/Action/IconAction/EditIconAction";
import AddAction from "../../../General/Action/ButtonAction/AddAction";
import { Card } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { removeNullProps } from "../../../../setting/general-props";
import useDelayLoading from "../../../../hooks/useDelayLoading";
import useServiceCategories from "./hooks/useTagCategories";
import CreateTag from "./action/CreateTag";
import EditTag from "./action/EditTag";
import InactivateTag from "./action/InactivateTag";
import { TAG_CATEGORY_STATUSES, findActivityTagStatus } from "../../../../setting/tag-category-setting";
import ConditionWrapper from "../../../General/Wrapper/ConditionWrapper";
import LockIconAction from "../../../General/Action/IconAction/LockIconAction";
import UnlockIconAction from "../../../General/Action/IconAction/UnlockIconAction";
import ActivateTag from "./action/ActivateTag";

export default function TagTable() {

    // State
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openInactivate, setOpenInactivate] = useState<boolean>(false);
    const [openActivate, setOpenActivate] = useState<boolean>(false);
    const [selectedTag, setSelectedTag] = useState<any>(null);

    const [searchText, setSearchText] = useState("");

    const {
        data,
        loading,
        pagination,
        rowsPerPageOptions,
        refresh,
        handleChangePage,
        handleChangeRowsPerPage
    } = useServiceCategories();

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

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("TG", row.id)
        },
        {
            key: "name",
            label: "Thẻ",
            render: (row: any) => (
                <Box className="tag tag-rounded">
                    {row.name}
                </Box>
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
                <Status statusObject={findActivityTagStatus(row.status)} />
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
                            setSelectedTag(row);
                        }}
                    />

                    <ConditionWrapper isRender={row.status === TAG_CATEGORY_STATUSES.ACTIVE}>
                        <LockIconAction
                            onClick={() => {
                                setOpenInactivate(true);
                                setSelectedTag(row);
                            }}
                        />
                    </ConditionWrapper>

                    <ConditionWrapper isRender={row.status === TAG_CATEGORY_STATUSES.INACTIVE}>
                        <UnlockIconAction
                            onClick={() => {
                                setOpenActivate(true);
                                setSelectedTag(row);
                            }}
                        />
                    </ConditionWrapper>
                </Box>
            )
        },
    ], []);


    const handleCloseCreate = useCallback(() => {
        setOpenCreate(false);
        setSelectedTag(null);
    }, []);
    const handleCloseEdit = useCallback(() => {
        setOpenEdit(false);
        setSelectedTag(null);
    }, []);
    const handleCloseInactivate = useCallback(() => {
        setOpenInactivate(false);
        setSelectedTag(null);
    }, []);
    const handleCloseActivate = useCallback(() => {
        setOpenActivate(false);
        setSelectedTag(null);
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

            <CreateTag
                open={openCreate}
                onClose={handleCloseCreate}
                refresh={refresh}
            />

            <EditTag
                open={openEdit}
                tagCategory={selectedTag}
                refresh={refresh}
                onClose={handleCloseEdit}
            />

            <InactivateTag
                open={openInactivate}
                tagCategory={selectedTag}
                onClose={handleCloseInactivate}
                refresh={refresh}
            />

            <ActivateTag
                open={openActivate}
                tagCategory={selectedTag}
                onClose={handleCloseActivate}
                refresh={refresh}
            />
        </>
    );
};
