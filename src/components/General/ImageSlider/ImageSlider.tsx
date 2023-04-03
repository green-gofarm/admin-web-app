import React from "react";

import { Box, CardMedia, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import makeStyles from "@mui/styles/makeStyles/makeStyles";

interface ImageSliderProps {
    images: string[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        width: "100%",
        height: "100%",
    },
    imageWrapper: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    arrowIcon: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        color: "#fff",
        cursor: "pointer",
        "&:hover": {
            color: "#139c7f",
        },
    },
    leftArrow: {
        left: 0,
        paddingLeft: "8px",
    },
    rightArrow: {
        right: 0,
        paddingRight: "8px",
    },
}));

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const classes = useStyles();
    const [activeIndex, setActiveIndex] = React.useState(0);

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.imageWrapper}>
                {images.map((image, index) => (
                    <CardMedia
                        key={index}
                        className={classes.image}
                        src={image}
                        title={`Slide ${index}`}
                        style={{
                            display: index === activeIndex ? "block" : "none",
                        }}
                    />
                ))}
                <ArrowBackIosIcon
                    className={`${classes.arrowIcon} ${classes.leftArrow}`}
                    onClick={handlePrevClick}
                />
                <ArrowForwardIosIcon
                    className={`${classes.arrowIcon} ${classes.rightArrow}`}
                    onClick={handleNextClick}
                />
            </Box>
            <Typography align="center">{`Slide ${activeIndex + 1} of ${images.length
                }`}</Typography>
        </Box>
    );
};

export default ImageSlider;