import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';
import AdminTable from './AdminTable';

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
        text: "Quản trị viên",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const AdminManagement = () => {

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Quản trị viên"
                breadcrumb={breadcrumb}
            />

            <Box
                component={Grid}
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <Box className="table-responsive">
                        <AdminTable />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

AdminManagement.propTypes = {};

AdminManagement.defaultProps = {};

export default AdminManagement;
