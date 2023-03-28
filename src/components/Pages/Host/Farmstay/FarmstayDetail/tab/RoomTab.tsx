import { useMemo, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Box, Button, Grid } from '@mui/material';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import AddAction from '../../../../../General/Action/ButtonAction/AddAction';
import CreateRoom from '../action/CreateRoom';
import RoomItem from '../ui-segment/RoomItem';
import useAllRoomCategories from '../../../../Management/RoomCategory/hooks/useAllRoomCategories';
import { Add } from '@mui/icons-material';

interface RoomTabProps {
    detail?: any,
    loading?: boolean,
    refresh: () => void,
}

function RoomTab({
    detail,
    loading,
    refresh
}: RoomTabProps) {

    useAllRoomCategories();

    const rooms: any[] = useMemo(() => {
        if (!isAvailableArray(detail?.rooms)) return [];
        return detail.rooms;
    }, [detail]);

    // State 
    const [openAddNew, setOpenAddNew] = useState<boolean>(false);

    return (
        <>
            <Grid container spacing={2}>
                {rooms.length < 1
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
                                        label="Thêm phòng mới"
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
                                Thêm phòng mới
                            </Button>
                        </Box>
                    </Grid>
                }
                {rooms.map((item) =>
                    <Grid item xs={12} key={item.id}>
                        <Card>
                            <Card.Body className="card-body p-0">
                                <RoomItem item={item} refresh={refresh} />
                            </Card.Body>
                        </Card>
                    </Grid>
                )}
            </Grid>

            {openAddNew
                ? <CreateRoom
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

export default RoomTab;