import { Box, Grid } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import { Tab } from 'react-bootstrap';

import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';

import { createCodeString } from '../../../../../helpers/stringUtils';
import Navigation, { NavigationItem } from '../../../../General/Tab/Navigation';
import DetailPageHeaderTitle from '../../../../General/DetailPageHeaderTitle';
import TabPaneContentBody from '../../../../General/Tab/TabPaneContentBody';
import ActivityTab from './tab/ActivityTab';
import RoomTab from './tab/RoomTab';
import ServiceTab from './tab/ServiceTab';
import PolicyTab from './tab/PolicyTab';
import FAQTab from './tab/FAQTab';
import FarmstayPreviewHeader from './FarmstayPreviewHeader';
import PreviewBasicInfoTab from './tab/PreviewBasicInfoTab';

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

const TAB_KEYS = {
    About: "About",
    Activity: "Activity",
    Room: "Room",
    Service: "Service",
    Policies: "Policies",
    FAQ: "FAQ",
    OrderHistory: "OrderHistory",
    Feedback: "Feedback",
}

const tabOptions: NavigationItem[] = [
    {
        label: "Tổng quan",
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

const detail = {
    id: 1,
    rating: 3,
    name: "Nông trại vui vẻ",
    description: "Trải nghiệm cuộc sống vùng quê sông nước",
    contactInformation: "Email: wifildt@gmail.com, Phone: 0901234567",
    address: "160 Pasteur, phường 6, quận 3, thành phố Hồ Chí Minh",
    country: "Việt Nam",
    city: "Thành phố Hồ Chí Minh",
    status: 1,
    hostId: 1,
    images: "image1.jpg,image2.jpg,image3.jpg",
    createdDate: "2022-01-01 10:00:00",
    updatedDate: "2022-01-02 12:00:00",
    host: {
        userId: 45,
        name: "Lê Danh Trọng",
        bankAccountName: "LE DANH TRONG",
        bankAccountNumber: "1234567890",
        createdDate: "2022-01-01 10:00:00",
        updatedDate: "2022-01-02 12:00:00"
    }
};

function FarmstayPreview() {

    const { id } = useParams();
    const [searchParams] = useSearchParams();

    return (
        <Box marginBottom="1.3rem">
            {/* <!-- breadcrumb --> */}
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
                    <FarmstayPreviewHeader detail={detail} />
                    <div className="profile-tab tab-menu-heading">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="About">
                            <Grid
                                container
                                spacing={2}
                            >
                                <Grid item xs={12}>
                                    {/* <Navigation data={tabOptions} /> */}
                                </Grid>

                                <Grid item xs={12}>
                                    <Tab.Content>
                                        <TabPaneContentBody eventKey={TAB_KEYS.About}>
                                            <PreviewBasicInfoTab detail={detail} />
                                        </TabPaneContentBody>
                                        <Tab.Pane eventKey={TAB_KEYS.Activity}>
                                            <ActivityTab />
                                        </Tab.Pane>
                                        <TabPaneContentBody eventKey={TAB_KEYS.Room}>
                                            <RoomTab />
                                        </TabPaneContentBody>
                                        <TabPaneContentBody eventKey={TAB_KEYS.Service}>
                                            <ServiceTab />
                                        </TabPaneContentBody>
                                        <TabPaneContentBody eventKey={TAB_KEYS.Policies}>
                                            <PolicyTab />
                                        </TabPaneContentBody>
                                        <TabPaneContentBody eventKey={TAB_KEYS.FAQ}>
                                            <FAQTab />
                                        </TabPaneContentBody>
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