import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';
import { Box, Grid } from '@mui/material';
import DetailPageHeaderTitle from '../../../../General/DetailPageHeaderTitle';
import RoomSchedule from './RoomSchedule';
import { Card } from 'react-bootstrap';
import useRoomDetail from './hooks/useRoomDetail';
import useRoomImages from '../FarmstayDetail/hooks/useRoomImages';
import RoomDetailHeader from './RoomDetailHeader';
import RoomImage from './RoomImage';
import useAllRoomCategories from '../../RoomCategory/hooks/useAllRoomCategories';
import RoomDescription from './RoomDescription';

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
        text: "Phòng",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

function RoomDetail() {
    const { id, roomId } = useParams();
    const [searchParams] = useSearchParams();

    const { detail, loading } = useRoomDetail(id, roomId);
    const images = useRoomImages(detail);
    useAllRoomCategories();

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
                            backUrl={searchParams.get("backUrl") ?? "/management/farmstay"}
                            title="Chi tiết phòng"
                        />
                    </Box>
                }
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <Card.Body className="border-0">
                            <RoomDetailHeader
                                detail={detail}
                                loading={loading}
                                images={images}
                            />
                        </Card.Body>
                    </Card>

                </Grid>

                <Grid item xs={12}>
                    <RoomDescription
                        detail={detail}
                        loading={loading}
                        images={images}
                    />
                </Grid>

                <Grid item xs={12}>
                    <RoomImage
                        detail={detail}
                        loading={loading}
                        images={images}
                    />
                </Grid>

                <Grid item xs={12}>
                    <RoomSchedule
                        detail={detail}
                        loading={loading}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default RoomDetail;