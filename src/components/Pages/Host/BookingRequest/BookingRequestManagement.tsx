import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import OrderTable from './BookingRequestTable';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Duyệt đơn",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const BookingRequestManagement = () => {

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Duyệt đơn"
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

export default BookingRequestManagement;
