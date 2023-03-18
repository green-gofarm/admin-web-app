import React from 'react'
import { Button, Card } from 'react-bootstrap'
import ActivityItem from '../ui-segment/ActivityItem';
import { Grid } from '@mui/material';

const data = [
    {
        id: 1,
        farmstayId: 1,
        name: "Tham quan rừng nguyên sơ",
        description: "Trải nghiệm những khoảnh khắc gần gũi với thiên nhiên, khám phá rừng nguyên sơ hoang sơ, thư giãn và tìm lại bình an cho tâm hồn.",
        categoryId: 1,
        defaultPrice: 250000,
        images: {
            logo: "https://example.com/hiking.jpg",
            others: [
                "https://example.com/hiking.jpg",
                "https://example.com/hiking.jpg"
            ]
        },
        status: 1,
        slot: 10,
        createdDate: "2022-03-09 15:30:00",
        updatedDate: "2022-03-09 15:30:00"
    },
    {
        id: 2,
        farmstayId: 1,
        name: "Câu cá trên hồ",
        description: "Bạn sẽ được tận hưởng không gian yên tĩnh và thoải mái trên chiếc xuồng nhỏ giữa hồ nước, thả câu và chờ đợi đến khi cá cắn mồi. Cảm giác đón nhận con cá đầu tiên là vô cùng phấn khích và hào hứng. Bạn có thể tận hưởng ngay tại chỗ bằng cách nướng cá tươi ngay trên bờ hồ hoặc mang về nhà để nấu các món ăn ngon khác.",
        categoryId: 2,
        defaultPrice: 150000,
        images: {
            logo: "https://example.com/hiking.jpg",
            others: [
                "https://example.com/hiking.jpg",
                "https://example.com/hiking.jpg"
            ]
        },
        status: 1,
        slot: 5,
        createdDate: "2022-03-09 15:30:00",
        updatedDate: "2022-03-09 15:30:00"
    },
    {
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
    }
];

function ActivityTab() {
    return (
        <Grid container spacing={2}>

            {data.map((item) =>
                <Grid item xs={12} key={item.id}>
                    <Card>
                        <Card.Body className="card-body p-0">
                            <ActivityItem item={item} />
                        </Card.Body>
                    </Card>
                </Grid>
            )}
            <Grid item xs={12}>
                <div className="text-center">
                    <Button className="btn btn-primary">Xem thêm</Button>
                </div>
            </Grid>
        </Grid>
    )
}

export default ActivityTab