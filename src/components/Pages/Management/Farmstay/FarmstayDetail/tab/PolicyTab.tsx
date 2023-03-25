import React, { useMemo } from 'react'
import { Box } from '@mui/material';
import { Table } from 'react-bootstrap';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';

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
        <div>

            <h5 className="mb-2 mt-3 fw-semibold">
                Bảng quy định
            </h5>

            <div className="table-responsive">
                <Table className="table table-bordered">
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
                                >
                                    {item.description}
                                </Box>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default PolicyTab