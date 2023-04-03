import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link, useNavigate } from 'react-router-dom';
import useNotification from '../../hooks/useNotification';
import { messaging } from '../../Firebase/firebase';
import { onMessage } from 'firebase/messaging';
import { getTimeAgoString } from '../../helpers/dateUtils';
import EllipsisWrapper from '../../components/General/Wrapper/EllipsisWrapper';
import useDelayLoading from '../../hooks/useDelayLoading';
import { Box, Skeleton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { markAsRedNotification } from '../../redux/auth/action';
import { NOTIFICATION_STATUSES, getNotificationOnlyUnreadState, getRedirectPathFromNotification, setNotificationOnlyUnreadState, useNotificationStyles } from '../../setting/notification-setting';
import { toast } from 'react-toastify';

function NotificationDropDown() {

    const classes = useNotificationStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        data,
        loading,
        pagination,
        rowsPerPage,
        defaultPagination,
        refresh
    } = useNotification(true);

    const delay = useDelayLoading(loading);

    const [onlyUnread, setOnlyUnread] = useState<boolean>(getNotificationOnlyUnreadState());

    const handleOnChangeOnlyUnread = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const isOnlyUnRead = Boolean(event.target.checked);
        setOnlyUnread(isOnlyUnRead);
        setNotificationOnlyUnreadState(isOnlyUnRead);

        if (isOnlyUnRead) {
            refresh(defaultPagination, { Status: NOTIFICATION_STATUSES.UNREAD });
            return;
        }

        refresh(defaultPagination, {});
    }, [defaultPagination, refresh]);

    useEffect(() => {
        if (onlyUnread) {
            refresh(defaultPagination, { Status: NOTIFICATION_STATUSES.UNREAD });
            return;
        }

        refresh(defaultPagination);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const unSubscribe = onMessage(messaging, (payload) => {
            refresh(defaultPagination);
            toast.dark("Có thông báo mới");
        });

        return () => unSubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const element = event.currentTarget;
        if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
            if (!loading && pagination.totalItem > data.length) {
                refresh({
                    ...pagination,
                    pageSize: pagination.pageSize + rowsPerPage
                })
            }
        }
    }

    const handleOnClickItem = useCallback((item: any) => {
        dispatch(markAsRedNotification(
            item.id,
            {
                onSuccess: () => refresh()
            }
        ));
        navigate(getRedirectPathFromNotification(item.extras), {
            replace: true
        })
    }, [dispatch, navigate, refresh]);

    const hasUnread = useMemo(() => {
        return !!data.find(item => item.status === NOTIFICATION_STATUSES.UNREAD)
    }, [data]);

    const renderPanel = () => (
        <Box
            className="d-flex"
            alignItems="center"
            gap="8px"
        >
            <Form.Label className="custom-switch ps-0">
                <span className="custom-switch-description me-2 tx-11">
                    Chỉ hiển thị chưa đọc
                </span>
                <Form.Control
                    type="checkbox"
                    name="custom-switch-radio"
                    className="custom-switch-input"
                    checked={onlyUnread}
                    onChange={handleOnChangeOnlyUnread}
                />
                <span className="custom-switch-indicator"></span>
            </Form.Label>
            {/* <TooltipIconActionSquare
                icon={<Refresh />}
                title='Tải lại'
                onClick={() => refresh()}
            /> */}
        </Box>
    )

    return (
        <Dropdown className=" nav-item main-header-notification d-flex">
            <Dropdown.Toggle className="new nav-link" variant="">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="header-icon-svgs"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z" />
                </svg>
                {hasUnread
                    ? <span className="pulse-danger"></span>
                    : null
                }
            </Dropdown.Toggle>
            <Dropdown.Menu className="slid1">
                <div className="menu-header-content text-start border-bottom pt-2 pb-2">
                    <Box
                        className="d-flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <h6 className="dropdown-title mb-0 tx-15 font-weight-semibold">
                            Thông báo
                        </h6>

                        {renderPanel()}
                    </Box>
                </div>
                <Scrollbars
                    style={{ height: 280 }}
                    onScroll={handleScroll}
                >
                    <div className="main-notification-list Notification-scroll">
                        {data.length < 1 && !delay
                            ? <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height="272px"
                                fontStyle="italic"
                                className='text-muted'
                            >
                                Không có thông báo nào
                            </Box>
                            : null
                        }
                        {data.map((item) =>
                            <Dropdown.Item
                                key={item.id}
                                className={"d-flex p-3 border-bottom " + (item.status === NOTIFICATION_STATUSES.READ ? classes.read : classes.unread)}
                                onClick={() => handleOnClickItem(item)}
                            >
                                <div className="notifyimg bg-pink">
                                    <i className="far fa-folder-open text-white"></i>
                                </div>
                                <div className="ms-3">
                                    <h5 className="notification-label mb-1">
                                        <EllipsisWrapper breakWidth={350}>
                                            {item.header ?? ""}
                                        </EllipsisWrapper>
                                    </h5>
                                    <div className="notification-subtext">
                                        {getTimeAgoString(item.createdDate)}
                                    </div>
                                </div>
                                <div className="ms-auto">
                                    <i className="las la-angle-right text-end text-muted"></i>
                                </div>
                            </Dropdown.Item>
                        )}
                        {delay
                            ? new Array(rowsPerPage).fill("").map((_, index) =>
                                <Dropdown.Item
                                    key={index}
                                    className="d-flex p-3 border-bottom"
                                    href="#"
                                >
                                    <div className="notifyimg bg-pink">
                                        <i className="far fa-folder-open text-white"></i>
                                    </div>
                                    <div className="ms-3">
                                        <h5 className="mb-1">
                                            <Skeleton width={350} />
                                        </h5>
                                        <div className="notification-subtext">
                                            <Skeleton width={160} />
                                        </div>
                                    </div>
                                </Dropdown.Item>
                            )
                            : null
                        }
                    </div>
                </Scrollbars>
                <div className="dropdown-footer bg-white">
                    <Link
                        className="btn btn-primary btn-sm btn-block"
                        to="/notification"
                    >
                        Xem tất cả
                    </Link>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default NotificationDropDown