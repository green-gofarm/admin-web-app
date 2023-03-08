import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

const series = [
    {
        name: "Sales",
        data: [32, 15, 63, 51, 136, 62, 99, 42, 178, 76, 32, 180],
    },
]

const options: ApexOptions = {
    chart: {
        height: 280,
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
        width: 3,
    },
    grid: {
        borderColor: "#f2f6f7",
    },
    colors: ['var(--primary-bg-color)' || "#1fc5db"],

    yaxis: {
        title: {
            text: "Growth",
            style: {
                color: "#adb5be",
                fontSize: "14px",
                fontFamily: "poppins, sans-serif",
                fontWeight: 600,
                cssClass: "apexcharts-yaxis-label",
            },
        },
        labels: {
            formatter: function (y: any) {
                return y.toFixed(0) + "";
            },
        },
    },
    xaxis: {
        type: "category",
        categories: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
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

const RevenueStatisticChar = () => {
    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="line" height={270} />
        </div>
    );
};

export default RevenueStatisticChar;