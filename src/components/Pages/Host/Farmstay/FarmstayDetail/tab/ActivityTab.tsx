import React, { useMemo, useState } from 'react'
import { Card } from 'react-bootstrap'
import ActivityItem from '../ui-segment/ActivityItem';
import { Box, Button, Grid } from '@mui/material';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import AddAction from '../../../../../General/Action/ButtonAction/AddAction';
import CreateActivity from '../action/CreateActivity';
import { Add } from '@mui/icons-material';

interface ActivityTabProps {
    detail?: any,
    loading?: boolean,
    refresh: () => void,
}

function ActivityTab({
    detail,
    loading,
    refresh
}: ActivityTabProps) {

    const activities: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.activities)) return [];
        return detail.activities;
    }, [detail]);

    // State 
    const [openAddNew, setOpenAddNew] = useState<boolean>(false);

    return (
        <>
            <Grid container spacing={2}>
                {activities.length < 1
                    ? <Grid item xs={12}>
                        <Card>
                            <Card.Body>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDirection="column"
                                    gap="1rem"
                                >
                                    <AddAction
                                        label="Thêm hoạt động mới"
                                        onClick={() => setOpenAddNew(true)}
                                    />
                                </Box>

                                <i>Chưa có hoạt động nào</i>
                            </Card.Body>
                        </Card>
                    </Grid>
                    : <Grid item xs={12}>
                        <Box
                            display="flex"
                            justifyContent="center"
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => setOpenAddNew(true)}
                            >
                                Thêm hoạt động mới
                            </Button>
                        </Box>
                    </Grid>
                }
                {activities.map((item) =>
                    <Grid item xs={12} key={item.id}>
                        <Card>
                            <Card.Body className="card-body p-0">
                                <ActivityItem item={item} refresh={refresh} />
                            </Card.Body>
                        </Card>
                    </Grid>
                )}
            </Grid>

            {openAddNew
                ? <CreateActivity
                    open={openAddNew}
                    onClose={() => setOpenAddNew(false)}
                    onSuccessCallback={refresh}
                    farmstayId={detail?.id}
                />
                : null
            }
        </>
    )
}

export default ActivityTab;