import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import ProfileHeader from './segment/ProfileHeader';
import BasicInfo from './segment/BasicInfo';
import BankAccountInfo from './segment/BankAccountInfo';
import Navigation, { NavigationItem } from '../../../General/Tab/Navigation';
import { Tab } from 'react-bootstrap';
import useHostProfileTabs, { TAB_KEYS } from './hooks/useHostProfileTabs';

const breadcrumb: Array<IBreadcrumbItem> = [];


const tabOptions: NavigationItem[] = [
    {
        label: "Thông tin",
        eventKey: TAB_KEYS.ABOUT
    },
    {
        label: "Tài khoản ngân hàng",
        eventKey: TAB_KEYS.BANK_ACCOUNT
    }
]

function Profile() {

    const user = useCurrentUser();
    const { tab, handleChangeTab } = useHostProfileTabs();

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Hồ sơ cá nhân"
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ProfileHeader />

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
                                            <BankAccountInfo user={user} />
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

export default Profile;