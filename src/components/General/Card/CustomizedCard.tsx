import { Box } from '@mui/material'
import React from 'react'

interface CustomizedCardProps {
    title?: any,
    panel?: any,
    content?: any
}

function CustomizedCard({
    title,
    panel,
    content,
}: CustomizedCardProps) {
    return (
        <div className="main-content-body main-content-body-contacts card custom-card">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className="main-contact-info-header"
                padding="16px 20px 20px 20px !important"
            >
                <Box
                    className='h5'
                    margin="0 !important"
                >
                    {title}
                </Box>

                {panel}
            </Box>
            <Box padding="20px" className="main-contact-info-body">
                {content}
            </Box>
        </div>
    )
}

export default CustomizedCard