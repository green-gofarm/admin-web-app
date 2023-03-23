import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import OrderTable from './OrderTable';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý danh mục",
        href: "/management"
    },
    {
        text: "Đơn hàng",
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
                title="Đơn hàng"
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
