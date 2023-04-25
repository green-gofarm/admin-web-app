import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import OrderTable from './OrderTable';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Lịch sử đơn hàng",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const OrderManagement = () => {

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Danh sách đơn hàng"
                breadcrumb={breadcrumb}
            />

            {/* <!-- Row --> */}
            <Box
                component={Grid}
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <OrderTable />
                </Grid>
            </Box>
        </Box>
    );
}

export default OrderManagement;
