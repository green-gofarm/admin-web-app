import { Badge, Card } from 'react-bootstrap';
import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';
import FarmstayPreviewTable from './FarmstayPreviewTable';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Farmstay",
        href: "/management/farmstay"
    },
    {
        text: "Phê duyệt farmstay",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const FarmstayPreviewManagement = () => {


    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Phê duyệt Farmstay"
                breadcrumb={breadcrumb}
            />

            <Box
                component={Grid}
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            <Box component="h5" fontWeight="500" className="mb-0">
                                Đang có
                                <Badge
                                    bg=""
                                    className=" badge-primary-transparent tx-16 font-weight-bold text-primiary ms-2 me-2"
                                >
                                    4
                                </Badge>
                                farmstay cần phê duyệt
                            </Box>
                        </Card.Body>
                        <Card.Body>
                            <div className="input-group mb-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoFocus
                                    placeholder="Tìm kiếm theo tên, địa chỉ"
                                />
                                <span className="input-group-append">
                                    <button className="btn ripple btn-primary" type="button">
                                        Tìm kiếm
                                    </button>
                                </span>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <p className="text-muted mb-1">
                                Tìm được 3 kết quả.
                            </p>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Box className="table-responsive">
                        <FarmstayPreviewTable />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

export default FarmstayPreviewManagement;
