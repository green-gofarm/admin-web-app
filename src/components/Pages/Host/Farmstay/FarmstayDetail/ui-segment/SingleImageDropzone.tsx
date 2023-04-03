import { Box, IconButton, Tooltip } from "@mui/material";
import { Fragment } from "react";
import Dropzone, { Accept } from "react-dropzone";
import { DeleteForever } from "@mui/icons-material";
import { formatBytes } from "../../../../../../helpers/fileUtils";

const acceptType: Accept = {
    "image/*": [".png", ".gif", ".jpeg", ".jpg"],
}

interface SingleImageDropzoneProps {
    file: any,
    setFile: any,
}

const SingleImageDropzone = ({
    file,
    setFile
}: SingleImageDropzoneProps) => {

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
        <Box
            className="dropzone bg-gray-200"
            sx={{ cursor: "auto !important" }}
            position="relative"
        >
            <img
                height="100%"
                alt="Ảnh"
                src={file?.preview}
            />
            <Box
                position="absolute"
                bottom="0"
                left="0"
                width="100%"
                height="50px"
                bgcolor="rgba(0,0,0,0.3)"

                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding="0 1rem"
                sx={{
                    "&hover": {
                        bgcolor: "rgba(0,0,0,0.4)"
                    }
                }}
            >
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
        </Box>
    )

    return (
        <Fragment>
            <Dropzone
                multiple={false}
                onDrop={(acceptedFiles) => {
                    handleAcceptedFiles(acceptedFiles);
                }}
                accept={acceptType}
            >
                {({ getRootProps }) => (
                    <>
                        {file ? renderImage() : renderDropzone(getRootProps)}
                    </>
                )}
            </Dropzone>
        </Fragment >

    );
}

export default SingleImageDropzone;