import { Box, Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { Container } from 'react-bootstrap';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import bigLogo from '../../../../../../assets/img/brand/big-logo.png';

interface GetNameStepProps {
    defaultName: string | null,
    onContinue: (name: string) => void;

}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: "100%",
        maxWidth: "600px"
    },
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
    input: {
        fontSize: '24px',
        lineHeight: '54px',
        fontWeight: '500',
        background: 'rgba(0,0,0,0)',
        border: 'none',
        borderBottom: '1px solid rgba(0,0,0,0.38)',
        caretColor: 'rgba(26,115,232,0.2)',
        color: "#139c7f",
        transition: 'border 0.15s cubic-bezier(0, 0, 0.2, 1)',
        width: '100%',
        padding: '1px 2px',
        borderRadius: '0px',
        maxHeight: 'none',
        boxShadow: 'none',
        outline: 'none',
        "&:hover, &:focus, &focus-within": {
            borderBottom: '2px solid #139c7f',
        }
    },
    footer: {
        alignItems: 'center',
        alignSelf: 'stretch',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '24px',
    },
    side_branch: {
        backgroundAttachment: 'scroll',
        backgroundImage: `url(${bigLogo})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
        backgroundSize: '100% 100%',
        gridArea: 'sidebar',
        pointerEvents: 'none',
        height: 320,
        width: 320,
        margin: "0 auto",
    },
});

function GetNameStep({
    defaultName,
    onContinue
}: GetNameStepProps) {

    const classes = useStyles();

    const [name, setName] = useState<string>(defaultName ?? "");

    const handleContinue = () => {
        onContinue(name);
    }

    return (
        <Container>
            <Box className={classes.header}>
                <Box className={classes.step}>
                    Bước 1/4
                </Box>
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                    <Box className={classes.root}>
                        <h2 className={classes.headline}>
                            Cung cấp tên farmstay của bạn
                        </h2>
                        <Box height="60px" width="100%">
                            <input
                                type="text"
                                className={classes.input}
                                defaultValue={defaultName ?? ""}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleContinue();
                                    }
                                }}
                                placeholder='Nhập tên/thương hiệu farmstay của bạn'
                            />
                        </Box>
                        <footer className={classes.footer}>
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                disabled={!name}
                                onClick={handleContinue}
                                endIcon={<ArrowForwardIcon />}
                            >
                                Tiếp tục
                            </Button>
                        </footer>
                    </Box>
                </Grid>

                <Grid item xs={0} lg={6} overflow="hidden" alignItems="center">
                    <Box className={classes.side_branch} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default GetNameStep