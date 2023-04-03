import React, { FC } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface BackDropLoaderProps {
    open: boolean;
    text?: string;
}

const BackDropLoader: FC<BackDropLoaderProps> = ({ open, text }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
            {text && (
                <Box
                    component="h1"
                    fontSize="2rem"
                    color="#fff"
                    fontWeight="500"
                    marginLeft="8px"
                    textAlign="center"
                >
                    {text}
                </Box>
            )}
        </Backdrop>
    );
};

export default BackDropLoader;
