import { Box, Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { Container, Form } from 'react-bootstrap';
import { useCallback, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';


interface GetNameStepProps {
    defaultContactInfo: [] | null,
    onBack: () => void,
    onContinue: (contactInfo: any) => void;
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

function GetContactInfo({
    defaultContactInfo,
    onContinue,
    onBack,
}: GetNameStepProps) {

    const classes = useStyles();

    const [contactInfo, setContactInfo] = useState<any[]>(
        isAvailableArray(defaultContactInfo)
            ? defaultContactInfo
            : [{ method: "", value: "" }]
    );
    const handleContinue = () => {
        onContinue(contactInfo);
    }

    const handleAdd = () => {
        setContactInfo(prev => [...prev, {
            method: "",
            value: "",
        }])
    }

    const handleUpdate = useCallback((key: string, value: string, index: number) => {
        setContactInfo(prev => {
            return prev.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        [key]: value
                    };
                }
                return item;
            });
        });
    }, []);

    const handleRemove = useCallback((index: number) => {
        setContactInfo(prev => {
            return prev.filter((item, i) => i !== index);
        });
    }, []);

    return (
        <Container>
            <Box className={classes.header}>
                <Box className={classes.step}>
                    Bước 3/4
                </Box>
            </Box>

            <Box maxWidth="600px">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box>
                            <h2 className={classes.headline}>
                                Cung cấp thông tin liên hệ
                            </h2>
                        </Box>
                    </Grid>

                    {contactInfo.map((item: any, index) =>
                        <Grid item xs={12} key={index}>
                            <Box
                                display="flex"
                                alignItems="center"
                                width="100%"
                                gap="8px"
                            >
                                <Box flexGrow={1}>
                                    <Form.Control
                                        value={item.method ?? ""}
                                        type="text"
                                        className="form-control"
                                        required
                                        autoFocus
                                        onChange={(e) => handleUpdate("method", e.target.value ?? "", index)}
                                        placeholder="Phương thức (ví dụ: sđt, email, v.v.)"
                                    />
                                </Box>
                                <Box flexGrow={1}>
                                    <Form.Control
                                        value={item.value ?? ""}
                                        type="text"
                                        className="form-control"
                                        required
                                        onChange={(e) => handleUpdate("value", e.target.value ?? "", index)}
                                        placeholder="Giá trị (ví dụ: 090xxxxx,  email@example.com, v.v.)"
                                    />
                                </Box>
                                <Box className="btn btn-secondary shadow" onClick={() => handleRemove(index)}>
                                    <DeleteForeverIcon />
                                </Box>
                            </Box>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Box className="btn btn-primary shadow" onClick={handleAdd}>
                            <AddIcon />
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
                </Grid>
            </Box>
            <Box marginTop="24px" />
        </Container>
    )
}

export default GetContactInfo;