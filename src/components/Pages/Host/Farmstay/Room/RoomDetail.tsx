import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';
import { Box, Grid } from '@mui/material';
import DetailPageHeaderTitle from '../../../../General/DetailPageHeaderTitle';
import RoomSchedule from './RoomSchedule';
import { Card } from 'react-bootstrap';
import RoomDetailHeader from './RoomDetailHeader';
import RoomImage from './RoomImage';
import useRoomDetail from '../../../Management/Farmstay/Room/hooks/useRoomDetail';
import useRoomImages from '../../../Management/Farmstay/FarmstayDetail/hooks/useRoomImages';
import useAllRoomCategories from '../../../Management/RoomCategory/hooks/useAllRoomCategories';
import RoomBasicInfo from './RoomBasicInfo';

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

    const { detail, loading, refresh } = useRoomDetail(id, roomId);
    const images = useRoomImages(detail);
    useAllRoomCategories();

    return (
        <Box marginBottom="1.3rem">
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
                                refresh={refresh}
                            />
                        </Card.Body>
                    </Card>

                </Grid>

                <Grid item xs={12}>
                    <RoomBasicInfo
                        detail={detail}
                        loading={loading}
                        refresh={refresh}
                    />
                </Grid>

                <Grid item xs={12}>
                    <RoomImage
                        detail={detail}
                        loading={loading}
                        images={images}
                        refresh={refresh}
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