import { useMemo } from 'react'
import { Card } from 'react-bootstrap'
import { Grid } from '@mui/material';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import useAllRoomCategories from '../../../../Management/RoomCategory/hooks/useAllRoomCategories';
import RoomItem from '../ui-segment/RoomItem';
interface RoomTabProps {
    detail?: any,
    loading?: boolean,
}

function RoomTab({
    detail,
    loading,
}: RoomTabProps) {

    useAllRoomCategories();

    const rooms: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.rooms)) return [];
        return detail.rooms;
    }, [detail]);

    return (
        <>
            <Grid container spacing={2}>
                {rooms.length < 1
                    ? <Grid item xs={12}>
                        <Card>
                            <Card.Body>
                                <i>Chưa có phòng nào</i>
                            </Card.Body>
                        </Card>
                    </Grid>
                    : null
                }
                {rooms.map((item) =>
                    <Grid item xs={12} key={item.id}>
                        <Card>
                            <Card.Body className="card-body p-0">
                                <RoomItem item={item} />
                            </Card.Body>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </>
    )
}

export default RoomTab;