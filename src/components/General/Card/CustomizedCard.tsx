import { Box } from '@mui/material'
import React from 'react'

interface CustomizedCardProps {
    title?: any,
    panel?: any,
    content?: any,
    isCustomContent?: any
}

function CustomizedCard({
    title,
    panel,
    content,
    isCustomContent
}: CustomizedCardProps) {
    return (
        <Box
            className="main-content-body main-content-body-contacts card custom-card"
            overflow="visible !important"
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className="main-contact-info-header"
                padding="12px 20px 12px 20px !important"
                width="100%"
            >
                <Box
                    className='h5'
                    margin="0 !important"
                >
                    {title}
                </Box>

                <Box justifySelf="right">
                    {panel}
                </Box>
            </Box>
            {isCustomContent
                ? content
                : <Box
                    padding="16px 20px"
                    className="main-contact-info-body"
                    overflow="visible !important"
                >
                    {content}
                </Box>
            }
        </Box>
    )
}

export default CustomizedCard