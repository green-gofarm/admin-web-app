import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import WithdrawalRequestTable from './WithdrawalRequestTable';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Thanh toán",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

export const STATUSES = {
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
}

const WithdrawalRequestManagement = () => {

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Các khoản thanh toán"
                breadcrumb={breadcrumb}
            />

            <Box
                component={Grid}
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <WithdrawalRequestTable />
                </Grid>
            </Box>
        </Box>
    );
}

WithdrawalRequestManagement.propTypes = {};

WithdrawalRequestManagement.defaultProps = {};

export default WithdrawalRequestManagement;
