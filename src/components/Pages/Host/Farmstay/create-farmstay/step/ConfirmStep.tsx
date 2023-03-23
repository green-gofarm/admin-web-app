import { Box, Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { Container } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { Fragment } from 'react';

interface GetNameStepProps {
    farmstay: any,
    onBack: () => void,
    onConfirm: () => void;
}

const useStyles = makeStyles({
    header: {
        width: "100%",
        height: "100px",
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
        maxWidth: '480px',
    },
    footer: {
        alignItems: 'center',
        alignSelf: 'stretch',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '24px',
    },
});

function ConfirmStep({
    farmstay,
    onConfirm,
    onBack,
}: GetNameStepProps) {

    const classes = useStyles();

    const handleConfirm = () => {
        onConfirm();
    }

    return (
        <Container>
            <Box className={classes.header}>
                <Box className={classes.step}>
                    Bước 4/4
                </Box>
            </Box>

            <Box maxWidth="800px">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Box>
                            <h2 className={classes.headline}>
                                Xác nhận thông tin
                            </h2>

                            <Box>
                                <Box className="font-weight-bold text-dark fs-16">
                                    Tên
                                </Box>
                                <p className="text-muted mt-0">
                                    {farmstay?.name}
                                </p>
                            </Box>

                            <Box>
                                <Box className="font-weight-bold text-dark fs-16">
                                    Địa chỉ
                                </Box>
                                <p className="text-muted mt-0">
                                    {farmstay?.addressDetail}
                                </p>
                            </Box>

                            <Box>
                                <Box className="font-weight-bold text-dark fs-16">
                                    Vị trí
                                </Box>
                                <p className="text-muted mt-0">
                                    {`${farmstay?.position?.lat} - ${farmstay?.position?.lon}`}
                                </p>
                            </Box>

                            <Box>
                                <Box className="font-weight-bold text-dark fs-16">
                                    Phương thức liên lạc
                                </Box>
                                {isAvailableArray(farmstay?.contactInfo)
                                    ? <Grid container spacing={1} maxWidth="400px">
                                        <Grid item xs={12}>
                                            <Box className='border-bottom mt-2' />
                                        </Grid>
                                        {farmstay.contactInfo.map((item: any, index: number) =>
                                            <Fragment key={index}>
                                                <Grid item xs={6}>
                                                    {item.method}
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {item.value}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box className='border-bottom' />
                                                </Grid>
                                            </Fragment>
                                        )}
                                    </Grid>
                                    : null
                                }
                            </Box>
                        </Box>
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
                                onClick={handleConfirm}
                            >
                                Hoàn thành
                            </Button>
                        </footer>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default ConfirmStep;