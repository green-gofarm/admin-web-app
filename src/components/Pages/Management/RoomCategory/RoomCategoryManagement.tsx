import { Card } from 'react-bootstrap';
import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import RoomCategoryTable from './RoomCategoryTable';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý danh mục",
        href: "/management"
    },
    {
        text: "Loại phòng",
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

const RoomCategoryManagement = () => {

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Loại phòng"
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
                        <RoomCategoryTable />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

RoomCategoryManagement.propTypes = {};

RoomCategoryManagement.defaultProps = {};

export default RoomCategoryManagement;
