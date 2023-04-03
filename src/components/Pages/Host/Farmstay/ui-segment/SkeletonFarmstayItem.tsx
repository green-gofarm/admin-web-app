import { FC } from 'react'
import farmstayStyles from './farmstay-item-style';
import { Card } from 'react-bootstrap';
import { Box, Skeleton } from '@mui/material';

const SkeletonFarmstayItem: FC = () => {

    const classes = farmstayStyles();

    return (
        <Card className="user-wideget user-wideget-widget widget-user">
            <Box
                component="button"
                className={classes.item}
            >
                <Box className={classes.header} minWidth="100%">
                    <Skeleton width="100%" height="50px" />
                </Box>

                <Box flexGrow="1" />
                <Box
                    display="flex"
                    height="32px"
                    width="100%"
                >
                    <Box flex="1 1 0"></Box>
                    <Box flex="0 0 auto" maxWidth="60%">
                        <Skeleton width="150px" height="30px" />
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}

export default SkeletonFarmstayItem;