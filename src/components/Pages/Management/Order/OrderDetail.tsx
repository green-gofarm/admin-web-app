import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import PageHeader, { IBreadcrumbItem } from "../../../General/PageHeader";
import { Box, Divider, Grid } from "@mui/material";
import DetailPageHeaderTitle from "../../../General/DetailPageHeaderTitle";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";
import { Button, Card, Table } from "react-bootstrap";
import { convertISOToNaturalFormat } from "../../../../helpers/dateUtils";
import AvatarWrapper from "../../../General/Wrapper/AvatarWrapper";
import IconLabelDetail from "../../../General/Item/IconLabelDetail";
import { Status } from "../../../../setting/Status";
import { findOrderStatus } from "../../../../setting/order-setting";

const print = () => {
    window.print();
};

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Đơn hàng",
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

const detail = {
    "id": 1,
    "customerId": 111,
    "farmstayId": 1,
    "totalPrice": 1000000,
    "reimbursement": 200000,
    "status": 1,
    "expiredTime": "2023-02-10T12:00:00Z",
    "checkInTime": "2023-02-15T14:00:00Z",
    "createdDate": "2022-05-04 11:45:00",
    "updatedDate": "2022-05-04 11:45:00",
    "customer": {
        "email": "chauvdpse62163@fpt.edu.vn",
        "name": "Võ Diệp Phước Châu",
        "phoneNumber": "0901111111",
        "firstName": null,
        "lastName": null,
        "role": "customer",
        "gender": 1,
        "grade": null,
        "status": 1,
        "birthday": null,
        "address": null,
        "avatarURL": null,
        "createdDate": null,
        "updatedDate": null,
        "id": 111,
        "userId": 111,
        "uuid": null
    },
    "farmstay": {
        "id": 1,
        "rating": 5,
        "name": "Nông trại vui vẻ",
        "description": "Trải nghiệm cuộc sống vùng quê sông nước",
        "contactInformation": "Email: wifildt@gmail.com, Phone: 0901234567",
        "address": "160 Pasteur, phường 6, quận 3, thành phố Hồ Chí Minh",
        "country": "Việt Nam",
        "city": "Thành phố Hồ Chí Minh",
        "status": 1,
        "hostId": 1,
        "images": "image1.jpg,image2.jpg,image3.jpg",
        "createdDate": "2022-01-01 10:00:00",
        "updatedDate": "2022-01-02 12:00:00",
        "host": {
            "userId": 45,
            "name": "Lê Danh Trọng",
            "contract": "https://cozyfarmhouse.com/contract.pdf",
            "bankAccountName": "LE DANH TRONG",
            "bankAccountNumber": "1234567890",
            "createdDate": "2022-01-01 10:00:00",
            "updatedDate": "2022-01-02 12:00:00"
        }
    }
};

