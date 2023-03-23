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
