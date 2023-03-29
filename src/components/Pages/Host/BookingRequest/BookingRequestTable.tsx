import { useCallback, useMemo, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import MuiTables from "../../../Mui-Table/MuiTable";
import ViewIconAction from "../../../General/Action/IconAction/ViewIconAction";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";
import { isExpire } from "../../../../helpers/dateUtils";
import { useNavigate } from "react-router-dom";
import ApproveIconAction from "../../../General/Action/IconAction/ApproveIconAction";
import RejectIconAction from "../../../General/Action/IconAction/RejectIconAction";
import { BookingCountdown } from "./ui-segment/BookingCountdown";
import ApproveBookingRequest from "./action/ApproveBookingRequest";
import RejectBookingRequest from "./action/RejectBookingRequest";
import useBookingRequests from "./hooks/useBookingRequests";
import useDelayLoading from "../../../../hooks/useDelayLoading";
import useAllCustomers from "../../Management/Account/hooks/useAllCustomers";
import { getCustomerFromList } from "../../../../setting/customer-setting";
import useBackUrl from "../../../../hooks/useBackUrl";
import { Badge, Card } from "react-bootstrap";
import RefreshIcon from "@mui/icons-material/Refresh";
import DisplayLinkFarmstay from "../../../General/Link/DisplayLinkFarmstay";
import { getFarmstayFromList } from "../../../../setting/farmstay-setting";
import useAllFarmstays from "../../Management/Farmstay/hooks/useAllFarmstay";
import UserLinkTag from "../../../General/Wrapper/UserLinkTag";

export default function BookingRequestTable() {
    const navigate = useNavigate();
    const { createBackUrl } = useBackUrl();
    const { allFarmstays } = useAllFarmstays();
    const { allCustomers } = useAllCustomers();

    const [openApprove, setOpenApprove] = useState<boolean>(false);
    const [openReject, setOpenReject] = useState<boolean>(false);
    const [selectedBookingRequest, setSelectedBookingRequest] = useState<any>(null);

    const {
        data,
        handleChangePage,
        handleChangeRowsPerPage,
        loading,
        pagination,
        refresh,
        rowsPerPageOptions
    } = useBookingRequests();

    const delay = useDelayLoading(loading);

    const columns = useMemo(() => [
        {
            key: "code",
            label: "Mã đơn",
            render: (row: any) => createCodeString("OD", row.id)
        },
        {
            key: "customerId",
            label: "Khách hàng",
            render: (row: any) => (
                <UserLinkTag
                    user={getCustomerFromList(allCustomers, row.customerId)}
                />
            )
        },
        {
            key: "farmstayId",
            label: "Farmstay",
            render: (row: any) => (
                <DisplayLinkFarmstay
                    farmstayPath="/management/farmstay"
                    farmstay={getFarmstayFromList(allFarmstays, row?.farmstayId)}
                />
            )
        },
        {
            key: "totalPrice",
            label: "Tổng tiền",
            align: "right",
            render: (row: any) => convertToMoney(row.totalPrice)
        },
        {
            key: "approveExpiredTime",
            label: "Thời hạn duyệt",
            render: (row: any) => <BookingCountdown dateString={row.approveExpiredTime} />
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
                        onClick={() => navigate(`/management/booking-request/${row.id}?backUrl=${createBackUrl()}`)}
                    />
                    {isExpire(row.approveExpiredTime)
                        ? null
                        : <>
                            <ApproveIconAction
                                onClick={() => {
                                    setSelectedBookingRequest(row);
                                    setOpenApprove(true);
                                }}
                            />
                            <RejectIconAction
                                onClick={() => {
                                    setSelectedBookingRequest(row);
                                    setOpenReject(true);
                                }}
                            />
                        </>
                    }
                </Box>
            )
        },
    ], [allCustomers, allFarmstays, createBackUrl, navigate]);

    const handleCloseApprove = useCallback(() => setOpenApprove(false), []);
    const handleCloseReject = useCallback(() => setOpenReject(false), []);

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
                                        {pagination.totalItem}
                                    </Badge>
                                    đơn cần duyệt
                                </Box>

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<RefreshIcon />}
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

            {openApprove
                ? <ApproveBookingRequest
                    open={openApprove}
                    onClose={handleCloseApprove}
                    booking={selectedBookingRequest}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openReject
                ? <RejectBookingRequest
                    open={openReject}
                    onClose={handleCloseReject}
                    booking={selectedBookingRequest}
                    onSuccessCallback={refresh}
                />
                : null
            }

        </>
    );
};
