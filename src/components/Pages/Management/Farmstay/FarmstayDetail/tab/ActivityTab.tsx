import React, { useMemo } from 'react'
import { Card } from 'react-bootstrap'
import ActivityItem from '../ui-segment/ActivityItem';
import { Grid } from '@mui/material';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';

interface ActivityTabProps {
    detail?: any,
    loading?: boolean,
}

function ActivityTab({
    detail,
    loading
}: ActivityTabProps) {

    const activities: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.activities)) return [];
        return detail.activities;
    }, [detail]);

    return (
        <Grid container spacing={2}>
            {activities.length < 1
                ? <Grid item xs={12}>
                    <Card>
                        <Card.Body>
                            <i>Chưa có hoạt động nào</i>
                        </Card.Body>
                    </Card>
                </Grid>
                : null
            }
            {activities.map((item) =>
                <Grid item xs={12} key={item.id}>
                    <Card>
                        <Card.Body className="card-body p-0">
                            <ActivityItem item={item} />
                        </Card.Body>
                    </Card>
                </Grid>
            )}
        </Grid>
    )
}

export default ActivityTab