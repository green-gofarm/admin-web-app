import { memo, useCallback, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid, IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import useFarmstayImages from '../../../../Management/Farmstay/FarmstayDetail/hooks/useFarmstayImages';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { DeleteForever } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import Dropzone from 'react-dropzone';
import { imageAcceptType } from '../../../../../../setting/setting';
import { updateFarmstay, uploadImage } from '../../../../../../redux/farmstay/action';
import { toast } from 'react-toastify';
import { cloneDeep } from 'lodash';
import CustomizedDialogTitle from '../../../../../General/Dialog/CustomizedDialogTitle';

const useStyles = makeStyles({
    panel: {
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "100%",
        height: "50px",
        background: "rgba(0,0,0,0.3)",

        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 1rem",
        "&hover": {
            background: "rgba(0,0,0,0.4)"
        }
    }
});

interface UpdateFarmstayImagesProps {
    open?: boolean,
    farmstay?: any,
    onClose: () => void,
    onSuccessCallback?: any,
}

function UpdateFarmstayImage({
    open,
    farmstay,
    onClose,
    onSuccessCallback,
}: UpdateFarmstayImagesProps) {

    const dispatch = useDispatch();
    const classes = useStyles();

    // Redux
    const user = useSelector((state: RootState) => state.auth.user);

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const images = useFarmstayImages(farmstay);

    const [links, setLinks] = useState<any[]>(() => {
        const temp = images.others;
        return isAvailableArray(temp) ? temp : [];
    });

    const [files, setFiles] = useState<any[]>([]);

    const handleRemoveLink = useCallback((index: number) => {
        setLinks(prev => {
            return prev.filter((item, i) => i !== index);
        });
    }, []);

    const handleRemoveFile = useCallback((index: number) => {
        setFiles(prev => {
            return prev.filter((item, i) => i !== index);
        });
    }, []);

    const preparedImagesData = (links: any[]) => {
        const newData = images ? cloneDeep(images) : {
            avatar: "",
            others: []
        }

        newData.others = links;
        return JSON.stringify(newData);
    }

    const getNewFileLinks = async () => {
        return new Promise<any[]>((resolve, rj) => {
            if (files.length < 1) {
                resolve([]);
                return;
            }

            const formData = new FormData();
            files.forEach(file => formData.append("files", file));

            dispatch(uploadImage(
                formData,
                {
                    loading: setLoading,
                    onSuccess: (response: any) => {
                        if (isAvailableArray(response?.data)) {
                            const links = response.data;
                            resolve(links);
                            return;
                        }
                        rj("Có lỗi xảy ra: Upload success, but no images");
                        toast.error("Lưu ảnh thất bại");
                    },
                    onFailure: (error: any) => {
                        console.log(error);
                        rj("Có lỗi xảy ra: Upload failed");
                        toast.error("Lưu ảnh thất bại");
                    }
                }
            ));
        })
    }

    const handleUpdate = async () => {
        if (!user?.id) return;
        if (!farmstay?.id) return;

        try {
            const newFileLinks = await getNewFileLinks();
            const data = preparedImagesData([...links, ...newFileLinks]);

            dispatch(updateFarmstay(
                user?.id,
                farmstay?.id,
                { images: data },
                {
                    loading: setLoading,
                    onSuccess: () => {
                        toast.success("Lưu ảnh thành công.");
                        onClose && onClose();
                        onSuccessCallback && onSuccessCallback();
                    },
                    onFailure: () => {
                        toast.error("Lưu ảnh thất bại");
                    }
                })
            )
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        onClose && onClose();
    }

    function handleAcceptedFiles(files: any) {
        files.map((file: any) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );

        setFiles(prev => [...prev, files[0]])
    }

    const renderContent = () => (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Dropzone
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                        handleAcceptedFiles(acceptedFiles);
                    }}
                    accept={imageAcceptType}
                >
                    {({ getRootProps }) => (
                        <div className="dz-message needsclick" {...getRootProps()}>
                            <div className="dropzone dz-clickable bg-gray-200">
                                <div className="mb-2 mt-5 dropzoneicon ">
                                    <i className="mdi mdi-apple-mobileme"></i>
                                </div>
                                <p style={{ color: "#9393b5" }}>Thả ảnh hoặc ấn vào đây để chọn file.</p>
                            </div>
                        </div>
                    )}
                </Dropzone>
            </Grid>

            {links.map((link, index) =>
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                        className="dropzone bg-gray-200"
                        sx={{ cursor: "auto !important" }}
                        position="relative"
                    >
                        <img
                            height="100%"
                            alt="Ảnh"
                            src={link}
                        />

                        <Box className={classes.panel}>
                            <Tooltip title="Xóa">
                                <IconButton onClick={() => handleRemoveLink(index)}>
                                    <DeleteForever sx={{ color: "#fff" }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Grid>
            )}
            {files.map((file, index) =>
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                        className="dropzone bg-gray-200"
                        sx={{ cursor: "auto !important" }}
                        position="relative"
                    >
                        <img
                            height="100%"
                            alt="Ảnh"
                            src={file.preview}
                        />

                        <Box className={classes.panel}>
                            <Tooltip title="Xóa">
                                <IconButton onClick={() => handleRemoveFile(index)}>
                                    <DeleteForever sx={{ color: "#fff" }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Grid>
            )}

        </Grid>
    )

    return (
        <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
        >
            <CustomizedDialogTitle
                title='Cập nhật ảnh'
                onClose={onClose}
            />
            <DialogContent>
                {renderContent()}
            </DialogContent>

            <CustomizedDialogActions>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    disabled={delay}
                >
                    Hủy
                </Button>
                <Button
                    variant="primary"
                    onClick={handleUpdate}
                    disabled={delay}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="8px"
                    >
                        {delay
                            ? <CircularProgress size={16} thickness={4} sx={{ color: "#fff" }} />
                            : null
                        }
                        Lưu lại
                    </Box>

                </Button>
            </CustomizedDialogActions>
        </Dialog>
    )
}

export default memo(UpdateFarmstayImage);