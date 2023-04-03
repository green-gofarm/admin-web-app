import { memo, useCallback, useMemo, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Box, CircularProgress, Dialog, DialogContent, Grid, IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/redux-setting';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import CustomizedDialogActions from '../../../../../General/Dialog/CustomizedDialogActions';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { DeleteForever } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import Dropzone from 'react-dropzone';
import { imageAcceptType } from '../../../../../../setting/setting';
import { updateFarmstayActivities, uploadImage } from '../../../../../../redux/farmstay/action';
import { toast } from 'react-toastify';
import { cloneDeep } from 'lodash';
import CustomizedDialogTitle from '../../../../../General/Dialog/CustomizedDialogTitle';
import { formatBytes } from '../../../../../../helpers/fileUtils';
import { FILE_MAX_SIZE, OVER_FILE_SIZE_ERROR } from '../../../../../../setting/file-setting';
import InvalidFeedback from '../../../../../General/InvalidFeedback';
import useActivityImages from '../../../../Management/Farmstay/FarmstayDetail/hooks/useActivityImages';

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
        justifyContent: "space-between",
        padding: "0 1rem",
        "&hover": {
            background: "rgba(0,0,0,0.4)"
        }
    }
});

interface UpdateActivityImagesProps {
    open?: boolean,
    activity?: any,
    onClose: () => void,
    onSuccessCallback?: any,
}

function UpdateActivityImages({
    open,
    activity,
    onClose,
    onSuccessCallback,
}: UpdateActivityImagesProps) {

    const dispatch = useDispatch();
    const classes = useStyles();

    // Redux
    const user = useSelector((state: RootState) => state.auth.user);

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const images = useActivityImages(activity);

    const [links, setLinks] = useState<any[]>(() => {
        const temp = images.others;
        return isAvailableArray(temp) ? temp : [];
    });

    const [files, setFiles] = useState<any[]>([]);

    const isDisableUpload = useMemo(() => {
        if (delay) return true;
        if (files.some(file => !!file.error)) return true;
        if (links.length === images.others?.length) {
            if (files.length < 1) {
                return true;
            }
        }
        return false;
    }, [delay, files, images.others?.length, links.length]);

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
        if (!activity?.id) return;
        if (!activity?.farmstayId) return;

        try {
            const newFileLinks = await getNewFileLinks();
            const data = preparedImagesData([...links, ...newFileLinks]);

            dispatch(updateFarmstayActivities(
                user.id,
                activity.farmstayId,
                activity.id,
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

    function handleAcceptedFiles(files: any[]) {
        files.map((file: any) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
                error: file.size > FILE_MAX_SIZE ? OVER_FILE_SIZE_ERROR : "",
            })
        );

        setFiles(prev => [...prev, ...files])
    }

    const renderUsingImages = () => (
        <Grid item xs={12}>
            <h6>Ảnh đang sử dụng</h6>
            <Grid container spacing={2}>
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
                                <Box>
                                    <p className="mb-0 text-white">
                                    </p>
                                </Box>
                                <Tooltip title="Xóa">
                                    <IconButton onClick={() => handleRemoveLink(index)}>
                                        <DeleteForever sx={{ color: "#fff" }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Grid>
    )

    const renderNewImages = () => (
        <Grid item xs={12}>
            <h6>Ảnh mới</h6>
            <Grid container spacing={2}>
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
                                <Box>
                                    <p className="mb-0 text-white">
                                        {file.formattedSize}
                                    </p>
                                </Box>
                                <Tooltip title="Xóa">
                                    <IconButton onClick={() => handleRemoveFile(index)}>
                                        <DeleteForever sx={{ color: "#fff" }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                        {file.error
                            ? <InvalidFeedback message={file.error} />
                            : null
                        }
                    </Grid>
                )}
            </Grid>
        </Grid>
    )

    const renderContent = () => (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Dropzone
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
                                <p style={{ color: "#9393b5" }}>
                                    {`Chấp nhận ảnh có kích thước nhỏ hơn ${formatBytes(FILE_MAX_SIZE)}`}
                                </p>
                            </div>
                        </div>
                    )}
                </Dropzone>
            </Grid>

            {files.length > 0 ? renderNewImages() : null}
            {links.length > 0 ? renderUsingImages() : null}
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
                    disabled={isDisableUpload}
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

export default memo(UpdateActivityImages);