import { Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

interface IAddAction {
    label?: string,
    onClick?: any,
}

function AddAction({
    label = "Thêm mới",
    onClick,
}: IAddAction) {
    return (
        <Button
            color="primary"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

export default AddAction