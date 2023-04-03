import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import FarmstayTable from './FarmstayTable';

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
        text: "Danh sách",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const FarmstayManagement = () => {


    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Danh sách Farmstay"
                breadcrumb={breadcrumb}
            />

            <Box
                component={Grid}
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <FarmstayTable />
                </Grid>
            </Box>
        </Box>
    );
}

export default FarmstayManagement;
