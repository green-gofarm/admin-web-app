import { Box } from '@mui/material'
import React, { FC } from 'react'
import { Card } from 'react-bootstrap'
import AddIcon from '@mui/icons-material/Add';
import farmstayStyles from './farmstay-item-style';

interface AddFarmstayItemProps {
    onClick: () => any
}

const AddFarmstayItem: FC<AddFarmstayItemProps> = ({
    onClick
}) => {
    const classes = farmstayStyles();

    return (
        <Card className="user-wideget user-wideget-widget widget-user">
            <Box
                component="button"
                className={classes.addItem}
                onClick={onClick}
            >
                <AddIcon fontSize="large" color="primary" />
                <Box
                    color="#139c7f"
                    fontWeight="600"
                >
                    Thêm farmstay
                </Box>
            </Box>
        </Card>
    )
}

export default AddFarmstayItem