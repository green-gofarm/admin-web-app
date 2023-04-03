
import { Badge, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PageHeader, { IBreadcrumbItem } from "../../General/PageHeader";
import { Box, Grid, Skeleton } from "@mui/material";
import { NOTIFICATION_STATUSES, getRedirectPathFromNotification, useNotificationStyles } from "../../../setting/notification-setting";
import { useDispatch } from "react-redux";
import useDelayLoading from "../../../hooks/useDelayLoading";
import { convertISOToNaturalFormat, formatDate } from "../../../helpers/dateUtils";
import MessageIcon from '@mui/icons-material/Message';
import { useCallback, useMemo } from "react";
import { markAsRedNotification } from "../../../redux/auth/action";
import useNotification from "./useNotification";
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

const breadcrumb: Array<IBreadcrumbItem> = [];

const parseDatetimeString = (dateString?: string) => {
	const date = formatDate(dateString, "dddd");
	const time = formatDate(dateString, "HH:mm");;
	return { date, time }
}

function AdminNotifications() {

	const classes = useNotificationStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		data,
		loading,
		pagination,
		rowsPerPage,
		refresh
	} = useNotification();

	const delay = useDelayLoading(loading);

	const preparedData = useMemo(() => {
		if (data.length < 1) return [];
		return data.map(item => {
			const object = parseDatetimeString(item.createdDate);
			item.time = object.time;
			item.date = object.date;
			return item;
		})
	}, [data]);

	const handleOnClickItem = useCallback((item: any) => {
		dispatch(markAsRedNotification(item.id));
		navigate(getRedirectPathFromNotification(item.extras), {
			replace: true
		})
	}, [dispatch, navigate]);

	const handleLoadMore = useCallback(() => {
		refresh({
			...pagination,
			pageSize: pagination.pageSize + rowsPerPage
		})
	}, [pagination, refresh, rowsPerPage]);

	return (
		<Box
			marginBottom="1.3rem"
		>
			<Container>
				<PageHeader
					title="Thông báo"
					breadcrumb={breadcrumb}
				/>


				<Grid container spacing={2}>

					{preparedData.length < 1 && !delay
						? <Grid item xs={12}>
							<Card>
								<Card.Body>
									<Box
										display="flex"
										alignItems="center"
										justifyContent="center"
										width="100%"
										height="100px"
										fontStyle="italic"
										className='text-muted'
										gap="8px"
										fontSize="1.125rem"
									>
										<NotificationsOffIcon fontSize="large" />
										Chưa có thông báo
									</Box>
								</Card.Body>
							</Card>
						</Grid>
						: null
					}
					<Grid item xs={12}>
						<Box
							component="ul"
							className="notification"
							width="100% !important"
						>
							{preparedData.map((item: any, index) =>
								<li key={index}>
									<div className="notification-time">
										<Box
											component="span"
											className="date"
											textTransform="capitalize"
										>
											{item.date}
										</Box>
										<span className="time">
											{item.time}
										</span>
									</div>
									<div className="notification-icon">
										<Link to="#"></Link>
									</div>
									<Box
										className="notification-body"
										onClick={() => handleOnClickItem(item)}
										sx={{
											cursor: "pointer",
											"&:hover": {
												background: "#dcece4 !important"
											}
										}}
									>
										<Box
											className="media mt-0"
											position="relative"
										>
											{item.status === NOTIFICATION_STATUSES.UNREAD
												? <Box
													className={classes.dot}
													position="absolute"
													right="1rem"
													top="0"
												/>
												: null
											}
											<div className={"main-img-user avatar-md main-avatar me-3 shadow " + classes.noAfter}>
												<MessageIcon
													fontFamily="large"
												/>
											</div>
											<div className="media-body">
												<div className="d-flex align-items-center">
													<div className="mt-0">
														<h5 className="mb-1 tx-15 font-weight-semibold text-dark">
															{item.header}
														</h5>
														<p className="mb-0 tx-13 mb-0 text-muted">
															{item.content}
														</p>
													</div>
													<div className="ms-auto">
														<Badge bg="" className="float-end badge notification-badge">
															<span className="tx-11 font-weight-semibold">
																{convertISOToNaturalFormat(item.createdDate)}
															</span>
														</Badge>
													</div>
												</div>
											</div>
										</Box>
									</Box>
								</li>
							)}

							{delay
								? new Array(rowsPerPage).fill("").map((_, index) =>
									<li key={index}>
										<div className="notification-time">
											<span className="date">
												{/* {item.notificationTime.date} */}
											</span>
											<span className="time">
												{/* {item.notificationTime.time} */}
											</span>
										</div>
										<div className="notification-icon">
											<Link to="#"></Link>
										</div>
										<Box
											className="notification-body"
										>
											<Box
												className="media mt-0"
												position="relative"
											>
												<div className={"main-img-user avatar-md main-avatar me-3 shadow " + classes.noAfter}>
													<Skeleton variant="circular" height="30px" width="30px" />
												</div>
												<div className="media-body">
													<div className="d-flex align-items-center">
														<div className="mt-0 w-100">
															<h5 className="mb-1 tx-15 font-weight-semibold text-dark">
																<Skeleton width="150px" />
															</h5>
															<p className="mb-0 tx-13 mb-0 text-muted">
																<Skeleton width="100%" />
																<Skeleton width="100%" />
															</p>
														</div>
														<div className="ms-auto">
															<Badge bg="" className="float-end badge notification-badge">
																<span className="tx-11 font-weight-semibold">
																	<Skeleton width="80px" />
																</span>
															</Badge>
														</div>
													</div>
												</div>
											</Box>
										</Box>
									</li>
								)
								: null
							}
						</Box>
						{data.length < pagination.totalItem
							? <div className="text-center mb-4">
								<Button
									className="btn btn-primary"
									onClick={handleLoadMore}
								>
									Xem thêm
								</Button>
							</div>
							: null
						}
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}

export default AdminNotifications;
