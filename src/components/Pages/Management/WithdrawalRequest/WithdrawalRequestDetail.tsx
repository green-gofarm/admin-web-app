import { Link, useParams } from "react-router-dom";
import PageHeader, { IBreadcrumbItem } from "../../../General/PageHeader";
import { Box, Grid } from "@mui/material";
import DetailPageHeaderTitle from "../../../General/DetailPageHeaderTitle";
import { Card } from "react-bootstrap";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";
import { convertISOToNaturalFormat } from "../../../../helpers/dateUtils";
import IconLabelDetail from "../../../General/Item/IconLabelDetail";
import { Status } from "../../../../setting/Status";
import useBackUrl from "../../../../hooks/useBackUrl";
import { findWithdrawalRequestStatus } from "../../../../setting/withdrawl-request-setting";
import useDisbursementDetail from "./hooks/useDisbursementDetail";
import DisplayLinkUser from "../../../General/DisplayLinkUser";

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Giải ngân",
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

function WithdrawalRequestDetail() {

    const { id } = useParams();
    const { detail } = useDisbursementDetail(id);
    const { getBackUrl, createBackUrl } = useBackUrl();

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
                            title="Chi tiết giải ngân"
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
                                            <Status statusObject={findWithdrawalRequestStatus(detail?.status)} />
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
                                                to={`/management/order/${id}?backUrl=${createBackUrl()}`}
                                            >
                                                {createCodeString("OD", detail?.orderId)}
                                            </Link>
                                        }
                                        className="mb-2"
                                    />
                                    <IconLabelDetail
                                        icon={<i className="fa fa-credit-card me-2"></i>}
                                        label="Phí:"
                                        value={convertToMoney(detail?.fee)}
                                        className="mb-2"
                                    />
                                    <IconLabelDetail
                                        icon={<i className="fa fa-credit-card me-2"></i>}
                                        label="Số tiền giải ngân (đã tính phí):"
                                        value={
                                            <b>{convertToMoney(detail?.amount)}</b>
                                        }
                                        className="mb-2"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <IconLabelDetail
                                        icon={<i className="fa fa-user me-2"></i>}
                                        label="Người nhận:"
                                        value={
                                            <DisplayLinkUser
                                                user={{
                                                    name: detail?.hostName
                                                }}
                                            />
                                        }
                                        className="mb-2"
                                    />

                                    <IconLabelDetail
                                        icon={<i className="fa fa-calendar me-2"></i>}
                                        label="Ngày khởi tạo:"
                                        value={convertISOToNaturalFormat(detail?.createdDate)}
                                        className="mb-2"
                                    />
                                </Grid>
                            </Grid>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid>
        </Box >
    )
}

export default WithdrawalRequestDetail