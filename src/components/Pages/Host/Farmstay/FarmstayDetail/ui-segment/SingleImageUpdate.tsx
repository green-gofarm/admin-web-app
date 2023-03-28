import { Box, IconButton, Tooltip } from "@mui/material";
import { Fragment } from "react";
import Dropzone from "react-dropzone";
import { DeleteForever } from "@mui/icons-material";
import { imageAcceptType } from "../../../../../../setting/setting";
import makeStyles from "@mui/styles/makeStyles/makeStyles";

const useStyles = makeStyles({
    container: {
        cursor: "pointer",
        position: "relative",
    },
    panel: {
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "100%",
        height: "50px",
        bgcolor: "rgba(0,0,0,0.3)",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
        "&:hover": {
            bgcolor: "rgba(0,0,0,0.4)"
        }
    }
});

interface SingleImageUpdateProps {
    file: any,
    setFile: any,
    link?: any,
    clear: () => void
}

const SingleImageUpdate = ({
    file,
    setFile,
    link,
    clear
}: SingleImageUpdateProps) => {

    const classes = useStyles();

    function formatBytes(bytes: any, decimals = 2) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    function handleAcceptedFiles(files: any) {
        files.map((file: any) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        );
        setFile(files[0]);
    }

    const renderDropzone = (getRootProps: () => any) => (
        <div className="dz-message needsclick" {...getRootProps()}>
            <div className="dropzone dz-clickable bg-gray-200">
                <div className="mb-2 mt-5 dropzoneicon ">
                    <i className="mdi mdi-apple-mobileme"></i>
                </div>
                <p style={{ color: "#9393b5" }}>Thả ảnh hoặc ấn vào đây để chọn file.</p>
            </div>
        </div>
    )

    const renderImage = () => (
        <Box className={"dropzone bg-gray-200 " + classes.container}>
            {link
                ? <>
                    <img
                        height="100%"
                        alt="Ảnh"
                        src={link}
                    />
                    <Box className={classes.panel}>
                        <Box></Box>

                        <Tooltip title="Xóa">
                            <IconButton onClick={clear}>
                                <DeleteForever sx={{ color: "#fff" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </>
                : <>
                    <img
                        height="100%"
                        alt="Ảnh"
                        src={file?.preview}
                    />
                    <Box className={classes.panel}>
                        <Box>
                            <p className="mb-0 text-white">
                                {file.formattedSize}
                            </p>
                        </Box>

                        <Tooltip title="Xóa">
                            <IconButton onClick={() => setFile(null)}>
                                <DeleteForever sx={{ color: "#fff" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </>
            }
        </Box>
    )

    return (
        <Fragment>
            <Dropzone
                multiple={false}
                onDrop={(acceptedFiles) => {
                    handleAcceptedFiles(acceptedFiles);
                }}
                accept={imageAcceptType}
            >
                {({ getRootProps }) => (
                    <>
                        {link ?? file ? renderImage() : renderDropzone(getRootProps)}
                    </>
                )}
            </Dropzone>
        </Fragment >

    );
}

export default SingleImageUpdate;