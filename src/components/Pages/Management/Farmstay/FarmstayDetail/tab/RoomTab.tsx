import { useMemo } from 'react'
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { Card, Table } from 'react-bootstrap';
import RoomRowItem from '../ui-segment/RoomRowItem';
import useAllRoomCategories from '../../../RoomCategory/hooks/useAllRoomCategories';
import { Box } from '@mui/material';
interface RoomTabProps {
    detail?: any,
    loading?: boolean,
}

function RoomTab({
    detail,
    loading
}: RoomTabProps) {

    useAllRoomCategories();

    const rooms: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.rooms)) return [];
        return detail.rooms;
    }, [detail]);

    if (!isAvailableArray(rooms)) {
        return <i>Chưa có phòng</i>
    }


    return (
        <Card>
            <Card.Body>
                <div className="table-responsive">
                    <Table className="table table-bordered">
                        <thead>
                            <tr>
                                <Box component="th">Mã</Box>
                                <Box component="th">Tên</Box>
                                <Box component="th">Phân loại</Box>
                                <Box component="th">Mô tả</Box>
                                <Box component="th">Đơn giá</Box>
                                <Box component="th">Trạng thái</Box>
                                <Box component="th"></Box>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((item) =>
                                <RoomRowItem
                                    key={item.id}
                                    item={item}
                                />
                            )}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    )
}

export default RoomTab