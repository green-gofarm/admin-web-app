import { Box, Grid } from '@mui/material'
import { Card } from 'react-bootstrap'
import RoundAvatar from '../../../../../../General/RoundAvatar';
import IconLabelDetail from '../../../../../../General/Item/IconLabelDetail';
import useCurrentUser from '../../../../../../../hooks/useCurrentUser';

function ProfileHeader() {

    const user = useCurrentUser();

    return (
        <>
            <Card className="custom-card customs-cards">
                <Card.Body className="d-md-flex bg-white">
                    <RoundAvatar
                        avatar={user?.avatar}
                        noCamera
                    />

                    <Box flexGrow={1} className="prof-details" margin="0 0 4px 40px">
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <h4 className="font-weight-semibold">
                                    {user?.name}
                                </h4>
                            </Grid>
                            <Grid item xs={12}>
                                <IconLabelDetail
                                    icon={<i className="fa fa-phone me-2"></i>}
                                    label="Sđt:"
                                    value={user?.phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <IconLabelDetail
                                    icon={<i className="fa fa-envelope me-2"></i>}
                                    label="Email:"
                                    value={user?.email}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Card.Body>
            </Card>
        </>
    )
}

export default ProfileHeader;