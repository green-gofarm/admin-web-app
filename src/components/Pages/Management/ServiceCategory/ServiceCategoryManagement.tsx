import { Card } from 'react-bootstrap';
import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import ServiceCategoryTable from './ServiceCategoryTable';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý danh mục",
        href: "/management"
    },
    {
        text: "Loại dịch vụ",
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

const ServiceCategoryManagement = () => {

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Loại dịch vụ"
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
                            <div className="input-group mb-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoFocus
                                    placeholder="Tìm kiếm theo tên"
                                />
                                <span className="input-group-append">
                                    <button className="btn ripple btn-primary" type="button">
                                        Tìm kiếm
                                    </button>
                                </span>
                            </div>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Box className="table-responsive">
                        <ServiceCategoryTable />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

ServiceCategoryManagement.propTypes = {};

ServiceCategoryManagement.defaultProps = {};

export default ServiceCategoryManagement;
