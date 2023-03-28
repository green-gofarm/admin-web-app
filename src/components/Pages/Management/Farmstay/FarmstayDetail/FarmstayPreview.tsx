import { Box, Grid } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import { Tab } from 'react-bootstrap';

import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';

import { createCodeString } from '../../../../../helpers/stringUtils';
import Navigation, { NavigationItem } from '../../../../General/Tab/Navigation';
import DetailPageHeaderTitle from '../../../../General/DetailPageHeaderTitle';
import BasicInfoTab from './tab/BasicInfoTab';
import ActivityTab from './tab/ActivityTab';
import RoomTab from './tab/RoomTab';
import ServiceTab from './tab/ServiceTab';
import PolicyTab from './tab/PolicyTab';
import FAQTab from './tab/FAQTab';
import useFarmstayDetail from './hooks/useFarmstayDetail';
import useFarmstayDetailTab, { TAB_KEYS } from './hooks/useFarmstayDetailTab';
import FarmstayPreviewHeader from './FarmstayPreviewHeader';

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
        text: "Phê duyệt",
        href: "/management/farmstay/preview"
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
]

function FarmstayPreview() {

    const { id } = useParams();
    const { tab, handleChangeTab } = useFarmstayDetailTab();
    const [searchParams] = useSearchParams();

    const { farmstayDetail, loading } = useFarmstayDetail(id);

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
                            backUrl={searchParams.get("backUrl") ?? "/management/farmstay"}
                            title="Chi tiết farmstay"
                            code={createCodeString("FR", id)}
                        />
                    </Box>
                }
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FarmstayPreviewHeader
                        detail={farmstayDetail}
                        loading={loading}
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
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={TAB_KEYS.Activity}>
                                            <ActivityTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={TAB_KEYS.Room}>
                                            <RoomTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={TAB_KEYS.Service}>
                                            <ServiceTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={TAB_KEYS.Policies}>
                                            <PolicyTab
                                                detail={farmstayDetail}
                                                loading={loading}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={TAB_KEYS.FAQ}>
                                            <FAQTab
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

export default FarmstayPreview;