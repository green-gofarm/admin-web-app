import { memo } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Box, Dialog, DialogContent, Grid } from '@mui/material';
import CustomizedDialogTitle from '../../../../../General/Dialog/CustomizedDialogTitle';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import Dropzone from 'react-dropzone';
import makeStyles from '@mui/styles/makeStyles/makeStyles';

const useStyles = makeStyles({
    bigContainer: {
        position: "relative",
        width: "100%",
        height: '100%',
        overflow: "hidden"
    },
    container: {
        position: "relative",
        width: "100%",
        height: '160px',
        overflow: "hidden"
    },
    box: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
});

interface CreateActivityProps {
    open?: boolean,
    refresh?: any,
    onClose: Function
}

const Image = () => (
    <Dropzone>
        {({ getRootProps, getInputProps }) => (
            <Box
                height="160px !important"
                className="dropzone dz-clickable"
            >
                <div className="dz-message needsclick" {...getRootProps()}>
                    <div className="mb-2 mt-5 dropzoneicon ">
                        <i className="mdi mdi-apple-mobileme"></i>
                    </div>
                    <p style={{ color: "#9393b5" }}>
                        Ảnh hoạt động
                    </p>
                </div>
            </Box>
        )}
    </Dropzone>
)

function CreateActivity({
    open,
    refresh,
    onClose,
}: CreateActivityProps) {

    const classes = useStyles();

    const handleSubmit = () => {
        onClose && onClose();
        refresh && refresh();
    }

    const handleClose = () => {
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
        >
            <CustomizedDialogTitle
                title="THÊM HOẠT ĐỘNG MỚI"
                onClose={handleClose}
            />
            <DialogContent>
                <Box padding="16px 0">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Dropzone>
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        height="240px !important"
                                        className="dropzone dz-clickable"
                                    >
                                        <div className="dz-message needsclick" {...getRootProps()}>
                                            <Box marginTop="80px" className="mb-2 dropzoneicon ">
                                                <i className="mdi mdi-apple-mobileme"></i>
                                            </Box>
                                            <p style={{ color: "#9393b5" }}>
                                                Ảnh đại diện
                                            </p>
                                        </div>
                                    </Box>
                                )}
                            </Dropzone>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <InputGroup className="input-group mb-3">
                                        <InputGroup.Text className="input-group-text">
                                            Tên hoạt động
                                        </InputGroup.Text>
                                        <Form.Control
                                            aria-label="Amount (to the nearest dollar)"
                                            className="form-control"
                                            type="text"
                                        />
                                    </InputGroup>
                                </Grid>

                                <Grid item xs={12}>
                                    <InputGroup className="input-group mb-3">
                                        <InputGroup.Text className="input-group-text">
                                            Giá vé
                                        </InputGroup.Text>
                                        <Form.Control
                                            aria-label="Amount (to the nearest dollar)"
                                            className="form-control"
                                            type="text"
                                        />
                                        <InputGroup.Text className="input-group-text">
                                            đ
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Grid>

                                <Grid item xs={12}>
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        defaultValue=""
                                        required
                                        placeholder='Mô tả'
                                    />
                                </Grid>
                            </Grid>
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <Box className={classes.bigContainer}>
                                <Dropzone>
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            height="336px !important"
                                            className="dropzone dz-clickable"
                                        >
                                            <div className="dz-message needsclick" {...getRootProps()}>
                                                <Box marginTop="120px" className="mb-2 mt-6 dropzoneicon ">
                                                    <i className="mdi mdi-apple-mobileme"></i>
                                                </Box>
                                                <p style={{ color: "#9393b5" }}>
                                                    Ảnh hoạt động
                                                </p>
                                            </div>
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Box className={classes.container}>
                                        <Image />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box className={classes.container}>
                                        <Image />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box className={classes.container}>
                                        <Image />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box className={classes.container}>
                                        <Image />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            <CustomizedDialogActions>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Xác nhận
                </Button>
            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(CreateActivity);