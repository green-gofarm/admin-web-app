import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';
import CustomerTable from './CustomerTable';

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
        text: "Danh sách khách du lịch",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const CustomerManagement = () => {

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Danh sách khách du lịch"
                breadcrumb={breadcrumb}
            />

            <Box
                component={Grid}
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <CustomerTable />
                </Grid>
            </Box>
        </Box>
    );
}

CustomerManagement.propTypes = {};

CustomerManagement.defaultProps = {};

export default CustomerManagement;
