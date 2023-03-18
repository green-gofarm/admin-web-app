import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import PageHeader, { IBreadcrumbItem } from '../../../../General/PageHeader';
import { Box, Grid } from '@mui/material';
import DetailPageHeaderTitle from '../../../../General/DetailPageHeaderTitle';
import ActivityDetailHeader from './ActivityDetailHeader';
import { Card } from 'react-bootstrap';
import ActivitySchedule from './ActivitySchedule';

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
        href: "/management/farmstay/all"
    },
    {
        text: "Chi tiết farmstay",
        active: false,
    },
    {
        text: "Hoạt động",
        active: true,
        props: {
            "aria-current": "page"
        }
    }
]

const detail = {
    id: 3,
    farmstayId: 2,
    name: "Cưỡi voi",
    description: "Một trải nghiệm thú vị giúp bạn có thể khám phá văn hóa và truyền thống của địa phương. Bạn sẽ được cưỡi trên lưng những chú voi khổng lồ và khám phá những cảnh đẹp tuyệt vời ở nơi đây. Ngoài ra, bạn cũng có thể tìm hiểu thêm về cuộc sống và văn hóa của những người dân địa phương thông qua hướng dẫn của họ. Đây là một trải nghiệm đáng nhớ mà bạn không nên bỏ lỡ khi đến thăm.",
    categoryId: 1,
    defaultPrice: 350000,
    images: {
        logo: "https://example.com/hiking.jpg",
        others: [
            "https://example.com/hiking.jpg",
            "https://example.com/hiking.jpg"
        ]
    },
    status: 1,
    slot: 3,
    createdDate: "2022-03-09 15:30:00",
    updatedDate: "2022-03-09 15:30:00"
};

function ActivityDetail() {
    const { id, activityId } = useParams();
    const [searchParams] = useSearchParams();

    console.log({ id, activityId });

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
                            title="Chi tiết hoạt động"
                        />
                    </Box>
                }
                breadcrumb={breadcrumb}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ActivityDetailHeader detail={detail} />
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <Card.Body className="border-0">
                            <h5 className="mb-2 mt-1 fw-semibold">Lịch hoạt động</h5>
                            <ActivitySchedule />
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ActivityDetail