function OrderDetail() {

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const location = useLocation();

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
                            backUrl={searchParams.get("backUrl") ?? "/management/order"}
                            title="Chi tiết đơn hàng"
                        />
                    </Box>
                }
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className=" custom-card">
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
                                        <p className="h3">Thông tin khách hàng:</p>
                                        <Box padding="0 4px">
                                            <IconLabelDetail
                                                icon={<i className="fa fa-user me-2"></i>}
                                                label="Chủ sở hửu:"
                                                value={
                                                    <Box
                                                        component={Link}
                                                        to={`/management/account/host/${detail.customer.userId}?backUrl=${location.pathname + location.search}`}
                                                        display="flex"
                                                        alignItems="center"
                                                        gap="8px"
                                                        className="tag tag-rounded"
                                                    >
                                                        <AvatarWrapper
                                                            name={detail.customer.name}
                                                            avatarProps={{
                                                                width: "22px !important",
                                                                height: "22px !important",
                                                                fontSize: "12px !important"
                                                            }}
                                                        />
                                                        {detail.customer.name}
                                                    </Box>
                                                }
                                                className="mb-1"
                                            />
                                            <IconLabelDetail
                                                icon={<i className="fa fa-phone me-2"></i>}
                                                label="Sđt:"
                                                value={
                                                    <a className="tag tag-rounded" href={`tel:${detail.customer.phoneNumber}`}>
                                                        {detail.customer.phoneNumber}
                                                    </a>
                                                }
                                                className="mb-1"
                                            />
                                            <IconLabelDetail
                                                icon={<i className="fa fa-envelope me-2"></i>}
                                                label="Email:"
                                                value={
                                                    <a className="tag tag-rounded" href={`mailTo:${detail.customer.email}`}>
                                                        {detail.customer.email}
                                                    </a>
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
                                        <p className="h3">Đơn hàng:</p>
                                        <span>Được tạo vào ngày {convertISOToNaturalFormat(detail.createdDate)}</span>
                                        <Box marginTop="2px">
                                            <Status statusObject={findOrderStatus(detail.status)} />
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={1} alignItems="center">

                                        <Grid item xs={12}>
                                            <p className="h3">Chi tiết:</p>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Box className="h6" margin="2px 0 !important">Ngày check-in</Box>
                                        </Grid>
                                        <Grid item xs={9}>
                                            {convertISOToNaturalFormat(detail.createdDate)}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Box className="h6" margin="2px 0 !important">Ngày check-out</Box>
                                        </Grid>
                                        <Grid item xs={9}>
                                            {convertISOToNaturalFormat(detail.createdDate)}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Box className="h6" margin="2px 0 !important">Liên hệ</Box>
                                        </Grid>
                                        <Grid item xs={9}>
                                            {detail.farmstay.contactInformation}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Box className="h6" margin="2px 0 !important">Địa chỉ</Box>
                                        </Grid>
                                        <Grid item xs={9}>
                                            {detail.farmstay.address}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <div className="table-responsive mg-t-40">
                                <Table className="table table-invoice table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="wd-20p">Loại</th>
                                            <th className="wd-40p">Tên</th>
                                            <th className="tx-right">Số lượng</th>
                                            <th className="tx-right">Giá</th>
                                            <th className="tx-right">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Hoạt động</td>
                                            <td className="tx-12">Câu cá trên hồ</td>
                                            <td className="tx-center">2</td>
                                            <td className="tx-right">{convertToMoney(1000000)}</td>
                                            <td className="tx-right">{convertToMoney(1000000 * 2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Phòng ở</td>
                                            <td className="tx-12">Phòng một giường</td>
                                            <td className="tx-center">1</td>
                                            <td className="tx-right">{convertToMoney(2000000)}</td>
                                            <td className="tx-right">{convertToMoney(2000000 * 2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="valign-middle"
                                                colSpan={2} rowSpan={4}
                                            >
                                                <div className="invoice-notes">
                                                    <label className="main-content-label tx-13">
                                                        Ghi chú
                                                    </label>
                                                    <i>
                                                        Không có ghi chú
                                                    </i>
                                                </div>
                                                {/*<!-- invoice-notes --> */}
                                            </td>
                                            <td className="tx-right">Tổng tiền</td>
                                            <td className="tx-right" colSpan={2}>
                                                {convertToMoney(6000000)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="tx-right">VAT</td>
                                            <td className="tx-right" colSpan={2}>
                                                10%
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="tx-right">Phí</td>
                                            <td className="tx-right" colSpan={2}>
                                                10%
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="tx-right tx-uppercase tx-bold tx-inverse">
                                                Phải thanh toán
                                            </td>
                                            <td className="tx-right" colSpan={2}>
                                                <h4 className="tx-bold">
                                                    {convertToMoney(7200000)}
                                                </h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                        <Card.Footer className=" text-end">
                            <Button
                                variant=''
                                type="button"
                                className="btn ripple btn-info mb-1 me-2"
                                onClick={print}
                            >
                                <i className="fe fe-printer me-1"></i> In ra hóa đơn
                            </Button>
                        </Card.Footer>
                    </Card>
                </Grid>
            </Grid>
        </Box >
    )
}

export default OrderDetail