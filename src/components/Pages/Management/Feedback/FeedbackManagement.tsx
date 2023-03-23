import { Box, Grid } from '@mui/material';
import PageHeader, { IBreadcrumbItem } from '../../../General/PageHeader';
import FeedbackTable from './FeedbackTable';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Thông tin phản hồi",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const FeedbackCategoryManagement = () => {

    return (
        <Box marginBottom="1.3rem">
            <PageHeader
                title="Thông tin phản hồi (Feedback / Reply)"
                breadcrumb={breadcrumb}
            />

            {/* <!-- Row --> */}
            <Grid
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <Box className="table-responsive">
                        <FeedbackTable />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

FeedbackCategoryManagement.propTypes = {};

FeedbackCategoryManagement.defaultProps = {};

export default FeedbackCategoryManagement;
