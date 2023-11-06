import { useMemo } from "react";
import PageHeader from "../../../General/PageHeader";
import { breadcrumb } from "./setting";
import { Box, Grid } from "@mui/material";
import StatisticCardOverviewGroup from "../../../General/Statistic/StatisticCardOverviewGroup";
import { Card } from "react-bootstrap";
import RevenueStatisticChar from "./RevenueStatisticChar";
import OrderTable from "./OrderTable";
import { IStatisticCardOverview } from "../../../General/Statistic/StatisticCardOverview";
import { convertToMoney } from "../../../../helpers/stringUtils";
import useMonthlyData from "./hooks/useMonthlyData";
import useYearlyData from "./hooks/useYearlyData";

export default function Overview() {

    const { monthlyReport } = useMonthlyData();
    const { yearlyReport } = useYearlyData();

    const overviewData: IStatisticCardOverview[] = useMemo(() => [
        {
            title: "Doanh thu tháng này",
            value: monthlyReport?.totalPaymentThisMonth ?? 0,
            icon: (
                <div className="circle-icon bg-info-transparent text-center align-self-center overflow-hidden">
                    <i className="fe fe-dollar-sign tx-16 text-info"></i>
                </div>
            ),
            subTitle: "Tháng trước",
            subValue: <span className="text-primary">
                {convertToMoney(monthlyReport?.totalPaymentLastMonth ?? 0)}
            </span>,
            type: "money"
        },
        {
            title: "Số đơn tháng này",
            value: monthlyReport?.totalBookingThisMonth ?? 0,
            icon: (
                <div className="circle-icon bg-primary-transparent text-center align-self-center overflow-hidden">
                    <i className="fe fe-shopping-bag tx-16 text-primary"></i>
                </div>
            ),
            subTitle: "Số đơn hôm nay",
            subValue: <span className="text-success">
                {`+${monthlyReport?.totalBookingThisMonth ?? 0}`}
            </span>,
            type: "number"
        },
        {
            title: "Tổng số người dùng",
            value: monthlyReport?.totalUser ?? 0,
            icon: (
                <div className="circle-icon bg-secondary-transparent text-center align-self-center overflow-hidden">
                    <i className="fe fe-users tx-16 text-secondary"></i>
                </div>
            ),
            subTitle: "Người dùng mới trong tháng",
            subValue: <span className="text-success">
                {`+${monthlyReport?.totalNewUserThisMonth ?? 0}`}
            </span>,
        },
        {
            title: "Tổng số farmstay",
            value: monthlyReport?.totalFarmstay ?? 0,
            icon: (
                <div className="circle-icon bg-warning-transparent text-center align-self-center overflow-hidden">
                    <i className="fe fe-layers tx-16 text-warning"></i>
                </div>
            ),
            subTitle: "Farmstay mới trong tháng",
            subValue: <span className="text-success">
                {`+${monthlyReport?.totalNewFarmstayThisMonth ?? 0}`}
            </span>,
            type: "number"
        }
    ], [monthlyReport]);

    const series = useMemo(() => {
        const disbursements: number[] = [];
        const payments: number[] = [];
        const refunds: number[] = [];
        if (yearlyReport != null) {
            Object.values(yearlyReport).forEach(element => {
                disbursements.push(element.disbursement);
                payments.push(element.payment);
                refunds.push(element.refund);
            });
        }

        const data: ApexAxisChartSeries = [
            {
                name: "Doanh thu",
                data: payments,
            },
            {
                name: "Giải ngân",
                data: disbursements,
            },
            {
                name: "Hoàn tiền",
                data: refunds,
            },
        ]

        return data;
    }, [yearlyReport]);


    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Tổng quan"
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <StatisticCardOverviewGroup
                        data={overviewData}
                        spacing={2}
                        responsive={{
                            xs: 12,
                            sm: 6,
                            xl: 3
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Card className="custom-card overflow-hidden">
                        <Card.Header className=" border-bottom-0 d-flex">
                            <h3 className="card-title mb-2 ">Thống kê thu chi trong năm</h3>
                        </Card.Header>
                        <Card.Body>
                            <RevenueStatisticChar
                                series={series}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <OrderTable />
                </Grid>
            </Grid>
        </Box>
    );
}
