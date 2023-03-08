import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface _ITitle {
    backUrl: string,
    title: string,
    code: string,
}

function DetailPageHeaderTitle({
    backUrl,
    title,
    code
}: _ITitle) {

    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            alignItems="center"
            gap="8px"
        >
            <Tooltip title="Quay lại">
                <IconButton
                    onClick={() => navigate(backUrl ?? "/")}
                    style={{ padding: 4, marginLeft: -8 }}
                >
                    <ChevronLeftIcon style={{ width: 26, height: 26 }} />
                </IconButton>
            </Tooltip>

            <Box
                display="flex"
                alignItems="center"
                gap="4px"
            >
                {title}
                <span className="tag tag-rounded">
                    {code}
                </span>
            </Box>
        </Box>
    )
}

export default DetailPageHeaderTitle