import React, { Fragment, useMemo } from 'react'
import categoryJson from "../../RoomCategory/room-category.json";
import roomInventoryJson from "./room-inventory.json";
import { isAvailableArray } from '../../../../../helpers/arrayUtils';
import { Table } from 'react-bootstrap';
import { Box } from '@mui/material';
import { convertToMoney } from '../../../../../helpers/stringUtils';
import { findRoomStatus } from '../../../../../setting/room-setting';
import { Status } from '../../../../../setting/Status';

const categoryObject = JSON.parse(JSON.stringify(categoryJson));
const categoryData = categoryObject.data;

const inventoryObject = JSON.parse(JSON.stringify(roomInventoryJson));
const inventoryData = inventoryObject.data;

function RoomTab() {

    const availableCategory = useMemo(() => categoryData?.filter((item: any) => inventoryData?.find((i: any) => i?.roomCategoryId === item.id)), []);

    if (!isAvailableArray(availableCategory) || !isAvailableArray(inventoryData)) {
        return <i>Chưa đưa lên phòng nào</i>;
    }

    return (
        <div>
            {availableCategory.map((category, index) =>
                <Fragment key={index}>
                    <h5 className="mb-2 mt-3 fw-semibold">
                        {category.name}
                    </h5>
                    <div className="table-responsive">
                        <Table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-start">Tên phòng</th>
                                    <th className="w-150">Trạng thái</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventoryData.filter(i => i.roomCategoryId === category.id).map((item, jd) =>
                                    <tr key={jd}>
                                        <Box
                                            component="td"
                                            className="fw-semibold"
                                        >
                                            {item.name}
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
                                            <Box marginLeft="auto">
                                                {convertToMoney(item.defaultPrice)}
                                            </Box>
                                        </Box>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default RoomTab