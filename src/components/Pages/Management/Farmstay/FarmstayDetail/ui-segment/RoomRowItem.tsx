import { Box } from '@mui/material'
import { convertToMoney, createCodeString } from '../../../../../../helpers/stringUtils';
import { Status } from '../../../../../../setting/Status';
import { findRoomStatus } from '../../../../../../setting/room-setting';
import { useNavigate } from 'react-router-dom';
import useBackUrl from '../../../../../../hooks/useBackUrl';
import { RootState } from '../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { memo } from 'react';
import { getRoomCategoryLabel } from '../../../../../../setting/room-category-setting';

interface IRoomItem {
    item: any
}

function RoomRowItem({ item }: IRoomItem) {
    const navigate = useNavigate();

    const { createBackUrl } = useBackUrl();
    const categories = useSelector((state: RootState) => state.room.allRoomCategories);

    return (
        <tr>
            <Box
                component="td"
                className="fw-semibold"
            >
                <Box
                    minWidth="fit-content"
                >
                    {createCodeString("R", item.id)}
                </Box>
            </Box>

            <Box
                component="td"
                className="fw-semibold"
            >
                {item?.name ?? "NO_NAME"}
            </Box>

            <Box
                component="td"
                className="fw-semibold"
            >
                {getRoomCategoryLabel(categories, item.roomCategoryId) ?? "NO_CATEGORY"}
            </Box>

            <Box
                component="td"
                className="fw-semibold"
            >
                {item.description}
            </Box>

            <Box
                component="td"
                className="fw-semibold"
            >
                <Box marginLeft="auto">
                    {convertToMoney(item.price)}
                </Box>
            </Box>

            <Box
                component="td"
                className="fw-semibold"
            >
                <Status statusObject={findRoomStatus(item?.status)} />
            </Box>

            <Box
                component="td"
                className="fw-semibold"
            >
                <Box
                    className="btn btn-primary shadow"
                    onClick={() => navigate(`/management/farmstay/all/${item?.farmstayId}/room/${item?.id}?backUrl=${createBackUrl()}`)}
                >
                    Xem chi tiết
                </Box>
            </Box>
        </tr>
    )
}

export default memo(RoomRowItem);