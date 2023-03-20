import { Badge, Card } from 'react-bootstrap';
import { Box, Button, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import OrderTable from './BookingRequestTable';
import RefreshIcon from '@mui/icons-material/Refresh';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
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

const BookingRequestManagement = () => {

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
                    <Card className="custom-card">
                        <Card.Body>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Box component="h5" fontWeight="500" className="mb-0">
                                    Đang có
                                    <Badge
                                        bg=""
                                        className=" badge-primary-transparent tx-16 font-weight-bold text-primiary ms-2 me-2"
                                    >
                                        32
                                    </Badge>
                                    đơn cần duyệt
                                </Box>

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<RefreshIcon />}
                                >
                                    Làm mới
                                </Button>
                            </Box>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Box className="table-responsive">
                        <OrderTable />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

export default BookingRequestManagement;
