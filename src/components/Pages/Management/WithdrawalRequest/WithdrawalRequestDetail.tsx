import { Link, useParams } from "react-router-dom";
import PageHeader, { IBreadcrumbItem } from "../../../General/PageHeader";
import { Box, Grid } from "@mui/material";
import DetailPageHeaderTitle from "../../../General/DetailPageHeaderTitle";
import { Button, Card } from "react-bootstrap";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";
import { convertISOToNaturalFormat } from "../../../../helpers/dateUtils";
import AvatarWrapper from "../../../General/Wrapper/AvatarWrapper";
import IconLabelDetail from "../../../General/Item/IconLabelDetail";
import { Status } from "../../../../setting/Status";
import useBackUrl from "../../../../hooks/useBackUrl";
import { findWithdrawalRequestStatus } from "../../../../setting/withdrawl-request-setting";

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Yêu cầu thanh toán",
        href: "/management/withdrawal-request"
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

function WithdrawalRequestDetail() {

    const { id } = useParams();
    const { getBackUrl, backUrl } = useBackUrl();

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
                            backUrl={getBackUrl() ?? "/management/withdrawal-request"}
                            title="Chi tiết yêu cầu thanh toán"
                        />
                    </Box>
                }
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            <div className="d-lg-flex mb-2">
                                <h3 className="main-content-label mb-1">
                                    Mã {createCodeString("WR", id)}
                                </h3>
                                <div className="ms-auto">
                                    <div className="mb-1">
                                        <Box className="font-weight-bold" display="flex" alignItems="center">
                                            <Status statusObject={findWithdrawalRequestStatus(2)} />
                                        </Box>
                                    </div>
                                </div>
                            </div>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <IconLabelDetail
                                        icon={<i className="fa fa-code me-2"></i>}
                                        label="Mã đơn hàng:"
                                        value={
                                            <Link
                                                className="tag tag-rounded clickable"
                                                to={`/management/order/${id}?backUrl=${backUrl}`}
                                            >
                                                {createCodeString("OD", id)}
                                            </Link>
                                        }
                                        className="mb-2"
                                    />
                                    <IconLabelDetail
                                        icon={<i className="fe fe-dollar-sign me-2"></i>}
                                        label="Số tiền cần thanh toán:"
                                        value={
                                            <b>{convertToMoney(10000000)}</b>
                                        }
                                        className="mb-2"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <IconLabelDetail
                                        icon={<i className="fa fa-user me-2"></i>}
                                        label="Người yêu cầu:"
                                        value={
                                            <Box
                                                component={Link}
                                                to={`/management/account/host/${detail.customer.userId}?backUrl=${backUrl}`}
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
                                        className="mb-2"
                                    />

                                    <IconLabelDetail
                                        icon={<i className="fa fa-calendar me-2"></i>}
                                        label="Ngày gửi yêu cầu:"
                                        value={
                                            <b>{convertISOToNaturalFormat(detail.createdDate)}</b>
                                        }
                                        className="mb-2"
                                    />
                                </Grid>
                            </Grid>
                        </Card.Body>
                        <Card.Footer className=" text-end">
                            <Button
                                variant=''
                                type="button"
                                className="btn ripple btn-primary mb-1 me-2">
                                <i className="fe fe-thumbs-up me-1"></i> Approve
                            </Button>
                            <Button
                                variant=''
                                type="button"
                                className="btn ripple btn-secondary mb-1 me-2"
                            >
                                <i className="fe fe-thumbs-down me-1"></i> Reject
                            </Button>
                        </Card.Footer>
                    </Card>
                </Grid>
            </Grid>
        </Box >
    )
}

export default WithdrawalRequestDetail