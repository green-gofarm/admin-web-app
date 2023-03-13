import { Box, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

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

const FarmImageGeneralView = () => {
    const classes = useStyles();

    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const images = [
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
    ];

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
                            src={images[0]}
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
                                    src={images[0]}
                                    alt={`media${1}`}
                                    onClick={() => handleImageClick(1)}
                                    className={`${classes.box} br-5`}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box className={classes.container}>
                                <img
                                    src={images[0]}
                                    alt={`media${1}`}
                                    onClick={() => handleImageClick(2)}
                                    className={`${classes.box} br-5`}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box className={classes.container}>
                                <img
                                    src={images[0]}
                                    alt={`media${1}`}
                                    onClick={() => handleImageClick(3)}
                                    className={`${classes.box} br-5`}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box className={classes.container}>
                                <img
                                    src={images[0]}
                                    alt={`media${1}`}
                                    onClick={() => handleImageClick(4)}
                                    className={`${classes.box} br-5`}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                />
            )}
        </>
    );
};

export default FarmImageGeneralView;
