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
                    <FarmstayPreviewTable />
                </Grid>
            </Box>
        </Box>
    );
}

export default FarmstayPreviewManagement;
