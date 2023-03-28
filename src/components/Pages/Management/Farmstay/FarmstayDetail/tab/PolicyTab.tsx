import React, { useMemo } from 'react'
import { Box } from '@mui/material';
import { Table } from 'react-bootstrap';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import CustomizedCard from '../../../../../General/Card/CustomizedCard';
import { Status } from '../../../../../../setting/Status';
import { findRoomStatus } from '../../../../../../setting/room-setting';

interface PolicyTabProps {
    detail?: any,
    loading?: boolean,
}


function PolicyTab({
    detail,
    loading
}: PolicyTabProps) {

    const policies: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.policies)) return [];
        return detail.policies;
    }, [detail]);

    return (
        <>
            <CustomizedCard
                title="Bảng quy định"
                content={
                    policies.length < 1
                        ? <i>Chưa có quy định nào</i>
                        : <div className="table-responsive">
                            <Table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Tiêu chí</th>
                                        <th>Nội dung</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {policies.map((item, index) =>
                                        <tr key={index}>
                                            <Box
                                                component="td"
                                                textAlign="right"
                                                className="font-weight-semibold text-muted"
                                            >
                                                {item.name}
                                            </Box>
                                            <Box
                                                component="td"
                                                className="fw-semibold"
                                                width="60%"
                                            >
                                                {item.description}
                                            </Box>
                                            <Box
                                                component="td"
                                                className="fw-semibold"
                                                maxWidth="fit-content"
                                                width="fit-content"
                                            >
                                                <Status statusObject={findRoomStatus(item?.status)} />
                                            </Box>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                }
            />

        </>
    )
}

export default PolicyTab