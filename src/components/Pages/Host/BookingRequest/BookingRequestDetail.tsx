import { Link, useParams } from "react-router-dom";
import PageHeader, { IBreadcrumbItem } from "../../../General/PageHeader";
import { Box, Divider, Grid } from "@mui/material";
import DetailPageHeaderTitle from "../../../General/DetailPageHeaderTitle";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";
import { Alert, Button, Card, Table } from "react-bootstrap";
import { convertISOToNaturalFormat, formatDate, isExpire } from "../../../../helpers/dateUtils";
import IconLabelDetail from "../../../General/Item/IconLabelDetail";
import { Status } from "../../../../setting/Status";
import { ORDER_STATUSES, findOrderStatus } from "../../../../setting/order-setting";
import HomeIcon from '@mui/icons-material/Home';
import useBackUrl from "../../../../hooks/useBackUrl";
import StringWrapper from "../../../General/Wrapper/StringWrapper";
import ConditionWrapper from "../../../General/Wrapper/ConditionWrapper";
import { useCallback, useMemo, useState } from "react";
import { getFarmstayFromList, renderAddress } from "../../../../setting/farmstay-setting";
import { isAvailableArray } from "../../../../helpers/arrayUtils";
import useContactInfo from "../../Management/Farmstay/FarmstayDetail/hooks/useContactInfo";
import { ROLES } from "../../../../setting/setting";
import useUserDetail from "../../Management/Account/hooks/useUserDetail";
import useAllFarmstays from "../../Management/Farmstay/hooks/useAllFarmstay";
import UserTag from "../../../General/Wrapper/UserTag";
import useOrderDetail from "../../Management/Order/hooks/useOrderDetail";
import FeedbackItem from "../Farmstay/FarmstayDetail/ui-segment/FeedbackItem";
import ApproveBookingRequest from "./action/ApproveBookingRequest";
import RejectBookingRequest from "./action/RejectBookingRequest";
import useFarmstayAddress from "../../Management/Farmstay/FarmstayDetail/hooks/useFarmstayAddress";

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Đơn cần duyệt",
        href: "/management/order"
    },
    {
        text: "Chi tiết",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

function BookingRequestDetail() {

    const { getBackUrl } = useBackUrl();

    const { id } = useParams();
    const { detail, refresh } = useOrderDetail(id);
    const { detail: customer } = useUserDetail(detail?.customerId, ROLES.CUSTOMER);

    const [openApprove, setOpenApprove] = useState<boolean>(false);
    const [openReject, setOpenReject] = useState<boolean>(false);


    const feeExtras = useMemo(() => {
        if (!detail?.payment?.feeExtras) return [];

        const fees = JSON.parse(detail.payment.feeExtras);
        if (!isAvailableArray(fees)) return [];
        return fees;
    }, [detail?.payment?.feeExtras]);

    const { allFarmstays } = useAllFarmstays();
    const farmstay = useMemo(() =>
        getFarmstayFromList(allFarmstays, detail?.farmstayId),
        [allFarmstays, detail?.farmstayId]
    );
    const contactInfo = useContactInfo(farmstay);
    const address = useFarmstayAddress(farmstay);

    const activities: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.activities)) return [];
        return detail.activities;
    }, [detail?.activities]);

    const rooms: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.rooms)) return [];
        return detail.rooms;
    }, [detail?.rooms]);

    const feedbacks: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.feedbacks)) return [];
        return detail?.feedbacks;
    }, [detail?.feedbacks]);

    const isExpired = useMemo(() => {
        return isExpire(detail?.approveExpiredTime)
    }, [detail?.approveExpiredTime]);

    const handleCloseApprove = useCallback(() => setOpenApprove(false), []);
    const handleCloseReject = useCallback(() => setOpenReject(false), []);

    const renderHeader = () => (
        detail?.status === ORDER_STATUSES.PENDING_APPROVE
            ? <Card.Header className="border-bottom">
                {isExpired
                    ? <Alert variant="info">
                        {`Đơn đã quá hạn vào ngày ${convertISOToNaturalFormat(detail?.approveExpiredTime, "Do MMMM YYYY")}`}
                    </Alert>
                    : <Alert variant="danger">
                        {`Đơn sẽ quá hạn vào ${convertISOToNaturalFormat(detail?.approveExpiredTime, "HH:mm [ngày] Do MMMM YYYY")}`}
                    </Alert>
                }
                {!isExpired
                    ? <>
                        <Button
                            variant=''
                            type="button"
                            className="btn ripple btn-primary mb-1 me-2"
                            onClick={() => setOpenApprove(true)}
                        >
                            <i className="fe fe-thumbs-up me-1"></i> Nhận đơn
                        </Button>
                        <Button
                            variant=''
                            type="button"
                            className="btn ripple btn-secondary mb-1 me-2"
                            onClick={() => setOpenReject(true)}
                        >
                            <i className="fe fe-thumbs-down me-1"></i> Từ chối
                        </Button>
                    </>
                    : null
                }
            </Card.Header>
            : null
    )

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title={
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        <DetailPageHeaderTitle
                            backUrl={getBackUrl() ?? "/management/booking-request"}
                            title="Chi tiết đơn hàng"
                        />
                    </Box>
                }
                breadcrumb={breadcrumb}
            />

            <Grid
                container
                spacing={2}
                maxWidth="1000px"
                margin="0 auto"
            >
                <Grid item xs={12}>
                    <Card className=" custom-card">
                        {renderHeader()}
                        <Card.Body>
                            <div className="d-lg-flex">
                                <h6 className="main-content-label mb-1">
                                    <span className="d-flex mb-4">
                                        <Link to="/">
                                            <img
                                                src={require("../../../../assets/img/brand/favicon.png")}
                                                className="sign-favicon ht-40"
                                                alt="logo"
                                            />
                                        </Link>
                                    </span>
                                </h6>
                                <div className="ms-auto">
                                    <p className="mb-1">
                                        <span className="font-weight-bold">
                                            {`Mã đơn hàng: ${createCodeString("OD", id)}`}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box
                                        width="100%"
                                        textAlign="left"
                                    >
                                        <p className="h4">Thông tin khách hàng:</p>
                                        <Box padding="0 4px">
                                            <IconLabelDetail
                                                icon={<i className="fa fa-user me-2"></i>}
                                                label="Người đặt:"
                                                value={
                                                    <UserTag user={customer} />
                                                }
                                                className="mb-1"
                                            />
                                            <IconLabelDetail
                                                icon={<i className="fa fa-phone me-2"></i>}
                                                label="Sđt:"
                                                value={
                                                    <StringWrapper
                                                        text={customer?.phoneNumber}
                                                    />
                                                }
                                                className="mb-1"
                                            />
                                            <IconLabelDetail
                                                icon={<i className="fa fa-envelope me-2"></i>}
                                                label="Email:"
                                                value={
                                                    <StringWrapper
                                                        text={customer?.email}
                                                    />
                                                }
                                                className="mb-1"
                                            />
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={6}>
                                    <Box
                                        width="100%"
                                        textAlign="right"
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-end"
                                    >
                                        <p className="h4">Đơn hàng:</p>
                                        <IconLabelDetail
                                            label="Farmstay: "
                                            value={
                                                <Box
                                                    className="tag tag-rounded"
                                                    display="flex"
                                                    alignItems="center"
                                                    gap="8px"
                                                >
                                                    <HomeIcon />
                                                    {detail?.farmstayName}
                                                </Box>
                                            }
                                            className="mb-2"
                                        />

                                        <IconLabelDetail
                                            label="Ngày lập đơn:"
                                            value={convertISOToNaturalFormat(detail?.createdDate)}
                                            className="mb-2"
                                        />

                                        <ConditionWrapper isRender={detail?.status === ORDER_STATUSES.CUSTOMER_CANCEL}>
                                            <IconLabelDetail
                                                label="Ngày hủy đơn:"
                                                value={convertISOToNaturalFormat(detail?.cancelDate)}
                                                className="mb-2"
                                            />
                                        </ConditionWrapper>

                                        <Box marginTop="2px" className="mb-1">
                                            <Status statusObject={findOrderStatus(detail?.status)} />
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={1} alignItems="flex-start">
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Box className="h6" margin="2px 0 !important">Ngày check-in</Box>
                                        </Grid>
                                        <Grid item xs={9}>
                                            {convertISOToNaturalFormat(detail?.checkInDate)}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Box className="h6" margin="2px 0 !important">Ngày check-out</Box>
                                        </Grid>
                                        <Grid item xs={9}>
                                            {convertISOToNaturalFormat(detail?.checkoutDate)}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Box className="h6" margin="2px 0 !important">Ngày kết thúc (dự kiến)</Box>
                                        </Grid>
                                        <Grid item xs={9}>
                                            {convertISOToNaturalFormat(detail?.completedDate)}
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Box className="h6" margin="2px 0 !important">Liên hệ</Box>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                gap="8px"
                                            >
                                                {contactInfo.map((item, index) =>
                                                    <IconLabelDetail
                                                        key={index}
                                                        label={item.method}
                                                        value={<StringWrapper text={item.value} />}
                                                    />
                                                )}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Box className="h6" margin="2px 0 !important">Địa chỉ</Box>
                                        </Grid>
                                        <Grid item xs={9}>
                                            {renderAddress(address)}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card.Body>
                        <Card.Body>
                            <p className="h4">Chi tiết</p>
                            <Table className="table table-invoice table-bordered">
                                <thead>
                                    <tr>
                                        <th className="wd-20p">Mã</th>
                                        <th className="wd-20p">Loại</th>
                                        <th className="wd-40p">Tên</th>
                                        <th className="tx-right">Ngày</th>
                                        <th className="tx-right">Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map(item =>
                                        <tr key={item.roomId}>
                                            <td>{createCodeString("R", item.roomId)}</td>
                                            <td>Phòng</td>
                                            <td className="tx-12">{item.room?.name ?? "UN_KNOWN"}</td>
                                            <td className="tx-center">{formatDate(item.date)}</td>
                                            <td className="tx-right">{convertToMoney(item.price)}</td>
                                        </tr>
                                    )}
                                    {activities.map(item =>
                                        <tr key={item.activityId}>
                                            <td>{createCodeString("AC", item.activityId)}</td>
                                            <td>Hoạt động</td>
                                            <td className="tx-12">{item.activity?.name ?? "UN_KNOWN"}</td>
                                            <td className="tx-center">{formatDate(item.date)}</td>
                                            <td className="tx-right">{convertToMoney(item.price)}</td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td className="valign-middle"
                                            colSpan={2} rowSpan={4}
                                        >
                                            {/*<!-- invoice-notes --> */}
                                        </td>
                                        <td className="tx-right">Tổng tiền</td>
                                        <td className="tx-right" colSpan={2}>
                                            {convertToMoney(detail?.totalPrice)}
                                        </td>
                                    </tr>
                                    {feeExtras.map((item, index) =>
                                        <tr key={index}>
                                            <td className="tx-right">{item.type}</td>
                                            <td className="tx-right">{`${item.percent * 100}%`}</td>
                                            <td className="tx-right">
                                                {convertToMoney(item.amount)}
                                            </td>
                                        </tr>
                                    )}
                                    {feeExtras.length < 1
                                        ? <tr >
                                            <td className="tx-right">Phí</td>
                                            <td className="tx-right" colSpan={2}>
                                                {convertToMoney(detail?.payment?.fee)}
                                            </td>
                                        </tr>
                                        : null
                                    }
                                    <tr>
                                        <td className="tx-right tx-uppercase tx-bold tx-inverse">
                                            Phải thanh toán
                                        </td>
                                        <td className="tx-right" colSpan={2}>
                                            <h4 className="tx-bold">
                                                {convertToMoney(detail?.payment?.amount)}
                                            </h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                        <ConditionWrapper isRender={isAvailableArray(feedbacks)}>
                            <Card.Footer>
                                <p className="h4">Đánh giá từ khách hàng</p>
                                <Divider />
                                {feedbacks.map(item =>
                                    <FeedbackItem
                                        key={item.id}
                                        item={item}
                                    />
                                )}
                            </Card.Footer>
                        </ConditionWrapper>
                    </Card>
                </Grid>
            </Grid>

            {openApprove
                ? <ApproveBookingRequest
                    open={openApprove}
                    onClose={handleCloseApprove}
                    booking={detail}
                    onSuccessCallback={refresh}
                />
                : null
            }

            {openReject
                ? <RejectBookingRequest
                    open={openReject}
                    onClose={handleCloseReject}
                    booking={detail}
                    onSuccessCallback={refresh}
                />
                : null
            }
        </Box >
    )
}

export default BookingRequestDetail;