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

            <Box
                component={Grid}
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <ServiceCategoryTable />
                </Grid>
            </Box>
        </Box>
    );
}

export default TagManagement;
