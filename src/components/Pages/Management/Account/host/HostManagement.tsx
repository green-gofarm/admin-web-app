import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';

import HostTable from './HostTable';

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
        text: "Danh sách",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const HostManagement = () => {

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Danh sách chủ farmstay"
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <HostTable />
                </Grid>
            </Grid>
        </Box>
    );
}

HostManagement.propTypes = {};

HostManagement.defaultProps = {};

export default HostManagement;
