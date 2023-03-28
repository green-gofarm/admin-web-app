import { Box, Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { Container } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import { Location } from '../CreateFarmstay';
import CustomizedMap from '../ui-segment/CustomizedMap';
import IconLabelDetail from '../../../../../General/Item/IconLabelDetail';


const useStyles = makeStyles({
    header: {
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
    },
    step: {
        fontSize: '20px',
        lineHeight: '28px',
        display: 'inline',
        fontWeight: 'normal',
        margin: '0px',
    },
    headline: {
        fontSize: '36px',
        lineHeight: '54px',
        fontWeight: 500,
        marginBottom: '24px',
        maxWidth: '100%',
    },
    footer: {
        alignItems: 'center',
        alignSelf: 'stretch',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '24px',
    },
    label: {
        minWidth: "140px",
        textAlign: "right",
        justifyContent: "right",
    }
});

interface GetNameStepProps {
    defaultLocation?: Location,
    onBack: () => void,
    onContinue: (location: Location) => void;
}

function GetLocation({
    defaultLocation,
    onContinue,
    onBack,
}: GetNameStepProps) {

    const classes = useStyles();

    const [location, setLocation] = useState<Location>(defaultLocation ?? {
        lat: null,
        lng: null
    })

    const handleContinue = () => {
        onContinue(location);
    }

    console.log(location);

    return (
        <Container>
            <Box className={classes.header}>
                <Box className={classes.step}>
                    Bước 3/5
                </Box>
            </Box>

            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <h2 className={classes.headline}>
                        Chọn vị trí farmstay trên bản đồ
                    </h2>
                </Grid>

                <Grid item xs={12}>
                    <Box
                        display="flex"
                        gap="8px"
                        flexWrap="wrap"
                    >
                        <IconLabelDetail
                            icon={<i className='fa fa-map-marker'></i>}
                            label="Kinh độ"
                            value={location.lng ?? <i>Chưa có</i>}
                        />
                        <IconLabelDetail
                            icon={<i className='fa fa-map-marker'></i>}
                            label="Vĩ độ"
                            value={location.lat ?? <i>Chưa có</i>}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <CustomizedMap
                        location={location}
                        onSelect={(location) => setLocation(location)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <footer className={classes.footer}>
                        <Button
                            color="primary"
                            variant="text"
                            size="large"
                            onClick={onBack}
                            startIcon={<ArrowBackIcon />}
                        >
                            Quay lại
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            onClick={handleContinue}
                            disabled={!location.lat || !location.lng}
                            endIcon={<ArrowForwardIcon />}
                        >
                            Tiếp tục
                        </Button>
                    </footer>
                </Grid>


            </Grid>
            <Box marginTop="24px" />
        </Container>
    )
}

export default GetLocation;