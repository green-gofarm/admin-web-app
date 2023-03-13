import React from 'react'
import { Button, Card } from 'react-bootstrap'
import ActivityItem from '../ui-segment/ActivityItem';

const data = [
    {
        id: 1,
        farmstayId: 1,
        description: "Hiking in the forest",
        categoryId: 1,
        defaultPrice: 250000,
        images: "https://example.com/hiking.jpg",
        status: 1,
        slot: 10,
        createdDate: "2022-03-09 15:30:00",
        updatedDate: "2022-03-09 15:30:00"
    },
    {
        id: 2,
        farmstayId: 1,
        description: "Fishing in the pond",
        categoryId: 2,
        defaultPrice: 150000,
        images: "https://example.com/fishing.jpg",
        status: 1,
        slot: 5,
        createdDate: "2022-03-09 15:30:00",
        updatedDate: "2022-03-09 15:30:00"
    },
    {
        id: 3,
        farmstayId: 2,
        description: "Horseback riding",
        categoryId: 1,
        defaultPrice: 350000,
        images: "https://example.com/horseback.jpg",
        status: 1,
        slot: 3,
        createdDate: "2022-03-09 15:30:00",
        updatedDate: "2022-03-09 15:30:00"
    }
];

function ActivityTab() {
    return (
        <Card>
            <Card.Body className="card-body p-0">
                {data.map((item, index) =>
                    <ActivityItem
                        key={index}
                        item={item}
                    />
                )}
                <Card.Footer>
                    <Button variant="" className="btn btn-light">Xem thêm</Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default ActivityTab