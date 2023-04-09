import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Tab } from 'react-bootstrap';

import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';

import { createCodeString } from '../../../../../helpers/stringUtils';
import FarmstayDetailHeader from './FarmstayDetailHeader';
import Navigation, { NavigationItem } from '../../../../General/Tab/Navigation';
import DetailPageHeaderTitle from '../../../../General/DetailPageHeaderTitle';
import BasicInfoTab from './tab/BasicInfoTab';
import ActivityTab from './tab/ActivityTab';
import RoomTab from './tab/RoomTab';
import ServiceTab from './tab/ServiceTab';
import PolicyTab from './tab/PolicyTab';
import FAQTab from './tab/FAQTab';
import useFarmstayDetailTab, { TAB_KEYS } from '../../../Management/Farmstay/FarmstayDetail/hooks/useFarmstayDetailTab';
import useFarmstayDetail from '../../../Management/Farmstay/FarmstayDetail/hooks/useFarmstayDetail';
import FeedbackTab from '../../../Management/Farmstay/FarmstayDetail/tab/FeedbackTab';
import OrderHistoryTab from '../../../Management/Farmstay/FarmstayDetail/tab/OrderHistoryTab';
import useBackUrl from '../../../../../hooks/useBackUrl';
import ScheduleTab from '../../../Management/Farmstay/FarmstayDetail/tab/ScheduleTab';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Farmstay",
        href: "/management/farmstay"
    },
    {
        text: "Chi tiết",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const tabOptions: NavigationItem[] = [
    {
        label: "Thông tin",
        eventKey: TAB_KEYS.About
    },
    {
        label: "Lịch trình hoạt động",
        eventKey: TAB_KEYS.Schedule
    },
    {
        label: "Hoạt động",
        eventKey: TAB_KEYS.Activity
    },
    {
        label: "Phòng",
        eventKey: TAB_KEYS.Room
    },
    {
        label: "Dịch vụ",
        eventKey: TAB_KEYS.Service
    },
    {
        label: "Quy định",
        eventKey: TAB_KEYS.Policies
    },
    {
        label: "Hỏi đáp",
        eventKey: TAB_KEYS.FAQ
    },
    {
        label: "Đánh giá & Phản hồi",
        eventKey: TAB_KEYS.Feedback
    },
    {
        label: "Lịch sử đơn hàng",
        eventKey: TAB_KEYS.OrderHistory
    },
]

function FarmstayDetail() {

    const { id } = useParams();
    const { tab, handleChangeTab } = useFarmstayDetailTab();
    const { getBackUrl } = useBackUrl();

    const { farmstayDetail, loading, refresh } = useFarmstayDetail(id);

    return (
        <Box marginBottom="1.3rem" overflow="visible">
            {/* <!-- breadcrumb --> */}
            <PageHeader
                title={
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        <DetailPageHeaderTitle
                            backUrl={getBackUrl() ?? "/management/farmstay"}
                            title="Chi tiết farmstay"
                            code={createCodeString("FR", id)}
                        />
                    </Box>
                }
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FarmstayDetailHeader
                        detail={farmstayDetail}
                        loading={loading}
                        refresh={refresh}
                    />
                    <div className="profile-tab tab-menu-heading">
                        <Tab.Container
                            onSelect={(newTab) => handleChangeTab(newTab)}
                            activeKey={tab}
                        >
                            <Grid
                                container
                                spacing={2}
                            >
                                <Grid item xs={12}>
                                    <Navigation
                                        data={tabOptions}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey={TAB_KEYS.About}>
                                            <BasicInfoTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                                refresh={refresh}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={TAB_KEYS.Activity}>
                                            <ActivityTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                                refresh={refresh}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={TAB_KEYS.Room}>
                                            <RoomTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                                refresh={refresh}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={TAB_KEYS.Service}>
                                            <ServiceTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                                refresh={refresh}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={TAB_KEYS.Policies}>
                                            <PolicyTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                                refresh={refresh}
                                            />
                                        </Tab.Pane>

                                        <Tab.Pane style={{ overflow: "visible" }} eventKey={TAB_KEYS.FAQ}>
                                            <FAQTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                                refresh={refresh}
                                            />
                                        </Tab.Pane>

                                        <Tab.Pane eventKey={TAB_KEYS.Feedback}>
                                            <FeedbackTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                            />

                                        </Tab.Pane>

                                        <Tab.Pane eventKey={TAB_KEYS.OrderHistory}>
                                            <OrderHistoryTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                            />
                                        </Tab.Pane>

                                        <Tab.Pane eventKey={TAB_KEYS.Schedule}>
                                            <ScheduleTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                            />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Grid>
                            </Grid>
                        </Tab.Container>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}

export default FarmstayDetail;