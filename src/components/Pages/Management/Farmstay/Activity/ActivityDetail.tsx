import { useParams } from 'react-router-dom';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';
import { Box, Grid } from '@mui/material';
import DetailPageHeaderTitle from '../../../../General/DetailPageHeaderTitle';
import ActivityDetailHeader from './ActivityDetailHeader';
import ActivitySchedule from './ActivitySchedule';
import useActivityDetail from './hooks/useActivityDetail';
import ActivityImage from './ActivityImage';
import useActivityImages from '../FarmstayDetail/hooks/useActivityImages';
import { Card } from 'react-bootstrap';
import ActivityDescription from './ActivityDescription';
import useBackUrl from '../../../../../hooks/useBackUrl';

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
        text: "Hoạt động",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

function ActivityDetail() {
    const { id, activityId } = useParams();
    const { getBackUrl } = useBackUrl();

    const { detail, loading } = useActivityDetail(id, activityId);
    const images = useActivityImages(detail);

    return (
        <Box marginBottom="1.3rem">
            {/* <!-- breadcrumb --> */}
            <PageHeader
                title={
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        <DetailPageHeaderTitle
                            backUrl={getBackUrl() ?? "/management/farmstay"}
                            title="Chi tiết hoạt động"
                        />
                    </Box>
                }
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <Card.Body className="border-0">
                            <ActivityDetailHeader
                                detail={detail}
                                loading={loading}
                                images={images}
                            />
                        </Card.Body>
                    </Card>

                </Grid>

                <Grid item xs={12}>
                    <ActivityDescription
                        detail={detail}
                        loading={loading}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ActivityImage
                        detail={detail}
                        loading={loading}
                        images={images}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ActivitySchedule
                        detail={detail}
                        loading={loading}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ActivityDetail