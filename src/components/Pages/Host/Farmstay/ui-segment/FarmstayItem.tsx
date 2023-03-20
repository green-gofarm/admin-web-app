import { FC } from 'react'
import farmstayStyles from './farmstay-item-style';
import { Card } from 'react-bootstrap';
import { Box } from '@mui/material';
import { Status } from '../../../../../setting/Status';
import { findFarmstayStatus } from '../../../../../setting/farmstay-setting';

interface FarmstayItemProps {
    item: any,
    onClick: () => any
}

const FarmstayItem: FC<FarmstayItemProps> = ({
    item,
    onClick
}) => {

    const classes = farmstayStyles();

    return (
        <Card className="user-wideget user-wideget-widget widget-user">
            <Box
                component="button"
                className={classes.item}
                onClick={onClick}
            >
                <Box className={classes.header}>
                    {item?.name}
                </Box>

                <Box flexGrow="1" />
                <Box
                    display="flex"
                    height="32px"
                    width="100%"
                >
                    <Box flex="1 1 0"></Box>
                    <Box flex="0 0 auto" maxWidth="60%">
                        <Status statusObject={findFarmstayStatus(item?.status)} />
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}

export default FarmstayItem