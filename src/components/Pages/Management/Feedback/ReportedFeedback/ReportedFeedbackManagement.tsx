import { Box, Grid } from '@mui/material';
import FeedbackTable from './ReportedFeedbackTable';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';

const breadcrumb: Array<IBreadcrumbItem> = [
    {
        text: "Quản lý",
        href: "/management"
    },
    {
        text: "Feedback",
        href: "/management/feedback"
    },
    {
        text: "Feedback bị báo cáo",
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
                title="Feedback bị báo cáo"
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
