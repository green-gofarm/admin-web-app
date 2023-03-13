
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader, { IBreadcrumbItem } from "../../General/PageHeader";
import { Box, Grid } from "@mui/material";

const breadcrumb: Array<IBreadcrumbItem> = [];

const data = [
	{
		notificationTime: {
			date: 'Thứ Sáu',
			time: '02:31'
		},
		message: 'Dự án được giao bởi quản lý, tất cả các tệp và thư mục đã được bao gồm',
		name: "Hệ thống",
		date: '24, thg 10 2021'
	},
	{
		notificationTime: {
			date: 'Thứ Hai',
			time: '08:47'
		},
		message: 'Admin và các thành viên khác đã chấp nhận yêu cầu của bạn',
		name: "Hệ thống",
		date: '30, thg 9 2021'
	},
	{
		notificationTime: {
			date: 'Hôm qua',
			time: '18:43'
		},
		message: 'Dữ liệu tạm thời sẽ bị xóa khi thời gian được cấp phép hoàn thành',
		name: "Hệ thống",
		date: '12, Th3 2023'
	},
	{
		notificationTime: {
			date: "Hôm nay",
			time: "03:18"
		},
		name: "Hệ thống",
		message: "Ngày phê duyệt cho khoản vay được xác minh",
		date: "18, thg 9 2021"
	},
	{
		notificationTime: {
			date: "Hôm nay",
			time: "12:24"
		},
		name: "Hệ thống",
		message: "Tài khoản mạng xã hội đang có rủi ro, vui lòng kiểm tra thông tin đăng nhập của bạn",
		date: "18,thg 9 2021"
	},
	{
		notificationTime: {
			date: "Hôm nay",
			time: "04:11"
		},
		name: "Hệ thống",
		message: "Đã thay đổi mật khẩu gmail 4 giờ trước. Cập nhật",
		date: "18,thg 9 2021"
	},
	{
		notificationTime: {
			date: "Hôm nay",
			time: "02:52"
		},
		name: "Hệ thống",
		message: "Hoàn thành ngày mục tiêu để thay đổi thứ bậc dữ liệu",
		date: "18,thg 9 2021"
	}
]

function AdminNotifications() {
	return (
		<Box marginBottom="1.3rem">
			<PageHeader
				title="Thông báo"
				breadcrumb={breadcrumb}
			/>

			<Grid container spacing={0}>
				<Grid item xs={12} lg={3}>
					<Card>
						<Box className="main-chat-list">
							<Box height="fit-content">
								<Box className="media selected">
									<div className="notifyimg bg-pink">
										<i className="far fa-folder-open text-white"></i>
									</div>
									<div className="ms-3">
										<h5 className="notification-label mb-1">
											Yêu cầu rút tiền
										</h5>
										<div className="notification-subtext">
											10 giờ trước
										</div>
									</div>
								</Box>
								<Box className="media d-flex"                      >
									<div className="notifyimg bg-success">
										<i className="fa fa-cart-plus text-white"></i>
									</div>
									<div className="ms-3">
										<h5 className="notification-label mb-1">
											Yêu cầu đặt phòng mới
										</h5>
										<div className="notification-subtext">
											1 giờ trước
										</div>
									</div>
								</Box>
								<Box className="media d-flex"                      >
									<div className="notifyimg bg-warning">
										<i className="far fa-envelope-open text-white"></i>
									</div>
									<div className="ms-3">
										<h5 className="notification-label mb-1">
											12 Tin nhắn mới
										</h5>
										<div className="notification-subtext">
											1 ngày trước
										</div>
									</div>
								</Box>
							</Box>
						</Box>
					</Card>
				</Grid>

				<Grid item xs={12} lg={9}>
					<div className="container">
						<ul className="notification">
							{data.map((item, index) =>
								<li key={index}>
									<div className="notification-time">
										<span className="date">{item.notificationTime.date}</span>
										<span className="time">{item.notificationTime.time}</span>
									</div>
									<div className="notification-icon">
										<Link to="#"></Link>
									</div>
									<div className="notification-body">
										<div className="media mt-0">
											<div className="main-img-user avatar-md main-avatar online me-3 shadow">
												<Link className="" to={`${process.env.PUBLIC_URL}/pages/profile`}>
													<img
														alt="avatar"
														className="rounded-circle"
														src={require("../../../assets/img/faces/6.jpg")}
													/>
												</Link>
											</div>
											<div className="media-body">
												<div className="d-flex align-items-center">
													<div className="mt-0">
														<h5 className="mb-1 tx-15 font-weight-semibold text-dark">
															{item.name}
														</h5>
														<p className="mb-0 tx-13 mb-0 text-muted">
															{item.message}
														</p>
													</div>
													<div className="ms-auto">
														<Badge bg="" className="float-end badge notification-badge">
															<span className="tx-11 font-weight-semibold">
																{item.date}
															</span>
														</Badge>
													</div>
												</div>
											</div>
										</div>
									</div>
								</li>
							)}
						</ul>
						<div className="text-center mb-4">
							<Button className="btn btn-primary">Xem thêm</Button>
						</div>
					</div>
				</Grid>
			</Grid>
		</Box>
	)
}

export default AdminNotifications;
