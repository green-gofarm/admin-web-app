import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import ProfileHeader from './segment/ProfileHeader';
import BasicInfo from './segment/BasicInfo';
import { Tab } from 'react-bootstrap';
import useProfileTabs, { TAB_KEYS } from './hooks/useProfileTabs';
import PageHeader, { IBreadcrumbItem } from '../../../../../General/PageHeader';
import Navigation, { NavigationItem } from '../../../../../General/Tab/Navigation';
import useUserDetail from '../../hooks/useUserDetail';
import { ROLES } from '../../../../../../setting/setting';
import { ChevronLeft } from '@mui/icons-material';
import { createCodeString } from '../../../../../../helpers/stringUtils';
import { useNavigate, useParams } from 'react-router-dom';
import BankAccountInfo from './segment/BankAccountInfo';
import useBackUrl from '../../../../../../hooks/useBackUrl';


const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Tài khoản",
        href: "/management/account"
    },
    {
        text: "Khách du lịch",
        href: "/management/account/host"
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
        eventKey: TAB_KEYS.ABOUT
    },
    {
        label: "Tài khoản ngân hàng",
        eventKey: TAB_KEYS.BANK_ACCOUNT
    },
]

function HostDetail() {


    const navigate = useNavigate();
    const { id } = useParams();
    const { getBackUrl } = useBackUrl();

    const { detail: user } = useUserDetail(id, ROLES.HOST)
    const { handleChangeTab, tab } = useProfileTabs();

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title={
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        <Tooltip title="Quay lại">
                            <IconButton
                                onClick={() => navigate(getBackUrl() ?? "/management/account/host")}
                                style={{ padding: 4, marginLeft: -8 }}
                            >
                                <ChevronLeft style={{ width: 26, height: 26 }} />
                            </IconButton>
                        </Tooltip>

                        <Box
                            display="flex"
                            alignItems="center"
                            gap="4px"
                        >
                            {`Chi tiết tài khoản `}
                            <span className="tag tag-rounded">
                                {createCodeString("HO", id)}
                            </span>
                        </Box>
                    </Box>
                }
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ProfileHeader user={user} />

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
                                        <Tab.Pane eventKey={TAB_KEYS.ABOUT}>
                                            <BasicInfo
                                                user={user}
                                            />
                                        </Tab.Pane>

                                        <Tab.Pane eventKey={TAB_KEYS.BANK_ACCOUNT}>
                                            <BankAccountInfo
                                                user={user}
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

export default HostDetail;