import { Box, Button, Grid } from '@mui/material'
import { Card } from 'react-bootstrap'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import FarmImageGeneralView from './FarmImageGeneralView';

interface IFarmstayDetailHeader {
    detail?: any,
}

function FarmstayPreviewHeader({
    detail
}: IFarmstayDetailHeader) {
    return (
        <Card className="custom-card customs-cards">
            <Card.Body className=" d-md-flex bg-white">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <FarmImageGeneralView />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box component="h4" className="font-weight-semibold" margin="0 !important">
                            {detail?.name}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            marginLeft="auto"
                            display="flex"
                            justifyContent="flex-end"
                            gap="8px"
                            height="32px"
                        >
                            <Button
                                color="error"
                                variant="contained"
                                size="small"
                                startIcon={<ThumbDownAltIcon fontSize="small" />}
                            >
                                Từ chối
                            </Button>

                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                startIcon={<ThumbUpAltIcon fontSize="small" />}
                            >
                                Chấp nhận
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Card.Body>
        </Card>
    )
}

export default FarmstayPreviewHeader;