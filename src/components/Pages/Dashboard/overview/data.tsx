import { convertToMoney } from "../../../../helpers/stringUtils";
import { IStatisticCard } from "../../../General/Statistic/StatisticCard";
import { IStatisticCardOverview } from "../../../General/Statistic/StatisticCardOverview";

export const overviewData: IStatisticCardOverview[] = [
  {
    title: "Doanh thu tháng này",
    value: 100000000,
    icon: (
      <div className="circle-icon bg-info-transparent text-center align-self-center overflow-hidden">
        <i className="fe fe-dollar-sign tx-16 text-info"></i>
      </div>
    ),
    subTitle: "Tháng trước",
    subValue: <span className="text-primary">{convertToMoney(320000000)}</span>,
    type: "money"
  },
  {
    title: "Doanh số tháng này",
    value: 500,
    icon: (
      <div className="circle-icon bg-primary-transparent text-center align-self-center overflow-hidden">
        <i className="fe fe-shopping-bag tx-16 text-primary"></i>
      </div>
    ),
    subTitle: "Số đơn hôm nay",
    subValue: <span className="text-success">+12</span>,
    type: "number"
  },
  {
    title: "Tổng số người dùng",
    value: 1000,
    icon: (
      <div className="circle-icon bg-secondary-transparent text-center align-self-center overflow-hidden">
        <i className="fe fe-users tx-16 text-secondary"></i>
      </div>
    ),
    subTitle: "Số người dùng mới",
    subValue: <span className="text-success">+100</span>,
  },
  {
    title: "Tổng số farmstay",
    value: 2000,
    icon: (
      <div className="circle-icon bg-warning-transparent text-center align-self-center overflow-hidden">
        <i className="fe fe-layers tx-16 text-warning"></i>
      </div>
    ),
    subTitle: "Số farmstay mới",
    subValue: <span className="text-success">+12</span>,
    type: "number"
  }
]

export const revenueData = [
  {
    label: "Tổng doanh thu",
    value: "2.345.678 đ",
  },
  {
    label: "Tổng đơn hàng",
    value: "5302 đơn",
  },
  {
    label: "Doanh thu theo danh mục",
    value: "3.456.789 đ",
  },
  {
    label: "Hoàn trả & thanh toán",
    value: "-123.456 đ",
  },
  {
    label: "Giá trị đơn hàng trung bình",
    value: "2.500.000 VNĐ",
  },
  // {
  //   label: "Tỷ lệ tăng trưởng doanh số",
  //   value: "10%",
  // },
  {
    label: "Tỷ lệ hoàn trả",
    value: "2%",
  }
];

export const feedbackData: IStatisticCard[] = [
  {
    title: "Điểm hài lòng của khách hàng (CSAT)",
    value: "90%",
    subTitle: "Phân tích chi tiết",
    subValue: "Rất hài lòng: 50%\nHài lòng: 40%\nKhông hài lòng: 10%",
  },
  {
    title: "Điểm Net Promoter (NPS)",
    value: "75",
    subTitle: "Phân tích chi tiết",
    subValue: "Promoter: 60%\nPassive: 30%\nDetractor: 10%",
  },
  {
    title: "Tỷ lệ giữ chân khách hàng",
    value: "80%",
    subTitle: "Phân tích chi tiết",
    subValue: "Khách hàng mới: 50%\nKhách hàng cũ: 50%",
  },
  {
    title: "Giá trị khách hàng trong suốt thời gian sử dụng (CLV)",
    value: "3.000.000 VNĐ",
    subTitle: "Phân tích chi tiết",
    subValue: "Khách hàng A: 5.000.000 VNĐ\nKhách hàng B: 2.500.000 VNĐ\nKhách hàng C: 1.200.000 VNĐ",
  },
  {
    title: "Phản hồi của khách hàng",
    value: "9/10",
    subTitle: "Phân tích chi tiết",
    subValue: "Hỗ trợ khách hàng: 9/10\nChất lượng sản phẩm/dịch vụ: 8/10\nĐộ tin cậy: 9/10",
  },
];
