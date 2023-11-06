import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { convertToMoney } from "../../../../helpers/stringUtils";
import { STATUS_COLORS } from "../../../../setting/color";

const options: ApexOptions = {
    chart: {
        height: 400,
        type: "line",
        zoom: {
            enabled: false,
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 3,
            color: "#000",
            opacity: 0.1,
        },
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: -15,
        fontWeight: "bold",
    },
    stroke: {
        curve: "smooth",
        width: 2,
    },
    grid: {
        borderColor: "#f2f6f7",
    },
    colors: ["#139c7f", STATUS_COLORS.AVAILABLE.textColor, STATUS_COLORS.BANNED.textColor],
    yaxis: {
        tickAmount: 10,
        title: {
            style: {
                color: "#adb5be",
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                cssClass: "apexcharts-yaxis-label",
            },
        },
        labels: {
            formatter: function (y: any) {
                return convertToMoney(y) + "";
            },
        },
    },
    xaxis: {
        type: "category",
        categories: [
            "Thg 1",
            "Thg 2",
            "Thg 3",
            "Thg 4",
            "Thg 5",
            "Thg 6",
            "Thg 7",
            "Thg 8",
            "Thg 9",
            "Thg 10",
            "Thg 11",
            "Thg 12",
        ],
        axisBorder: {
            show: true,
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: true,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
        },
        labels: {
            rotate: -90,
        },
    },
}
interface RevenueStatisticCharProps {
    series: ApexAxisChartSeries,
}

const RevenueStatisticChar = ({
    series
}: RevenueStatisticCharProps) => {
    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="line" height={400} />
        </div>
    );
};

export default RevenueStatisticChar;