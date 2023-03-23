import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import ServiceCategoryTable from './WithdrawalRequestTable';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý danh mục",
        href: "/management"
    },
    {
        text: "Yêu cầu thanh toán",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const WithdrawalRequestManagement = () => {
    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Yêu cầu thanh toán"
                breadcrumb={breadcrumb}
            />

            <Box
                component={Grid}
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <Box className="table-responsive">
                        <ServiceCategoryTable />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

WithdrawalRequestManagement.propTypes = {};

WithdrawalRequestManagement.defaultProps = {};

export default WithdrawalRequestManagement;
