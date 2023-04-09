import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import ProfileHeader from './segment/ProfileHeader';
import BasicInfo from './segment/BasicInfo';
import Navigation, { NavigationItem } from '../../../General/Tab/Navigation';
import { Tab } from 'react-bootstrap';
import useHostProfileTabs, { TAB_KEYS } from './hooks/useProfileTabs';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { signInAdmin } from '../../../../redux/auth/action';

const breadcrumb: Array<IBreadcrumbItem> = [];


const tabOptions: NavigationItem[] = [
    {
        label: "Thông tin",
        eventKey: TAB_KEYS.ABOUT
    },
]

function Profile() {

    const dispatch = useDispatch();
    const user = useCurrentUser();
    const { tab, handleChangeTab } = useHostProfileTabs();

    const refresh = useCallback(() => {
        dispatch(signInAdmin());
    }, [dispatch]);

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Hồ sơ cá nhân"
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ProfileHeader refresh={refresh} />

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
                                                refresh={refresh}
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

export default Profile;