import { Box, Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { Container } from 'react-bootstrap';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import bigLogo from '../../../../../../assets/img/brand/big-logo.png';
import SingleImageUpdate from '../../FarmstayDetail/ui-segment/SingleImageUpdate';
import InvalidFeedback from '../../../../../General/InvalidFeedback';
import VALIDATOR from '../../FarmstayDetail/action/validator';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: "100%",
    },
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
    },
    input: {
        fontSize: '24px',
        lineHeight: '54px',
        fontWeight: '500',
        background: 'rgba(0,0,0,0)',
        borderRadius: "4px",
        border: '2px solid rgba(0,0,0,0.18)',
        caretColor: 'rgba(26,115,232,0.2)',
        color: "#139c7f",
        transition: 'border 0.15s cubic-bezier(0, 0, 0.2, 1)',
        width: '100%',
        maxHeight: 'none',
        boxShadow: 'none',
        outline: 'none',
        padding: "0 1rem",
        "&:hover, &:focus, &focus-within": {
            border: '2px solid #139c7f',
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

interface Errors {
    name: string,
    file: string,
}

const initialErrors: Errors = {
    name: '',
    file: ''
};

interface GetNameStepProps {
    defaultFileAvatar: any,
    defaultName: string | null,
    onContinue: (name: string, avatar: any) => void;
}

function GetNameStep({
    defaultFileAvatar,
    defaultName,
    onContinue
}: GetNameStepProps) {

    const classes = useStyles();

    const [name, setName] = useState<string>(defaultName ?? "");
    const [file, setFile] = useState<any>(defaultFileAvatar ?? null);

    const [errors, setErrors] = useState<Errors>(initialErrors);

    const hasErrors = (errors: { [key in keyof Errors]: string }): boolean => {
        return Object.values(errors).some(error => error !== VALIDATOR.NO_ERROR);
    };

    const validate = (data: Errors) => {
        const temp: { [key in keyof Errors]: string } = {
            name: VALIDATOR.isRequired(data.name) || VALIDATOR.isValidNameLength(data.name),
            file: file != null ? VALIDATOR.NO_ERROR : VALIDATOR.REQUIRED_MESSAGE,
        };

        setErrors(temp);
        return !hasErrors(temp);
    };

    const handleContinue = () => {
        if (validate({ name, file })) {
            onContinue(name, file);
        }
    }

    return (
        <Container>
            <Box className={classes.header}>
                <Box className={classes.step}>
                    Bước 1/5
                </Box>
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Box className={classes.root}>
                        <h2 className={classes.headline}>
                            Cung cấp tên và ảnh đại diện farmstay
                        </h2>

                        <h4 className='mt-4'>
                            Nhập tên/thương hiệu farmstay
                        </h4>
                        <Box height="60px" width="100%">
                            <input
                                type="text"
                                className={classes.input}
                                autoFocus
                                defaultValue={defaultName ?? ""}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleContinue();
                                    }
                                }}
                            />
                        </Box>
                        {errors.name
                            ? <InvalidFeedback message={errors.name} />
                            : null
                        }

                        <h4 className='mt-4'>
                            Ảnh đại diện
                        </h4>
                        <Box width="100%" className='mt-1'>
                            <SingleImageUpdate
                                file={file}
                                setFile={setFile}
                            />
                        </Box>
                        {file?.error || errors.file
                            ? <InvalidFeedback message={file.error || errors.name} />
                            : null
                        }

                        <footer className={classes.footer}>
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                disabled={Boolean(!name || !file || file.error)}
                                onClick={handleContinue}
                                endIcon={<ArrowForwardIcon />}
                            >
                                Tiếp tục
                            </Button>
                        </footer>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default GetNameStep