import { Box, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { useMemo, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { isAvailableArray } from '../../helpers/arrayUtils';

const defaultImage = require("../../assets/img/photos/1.jpg");


const useStyles = makeStyles({
    bigContainer: {
        position: "relative",
        width: "100%",
        height: '100%',
        minHeight: "160px",
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

interface ImageViewProps {
    images?: any[]
}

const ImageView = ({
    images
}: ImageViewProps) => {
    const classes = useStyles();

    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const _images = useMemo(() => {
        if (!isAvailableArray(images)) return [];
        return images;
    }, [images]);

    const handleImageClick = (index: number) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <Box className={classes.bigContainer}>
                        <img
                            src={_images[0] ?? defaultImage}
                            alt={`media${1}`}
                            onClick={() => handleImageClick(0)}
                            className={`${classes.box} br-5`}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <Box className={classes.container}>
                                <img
                                    src={_images[1] ?? defaultImage}
                                    alt={`media${1}`}
                                    onClick={() => handleImageClick(1)}
                                    className={`${classes.box} br-5`}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box className={classes.container}>
                                <img
                                    src={_images[2] ?? defaultImage}
                                    alt={`media${1}`}
                                    onClick={() => handleImageClick(2)}
                                    className={`${classes.box} br-5`}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box className={classes.container}>
                                <img
                                    src={_images[3] ?? defaultImage}
                                    alt={`media${1}`}
                                    onClick={() => handleImageClick(3)}
                                    className={`${classes.box} br-5`}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box className={classes.container}>
                                <img
                                    src={_images[4] ?? defaultImage}
                                    alt={`media${1}`}
                                    onClick={() => handleImageClick(4)}
                                    className={`${classes.box} br-5`}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {isOpen && _images.length > 0 && photoIndex + 1 <= _images.length
                ? (
                    <Lightbox
                        mainSrc={_images[photoIndex]}
                        nextSrc={_images[(photoIndex + 1) % _images.length]}
                        prevSrc={_images[(photoIndex + _images.length - 1) % _images.length]}
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() => setPhotoIndex((photoIndex + _images.length - 1) % _images.length)}
                        onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % _images.length)}
                    />
                )
                : null
            }
        </>
    );
};

export default ImageView;
