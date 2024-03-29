import { Link, useParams } from "react-router-dom";
import PageHeader, { IBreadcrumbItem } from "../../../General/PageHeader";
import { Box, Grid } from "@mui/material";
import DetailPageHeaderTitle from "../../../General/DetailPageHeaderTitle";
import { Button, Card, Table } from "react-bootstrap";
import { convertToMoney, createCodeString } from "../../../../helpers/stringUtils";
import { convertISOToNaturalFormat } from "../../../../helpers/dateUtils";
import IconLabelDetail from "../../../General/Item/IconLabelDetail";
import { Status } from "../../../../setting/Status";
import useBackUrl from "../../../../hooks/useBackUrl";
import { WITHDRAWAL_REQUEST_STATUSES, findWithdrawalRequestStatus, getWithdrawalRequestTypeLabel } from "../../../../setting/withdrawl-request-setting";
import { useMemo, useState } from "react";
import { isAvailableArray } from "../../../../helpers/arrayUtils";
import useDisbursementDetail from "../../Management/WithdrawalRequest/hooks/useDisbursementDetail";
import useUserDetail from "../../Management/Account/hooks/useUserDetail";
import { ROLES } from "../../../../setting/setting";
import useBanks from "../../../../hooks/useBanks";
import UserLinkTag from "../../../General/Wrapper/UserLinkTag";
import ConditionWrapper from "../../../General/Wrapper/ConditionWrapper";
import ConfirmDisbursement from "./action/ConfirmDisbursement";

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

const customFormatBankLabel = (option: any) => (
    <Box
        display="flex"
        alignItems="center"
        gap="8px"
        width="fit-content"
        marginLeft="auto"
    >
        <Box
            width="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                component="img"
                src={option?.logo}
                height="24px"
            />
        </Box>
        <Box
            className="text-muted"
        >
            {`${option?.bankName} (${option?.bankCode})`}
        </Box>
    </Box>
)

function WithdrawalRequestDetail() {

    const [openConfirm, setOpenConfirm] = useState<boolean>(false);

    const { id } = useParams();
    const { detail, refresh } = useDisbursementDetail(id);
    const { getBackUrl, createBackUrl } = useBackUrl();

    const { detail: hostDetail } = useUserDetail(detail?.hostId, ROLES.HOST);
    const { banks } = useBanks();

    const bank = useMemo(() => {
        if (!hostDetail?.bankName) return null;
        if (!isAvailableArray(banks)) return null;
        return banks.find(item => item.bankCode === hostDetail.bankName);
    }, [banks, hostDetail?.bankName]);

    const feeExtras = useMemo(() => {
        if (!detail?.feeExtras) return [];

        const fees = JSON.parse(detail.feeExtras);
        if (!isAvailableArray(fees)) return [];
        return fees;
    }, [detail?.feeExtras]);

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

            <Grid container spacing={2} columnSpacing={2}>
                <Grid item xs={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            <Box
                                display="flex"
                                gap="1rem"
                                alignItems="center"
                                marginBottom="1rem"
                            >
                                <h3 className="main-content-label mb-1">
                                    Mã {createCodeString("WR", id)}
                                </h3>
                                <Box className="font-weight-bold" display="flex" alignItems="center">
                                    <Status statusObject={findWithdrawalRequestStatus(detail?.status)} />
                                </Box>

                            </Box>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <IconLabelDetail
                                        icon={<i className="fa fa-code"></i>}
                                        label="Mã đơn hàng:"
                                        value={
                                            <Link
                                                className="tag tag-rounded clickable"
                                                to={`/management/order/${detail?.orderId}?backUrl=${createBackUrl()}`}
                                            >
                                                {createCodeString("OD", detail?.orderId)}
                                            </Link>
                                        }
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <IconLabelDetail
                                        icon={<i className="fa fa-user"></i>}
                                        label="Người nhận:"
                                        value={<UserLinkTag user={hostDetail} />}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <IconLabelDetail
                                        icon={<i className="fa fa-list-alt"></i>}
                                        label="Phân loại:"
                                        value={getWithdrawalRequestTypeLabel(detail?.type)}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <IconLabelDetail
                                        icon={<i className="fa fa-calendar"></i>}
                                        label="Ngày khởi tạo:"
                                        value={convertISOToNaturalFormat(detail?.createdDate)}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} marginTop="1rem">

                                <Grid item xs={12}>
                                    <Table className="table table-invoice table-bordered">
                                        <tbody>
                                            <tr>
                                                <td className="tx-right">Tên ngân hàng</td>
                                                <td className="tx-right" colSpan={2}>
                                                    {bank
                                                        ? customFormatBankLabel(bank)
                                                        : "-"
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="tx-right">Chủ tài khoản</td>
                                                <td className="tx-right" colSpan={2}>
                                                    {hostDetail?.bankAccountName ?? "-"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="tx-right">Số tài khoản</td>
                                                <td className="tx-right" colSpan={2}>
                                                    {hostDetail?.bankAccountNumber ?? "-"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="tx-right">Giá trị đơn hàng</td>
                                                <td className="tx-right" colSpan={2}>{convertToMoney(detail?.order?.totalPrice)}</td>
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
                                            <tr>
                                                <td className="tx-right tx-uppercase tx-bold tx-inverse">Thực nhận</td>
                                                <td className="tx-right" colSpan={2}>
                                                    <h4 className="tx-bold">
                                                        {convertToMoney(detail?.amount)}

                                                    </h4>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </Card.Body>
                        <ConditionWrapper isRender={detail?.status === WITHDRAWAL_REQUEST_STATUSES.PENDING}>
                            <Card.Footer>
                                <Box
                                    display="flex"
                                    width="100%"
                                    justifyContent="flex-end"
                                >
                                    <Button
                                        variant=''
                                        type="button"
                                        className="btn ripple btn-primary mb-1 me-2"
                                        onClick={() => setOpenConfirm(true)}
                                    >
                                        <i className="fe fe-thumbs-up me-1"></i> Xác nhận đã giải ngân
                                    </Button>
                                </Box>
                            </Card.Footer>
                        </ConditionWrapper>
                    </Card>
                </Grid>
            </Grid>

            {openConfirm
                ? <ConfirmDisbursement
                    onClose={() => {
                        setOpenConfirm(false);
                    }}
                    disbursement={detail}
                    open={openConfirm}
                    refresh={refresh}
                />
                : null
            }
        </Box >
    )
}

export default WithdrawalRequestDetail