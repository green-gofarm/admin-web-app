import { Box, Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { Container, Form, FormGroup } from 'react-bootstrap';
import { useState } from 'react';
import CustomizedMap from '../ui-segment/CustomizedMap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface GetNameStepProps {
    defaultPosition: any,
    defaultAddressDetail: string | null,
    onBack: () => void,
    onContinue: (position: any, detail: string) => void;
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

function GetLocationStep({
    defaultAddressDetail,
    defaultPosition,
    onContinue,
    onBack,
}: GetNameStepProps) {

    const classes = useStyles();

    const [addressDetail, setAddressDetail] = useState<string>(defaultAddressDetail ?? "");
    const [selectedPosition, setSelectedPosition] = useState<any>(defaultPosition ?? null);

    const handleContinue = () => {
        onContinue(selectedPosition, addressDetail);
    }

    return (
        <Container>
            <Box className={classes.header}>
                <Box className={classes.step}>
                    Bước 2/4
                </Box>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box>
                        <h2 className={classes.headline}>
                            Cung cấp vị trí farmstay
                        </h2>

                        <Box fontSize="1rem" padding="0 4px">
                            <FormGroup className="control-group form-group">
                                <Form.Label className="form-label">Địa chỉ chi tiết</Form.Label>
                                <Form.Control
                                    value={addressDetail}
                                    type="text"
                                    className="form-control"
                                    required
                                    autoFocus
                                    onChange={(e) => setAddressDetail(e.target.value ?? "")}
                                    placeholder="Địa chỉ cụ thể của farmstay"
                                />
                            </FormGroup>
                            <FormGroup className="control-group form-group">
                                <Form.Label className="form-label">Vị trí</Form.Label>
                                {!!selectedPosition?.display_name
                                    ? <Box component="span" color="#139c7f">
                                        {selectedPosition.display_name}
                                    </Box>
                                    : <i>Vui lòng chọn vị trí cụ thể của farmstay trên bản đồ bên dưới</i>
                                }
                            </FormGroup>
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
                            onClick={handleContinue}
                            endIcon={<ArrowForwardIcon />}
                        >
                            Tiếp tục
                        </Button>
                    </footer>
                </Grid>

                <Grid item xs={12}>
                    <CustomizedMap
                        selectedPosition={selectedPosition}
                        onSelect={(position) => setSelectedPosition(position)}
                    />
                </Grid>


            </Grid>
            <Box marginTop="24px" />
        </Container>
    )
}

export default GetLocationStep;