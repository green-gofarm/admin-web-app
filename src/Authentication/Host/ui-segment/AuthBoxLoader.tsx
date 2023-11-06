import { Box, CircularProgress } from '@mui/material'
import React from 'react'

interface AuthBoxLoaderProps {
    message?: string,
}

function AuthBoxLoader({
    message
}: AuthBoxLoaderProps) {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"

            position="absolute"
            top="0"
            left="0"
            zIndex="1"

            width="100%"
            height="100%"
            gap="8px"
            bgcolor="rgba(255, 255,255,0.8)"
        >
            <CircularProgress
                size="24px"
                thickness={4}
                color="primary"
            />
            {message
                ? <Box
                    fontSize="1rem"
                    fontWeight="500"
                    textAlign="center"
                    color="#139c7f"
                >
                    {message}
                </Box>
                : null
            }
        </Box >
    )
}

export default AuthBoxLoader;