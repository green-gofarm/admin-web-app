import { Box, Grid } from '@mui/material'
import { Card } from 'react-bootstrap'
import FarmImageGeneralView from '../FarmstayDetail/FarmImageGeneralView';
import { convertToMoney } from '../../../../../helpers/stringUtils';

interface IActivityDetailHeader {
    detail?: any,
}

function ActivityDetailHeader({
    detail
}: IActivityDetailHeader) {
    return (
        <Card className="custom-card customs-cards">
            <Card.Body className=" d-md-flex bg-white">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <FarmImageGeneralView />
                    </Grid>
                    <Grid item xs={12}>
                        <Box component="h4" className="font-weight-semibold" margin="0 !important">
                            {detail?.name}
                        </Box>
                        <p className="mb-3 mt-3 tx-13">
                            {detail.description}
                        </p>
                        <Box component="h4" className="font-weight-semibold" margin="0 !important">
                            {`Giá vé: ${convertToMoney(detail?.defaultPrice)}`}
                        </Box>

                        <p className="mb-3 mt-1 tx-13">
                            <i>Giá vé sẽ thay đổi vào một số ngày cụ thể, xin vui lòng xem chi tiết trên lịch hoạt động.</i>
                        </p>
                    </Grid>
                </Grid>
            </Card.Body>
        </Card>
    )
}

export default ActivityDetailHeader;