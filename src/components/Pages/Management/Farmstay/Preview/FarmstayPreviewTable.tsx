import { useMemo } from "react";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createCodeString } from "../../../../../helpers/stringUtils";
import AvatarWrapper from "../../../../General/Wrapper/AvatarWrapper";
import TooltipIconAction from "../../../../General/Icon/TooltipIconAction";
import GradingIcon from "@mui/icons-material/Grading";
import MuiTables from "../../../../Mui-Table/MuiTable";
import usePreviewFarmstays from "../hooks/usePreviewFarmstays";
import { Badge, Card } from "react-bootstrap";
import RefreshIcon from '@mui/icons-material/Refresh';
import useDelayLoading from "../../../../../hooks/useDelayLoading";
import useBackUrl from "../../../../../hooks/useBackUrl";
import useAllHosts from "../../Account/hooks/useAllHosts";
import { getHostFromList } from "../../../../../setting/host-setting";
import DisplayLinkUser from "../../../../General/DisplayLinkUser";

export default function FarmstayPreviewTable() {

    const navigate = useNavigate();
    const { createBackUrl } = useBackUrl();
    const { allHosts } = useAllHosts();

    const {
        data,
        loading,
        pagination,
        rowsPerPageOptions,
        refresh,
        handleChangePage,
        handleChangeRowsPerPage
    } = usePreviewFarmstays();

    const delay = useDelayLoading(loading);

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã",
            render: (row: any) => createCodeString("FR", row.id)
        },
        {
            key: "name",
            label: "Tên gọi",
            render: (row: any) => (
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"
                >
                    <AvatarWrapper
                        src={require("../../../../../assets/img/photos/farmstay.jpg")}
                        name={row.name}
                    />
                    {row.name}
                </Box>
            )
        },
        {
            key: "hostId",
            label: "Chủ sở hữu",
            render: (row) => (
                <DisplayLinkUser
                    user={getHostFromList(allHosts, row?.hostId)}
                />
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
                    <TooltipIconAction
                        title="Phê duyệt"
                        Icon={GradingIcon}
                        onClick={() => navigate(`/management/farmstay/preview/${row.id}?backUrl=${createBackUrl()}`)}
                    />
                </Box>
            )
        },
    ], [allHosts, createBackUrl, navigate]);


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Box component="h5" fontWeight="500" className="mb-0">
                                    Đang có
                                    <Badge
                                        bg=""
                                        className=" badge-primary-transparent tx-16 font-weight-bold text-primiary ms-2 me-2"
                                    >
                                        {data.length}
                                    </Badge>
                                    farmstay cần phê duyệt
                                </Box>

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={
                                        delay
                                            ? <CircularProgress size={16} thickness={4} />
                                            : <RefreshIcon />
                                    }
                                    onClick={() => refresh()}
                                >
                                    Làm mới
                                </Button>
                            </Box>
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
