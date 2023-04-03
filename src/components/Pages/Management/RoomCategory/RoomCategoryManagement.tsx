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
                    <Box className="table-responsive">
                        <RoomCategoryTable />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

export default RoomCategoryManagement;
