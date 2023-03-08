import { Card } from 'react-bootstrap';
import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import ServiceCategoryTable from './TagTable';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Thẻ mô tả",
        href: "/management"
    },
    {
        text: "Thẻ mô tả",
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

const TagManagement = () => {

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Thẻ mô tả"
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

TagManagement.propTypes = {};

TagManagement.defaultProps = {};

export default TagManagement;
